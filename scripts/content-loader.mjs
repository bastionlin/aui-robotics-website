import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { parse } from 'yaml';
import { z } from 'zod';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { resolveVideo, secureUrl } from '../src/lib/media.js';

const text = z.string().trim().min(1);
const date = text.refine(value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value, 'Use a real YYYY-MM-DD date');
const external = text.refine(value => Boolean(secureUrl(value)), 'Use an HTTPS URL without credentials or a custom port');
const media = text.regex(/^\/uploads\/[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/, 'Use a /uploads/filename.ext path');
const image = media.refine(value => /\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(value), 'Use a supported image file (AVIF, GIF, JPEG, PNG, SVG or WebP)');
const common = { order: z.number().int().nonnegative().default(100), draft: z.boolean().default(false) };
const item = z.object({ title: text, body: text }).strict();
const backdrop = z.object({ file: image, position: text.regex(/^(100|[1-9]?\d)% (100|[1-9]?\d)%$/).default('50% 50%') }).strict();
const galleryItem = z.object({ image, imageAlt: text, caption: text, width: z.number().int().positive(), height: z.number().int().positive() }).strict();
const section = z.object({ title: text, eyebrow: text, ctaLabel: text.optional(), items: z.array(item).optional(), backdrops: z.array(backdrop).default([]), galleryLabel: text.optional(), galleryBody: text.optional(), gallery: z.array(galleryItem).optional() }).strict();
const bounds = z.tuple([z.number().nonnegative(), z.number().nonnegative(), z.number().positive(), z.number().positive(), z.number().positive(), z.number().positive()]).refine(([x,y,w,h,iw,ih]) => x+w <= iw && y+h <= ih, 'Artwork bounds must fit the original image');
const schemas = {
  projects: z.object({ ...common, title: text, category: text, status: z.enum(['Active', 'Completed', 'Upcoming', 'Paused']), summary: text.max(320), tags: z.array(text).default([]), updated: date, year: z.number().int().min(1900).max(2200).optional(), result: text.optional(), location: text.optional(), image: image.optional(), imageAlt: text.optional(), imageWidth: z.number().int().positive().optional(), imageHeight: z.number().int().positive().optional(), repository: external.optional() }).strict(),
  members: z.object({ ...common, name: text, role: text, group: z.enum(['leadership', 'advisor', 'member']), placeholder: z.boolean().default(false), image: image.optional(), imageAlt: text.optional(), linkedin: external.optional() }).strict(),
  sponsors: z.object({ ...common, name: text, logo: image.optional(), href: external.optional(), descriptor: text.optional(), monochrome: z.boolean().default(false), optical: z.number().positive().max(3).default(1), bounds: bounds.optional() }).strict(),
  posts: z.object({ ...common, title: text, date, updated: date.optional(), author: text, summary: text.max(320), tags: z.array(text).default([]), image: image.optional(), imageAlt: text.optional() }).strict(),
};
const siteSchema = z.object({ name: text, email: z.string().email(), location: text, tagline: text, heroEyebrow: text, heroFooter: text, heroSignature: text, heroPrimary: text, heroSecondary: text, heroImages: z.array(backdrop).default([]), footerImages: z.array(backdrop).default([]), contactLabel: text, navigation: z.array(z.object({ id: z.enum(['about', 'projects', 'team', 'sponsors', 'contact', 'blog']), label: text }).strict()).min(1) }).strict();

function fail(file, message) { throw new Error(`${file}: ${message}`); }
function validateAsset(value, root, file) {
  const candidate = path.resolve(root, 'public', value.slice(1));
  const uploads = path.resolve(root, 'public/uploads') + path.sep;
  if (!candidate.startsWith(uploads) || !fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) fail(file, `Missing media file: ${value}`);
  if (!fs.realpathSync(candidate).startsWith(uploads)) fail(file, `Media must stay inside public/uploads: ${value}`);
}

export function validateMarkdown(body, root, file = 'Markdown') {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(body);
  const definitions = new Map();
  function visit(node, fn) { fn(node); node.children?.forEach(child => visit(child, fn)); }
  visit(tree, node => { if (node.type === 'definition') definitions.set(node.identifier, node); });
  visit(tree, node => {
    if (node.type === 'html') fail(file, 'Raw HTML/JSX is not supported. Use Markdown and the documented video syntax.');
    if (node.type === 'paragraph' && node.children?.length === 1) {
      const link = node.children[0];
      if (link.type === 'link' && link.children?.[0]?.value?.startsWith('video:')) {
        if (!link.children.map(child => child.value || '').join('').slice(6).trim()) fail(file, 'Video links need an accessible title after video:.');
        try { resolveVideo(link.url); } catch (error) { fail(file, error.message); }
      }
    }
    const target = node.type === 'linkReference' || node.type === 'imageReference' ? definitions.get(node.identifier) : node;
    if (!target?.url) return;
    const value = target.url;
    if (node.type === 'image' || node.type === 'imageReference') {
      if (!node.alt?.trim()) fail(file, 'Images need meaningful alt text.');
      if (!image.safeParse(value).success) fail(file, 'Images must use /uploads/filename.ext with a supported image extension.');
      validateAsset(value, root, file);
    } else if (value.startsWith('/uploads/')) {
      if (!media.safeParse(value).success) fail(file, `Invalid media path: ${value}`);
      validateAsset(value, root, file);
    } else if (!value.startsWith('#') && !/^mailto:[^\s?]+@[^\s?]+(?:\?[^\s]*)?$/.test(value) && !secureUrl(value)) fail(file, `Unsafe or unsupported link: ${value}`);
  });
}

function read(file, schema, root) {
  let parsed;
  try { parsed = matter(fs.readFileSync(file, 'utf8'), { engines: { yaml: source => parse(source, { uniqueKeys: true }) } }); }
  catch (error) { fail(file, `Invalid YAML: ${error.message}`); }
  const result = schema.safeParse(parsed.data);
  if (!result.success) fail(file, result.error.issues.map(issue => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`).join('\n'));
  if (!parsed.content.trim()) fail(file, 'Add a Markdown body.');
  const value = result.data;
  for (const key of ['image', 'logo']) if (value[key]) validateAsset(value[key], root, file);
  for (const key of ['heroImages', 'footerImages', 'backdrops']) value[key]?.forEach(entry => validateAsset(entry.file, root, file));
  value.gallery?.forEach(entry => validateAsset(entry.image, root, file));
  if (value.gallery?.length && (!value.galleryLabel || !value.galleryBody)) fail(file, 'A gallery needs galleryLabel and galleryBody.');
  if (value.galleryBody) validateMarkdown(value.galleryBody, root, file);
  if (value.image && !value.imageAlt) fail(file, 'imageAlt is required when image is provided.');
  validateMarkdown(parsed.content, root, file);
  value.items?.forEach(entry => validateMarkdown(entry.body, root, file));
  return { ...value, body: parsed.content.trim() };
}

export function loadContent(root = process.cwd()) {
  const folder = path.join(root, 'content');
  const site = read(path.join(folder, 'site.md'), siteSchema, root);
  if (new Set(site.navigation.map(item => item.id)).size !== site.navigation.length) fail('content/site.md', 'Navigation IDs must be unique.');
  const sections = Object.fromEntries(['about', 'projects', 'team', 'sponsors', 'contact', 'blog'].map(slug => [slug, read(path.join(folder, 'sections', `${slug}.md`), section, root)]));
  for (const key of ['about', 'sponsors']) if (!sections[key].items?.length) fail(`content/sections/${key}.md`, 'At least one item is required.');
  const result = { site, sections };
  for (const [collection, schema] of Object.entries(schemas)) {
    const dir = path.join(folder, collection);
    const entries = fs.readdirSync(dir).filter(name => name.endsWith('.md')).map(name => {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) fail(`${collection}/${name}`, 'Use a lowercase kebab-case Markdown filename.');
      return { ...read(path.join(dir, name), schema, root), slug: name.slice(0, -3) };
    });
    result[collection] = entries.filter(entry => !entry.draft).sort((a, b) => collection === 'posts' ? b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug) : a.order - b.order || a.slug.localeCompare(b.slug));
  }
  return result;
}
