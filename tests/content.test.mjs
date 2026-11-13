import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadContent, validateMarkdown } from '../scripts/content-loader.mjs';
import { resolveVideo } from '../src/lib/media.js';
import matter from 'gray-matter';
import { parse, stringify } from 'yaml';

const root = process.cwd();
function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aui-content-'));
  fs.cpSync(path.join(root, 'content'), path.join(dir, 'content'), { recursive: true });
  fs.cpSync(path.join(root, 'public'), path.join(dir, 'public'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'public/uploads'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'public/uploads/test-pixel.png'), Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j5S8AAAAASUVORK5CYII=', 'base64'));
  const entries = [['project','projects','autonomous-rover'], ['member','members','club-president'], ['sponsor','sponsors','bmce'], ['post','posts','keeping-the-build-log']];
  for (const [template, collection, slug] of entries) {
    const target = path.join(dir, 'content', collection);
    fs.rmSync(target, { recursive: true });
    fs.mkdirSync(target);
    let source = fs.readFileSync(path.join(root, 'content/_templates', `${template}.md`), 'utf8').replace('draft: true', 'draft: false');
    if (template === 'project') source = source.replace('status: Upcoming', 'status: Active').replace('2026-11-13', '2026-10-28');
    if (template === 'post') source += '\nUnique fixture-only draft text.\n';
    fs.writeFileSync(path.join(target, `${slug}.md`), source);
  }
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}
function edit(dir, file, from, to) {
  const target = path.join(dir, 'content', file);
  const original = fs.readFileSync(target, 'utf8');
  assert.ok(original.includes(from), `Fixture includes ${from}`);
  fs.writeFileSync(target, original.replace(from, to));
}

test('repository content loads with valid identities and deterministic ordering', () => {
  const content = loadContent(root);
  assert.ok(content.site.name);
  for (const collection of ['projects', 'members', 'sponsors', 'posts']) {
    assert.equal(new Set(content[collection].map(entry => entry.slug)).size, content[collection].length);
    assert.ok(content[collection].every(entry => !entry.draft));
  }
  assert.ok(content.site.navigation.some(entry => entry.id === 'blog'));
  assert.deepEqual(loadContent(root), content);
});

test('project statuses are validated and errors name the file', t => {
  const dir = fixture(t);
  edit(dir, 'projects/autonomous-rover.md', 'status: Active', 'status: Running');
  assert.throws(() => loadContent(dir), /autonomous-rover\.md: status:/);
});

test('unknown fields and impossible dates fail validation', t => {
  const dir = fixture(t);
  edit(dir, 'projects/autonomous-rover.md', 'status: Active', 'status: Active\nstatuz: Completed');
  assert.throws(() => loadContent(dir), /Unrecognized key/);
  edit(dir, 'projects/autonomous-rover.md', '\nstatuz: Completed', '');
  edit(dir, 'projects/autonomous-rover.md', '2026-10-28', '2026-02-30');
  assert.throws(() => loadContent(dir), /real YYYY-MM-DD/);
});

test('drafts are excluded for every collection but still validated', t => {
  const dir = fixture(t);
  for (const [collection, file] of [['projects','autonomous-rover'],['members','club-president'],['sponsors','bmce'],['posts','keeping-the-build-log']]) {
    edit(dir, `${collection}/${file}.md`, 'draft: false', 'draft: true');
  }
  const content = loadContent(dir);
  assert.equal(content.posts.length, 0);
  assert.ok(!content.projects.some(entry => entry.slug === 'autonomous-rover'));
  assert.ok(!content.members.some(entry => entry.slug === 'club-president'));
  assert.ok(!content.sponsors.some(entry => entry.slug === 'bmce'));
  assert.ok(!JSON.stringify(content).includes('Unique fixture-only draft text.'));
  edit(dir, 'projects/autonomous-rover.md', 'status: Active', 'status: Invalid');
  assert.throws(() => loadContent(dir), /status:/);
});

test('templates can be copied into collections without publishing placeholders', t => {
  const dir = fixture(t);
  for (const [template, collection] of [['project','projects'],['member','members'],['sponsor','sponsors'],['post','posts']]) {
    fs.copyFileSync(path.join(dir, 'content/_templates', `${template}.md`), path.join(dir, 'content', collection, 'test-draft.md'));
  }
  assert.equal(loadContent(dir).projects.length, 1);
  assert.ok(!JSON.stringify(loadContent(dir)).includes('test-draft'));
});

test('Markdown rejects raw HTML, unsafe links, missing media and missing alt text', () => {
  for (const source of ['<iframe src="https://example.com"></iframe>', '[unsafe](javascript:alert)', '[unsafe](//evil.example)', '![photo](/uploads/missing.jpg)', '![](/uploads/missing.jpg)', '[reference][bad]\n\n[bad]: javascript:alert']) {
    assert.throws(() => validateMarkdown(source, root));
  }
  assert.doesNotThrow(() => validateMarkdown('**Hello**\n\n| A | B |\n| --- | --- |\n| One | Two |\n\n[Projects](#projects)', root));
});

test('referenced assets must exist and images need imageAlt', t => {
  const dir = fixture(t);
  edit(dir, 'projects/autonomous-rover.md', 'status: Active', 'status: Active\nimage: /uploads/test-pixel.png');
  assert.throws(() => loadContent(dir), /imageAlt is required/);
  edit(dir, 'projects/autonomous-rover.md', 'image: /uploads/test-pixel.png', 'image: /uploads/test-pixel.png\nimageAlt: Test image');
  assert.doesNotThrow(() => loadContent(dir));
  fs.unlinkSync(path.join(dir, 'public/uploads/test-pixel.png'));
  assert.throws(() => loadContent(dir), /Missing media file/);
});

test('YAML duplicate keys and quoted booleans are rejected', t => {
  const dir = fixture(t);
  edit(dir, 'projects/autonomous-rover.md', 'status: Active', 'status: Active\nstatus: Paused');
  assert.throws(() => loadContent(dir), /Invalid YAML/);
  edit(dir, 'projects/autonomous-rover.md', '\nstatus: Paused', '');
  edit(dir, 'projects/autonomous-rover.md', 'draft: false', 'draft: "false"');
  assert.throws(() => loadContent(dir), /draft:/);
});

test('YouTube URL variants normalize to a private, non-autoplay player', () => {
  for (const url of ['https://youtu.be/abcdefghijk', 'https://www.youtube.com/watch?v=abcdefghijk', 'https://youtube.com/shorts/abcdefghijk', 'https://youtube.com/live/abcdefghijk', 'https://www.youtube-nocookie.com/embed/abcdefghijk']) {
    assert.equal(resolveVideo(url).src, 'https://www.youtube-nocookie.com/embed/abcdefghijk');
  }
  assert.equal(resolveVideo('https://youtube.com/watch?v=abcdefghijk&t=42s&autoplay=1').src, 'https://www.youtube-nocookie.com/embed/abcdefghijk?start=42');
});

test('OneDrive and Stream embed only exact player URLs, keeping share-link fallback', () => {
  assert.ok(resolveVideo('https://onedrive.live.com/embed?resid=abc&autoplay=1').src);
  assert.ok(!resolveVideo('https://onedrive.live.com/embed?resid=abc&autoplay=1').src.includes('autoplay'));
  assert.equal(resolveVideo('https://1drv.ms/v/something').src, undefined);
  assert.equal(resolveVideo('https://onedrive.live.com/?id=abc').src, undefined);
  assert.ok(resolveVideo('https://aui-my.sharepoint.com/personal/person/_layouts/15/embed.aspx?UniqueId=abc').src);
  assert.equal(resolveVideo('https://aui.sharepoint.com/:v:/share').src, undefined);
});

test('video hosts, schemes, credentials and malformed IDs are rejected', () => {
  for (const url of ['javascript:alert(1)', 'http://youtube.com/watch?v=abcdefghijk', 'https://youtube.com.evil.example/watch?v=abcdefghijk', 'https://evilsharepoint.com/_layouts/15/embed.aspx?UniqueId=x', 'https://user:pass@youtube.com/watch?v=abcdefghijk', 'https://youtube.com:444/watch?v=abcdefghijk', 'https://youtu.be/short', 'https://example.com/video']) assert.throws(() => resolveVideo(url));
  assert.throws(() => validateMarkdown('[video: Demo](https://evil.example/player)', root), /Unsupported video provider/);
  assert.throws(() => validateMarkdown('[video: ](https://youtu.be/abcdefghijk)', root), /accessible title/);
  assert.doesNotThrow(() => validateMarkdown('[video: Demo](https://youtu.be/abcdefghijk)', root));
});

test('historical records retain year, result and location without invented technology tags', t => {
  const dir = fixture(t);
  edit(dir, 'projects/autonomous-rover.md', 'tags:\n  - ROS2\n', 'year: 2022\nresult: Confirmed result\nlocation: Dortmund, Germany\n');
  const entry = loadContent(dir).projects[0];
  assert.deepEqual(entry.tags, []);
  assert.equal(entry.year, 2022);
  assert.equal(entry.result, 'Confirmed result');
  assert.equal(entry.location, 'Dortmund, Germany');
});

test('sponsor optical bounds and gallery/background assets are validated', t => {
  const dir = fixture(t);
  edit(dir, 'sponsors/bmce.md', 'draft: false', 'draft: false\noptical: 0.82\nbounds: [0, 0, 646, 168, 646, 168]');
  assert.equal(loadContent(dir).sponsors[0].optical, 0.82);
  edit(dir, 'sponsors/bmce.md', '[0, 0, 646, 168, 646, 168]', '[0, 0, 999, 168, 646, 168]');
  assert.throws(() => loadContent(dir), /Artwork bounds/);
  edit(dir, 'sponsors/bmce.md', '[0, 0, 999, 168, 646, 168]', '[0, 0, 646, 168, 646, 168]');
  const siteFile = path.join(dir, 'content/site.md');
  const doc = matter(fs.readFileSync(siteFile, 'utf8'), { engines: { yaml: source => parse(source) } });
  doc.data.heroImages = [{ file: '/uploads/test-pixel.png', position: '50% 50%' }];
  fs.writeFileSync(siteFile, `---\n${stringify(doc.data)}---\n${doc.content}`);
  fs.unlinkSync(path.join(dir, 'public/uploads/test-pixel.png'));
  assert.throws(() => loadContent(dir), /Missing media file/);
});
