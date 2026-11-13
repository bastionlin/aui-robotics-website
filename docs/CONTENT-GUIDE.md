# Edit the Website With Markdown

The website is a static React/Vite build. GitHub stores the content; it is not a runtime CMS. No backend, database, account system, or secret API key is needed.

## Where to Edit

| Change | File |
| --- | --- |
| Email, tagline, location, navigation, hero copy | `content/site.md` |
| A section heading, introduction, principles or competition gallery | `content/sections/<section>.md` |
| Project status, stack, progress, photos or videos | `content/projects/<project-slug>.md` |
| Member name, role, biography, portrait, LinkedIn | `content/members/<member-slug>.md` |
| Sponsor name, logo or website | `content/sponsors/<partner-slug>.md` |
| Journal article | `content/posts/<post-slug>.md` |
| Uploaded images and downloadable resources | `public/uploads/` |

The body of each section, project, member and post is rendered as Markdown. The body of a sponsor record is an editorial maintenance note, not visible under its logo. Section layouts and UI labels (form labels, filters, accessibility text) remain in React. The six section filenames (`about`, `projects`, `team`, `sponsors`, `blog`, `contact`) and their order are fixed; adding an entirely new section type is a development task. The former curious/join section was intentionally removed; Join us links to Contact.

Hero and footer backdrop pools live in `site.md` under `heroImages` and `footerImages`. Project backdrops live in `sections/projects.md` under `backdrops`. Each entry has `file: /uploads/photos/filename.webp` and `position: 50% 50%` (percentages from 0 to 100). An empty list removes the backdrop. The About competition strip uses `galleryLabel`, `galleryBody`, and `gallery` entries containing `image`, `imageAlt`, `caption`, `width`, `height`. Keep actual dimensions so foreground event photos remain uncropped. Gallery and background paths are validated too.

## The Everyday GitHub Workflow

1. Open the relevant `.md` file on GitHub and select Edit. For a new record, copy the matching file from `content/_templates/` into the right collection.
2. Edit the YAML fields between the two `---` lines. Write the article, progress update or biography below them using Markdown.
3. Keep a lowercase kebab-case filename, such as `autonomous-rover.md`. The filename is a stable ID. Renaming a post changes its public address.
4. Open a pull request with a short explanation. The **Content and build** GitHub Action checks the content, tests and production build.
5. Merge when checks pass. Your static host must be connected to GitHub and configured to run `npm ci` and `npm run build`, publishing `dist/`. That rebuild makes the change live.

The included GitHub Action validates changes; it does not choose or configure a hosting provider. On an existing Git-connected host, retain its deployment configuration. For GitHub Pages under a repository subpath, set Vite's `base` to that path first. Journal links use `#blog/<slug>`, so no server rewrite or backend route is required.

## Project Example

```markdown
---
title: Autonomous Rover
category: Ground Robotics
status: Active
summary: A short, factual description for previews.
tags:
  - ROS2
  - Python
updated: '2026-11-13'
order: 1
draft: false
---
## Current progress

Describe what has actually been built and tested.

## Next steps

- State the next confirmed milestone.
```

Statuses are case-sensitive: `Active`, `Completed`, `Upcoming`, `Paused`. `order` is a nonnegative integer; lower numbers appear first. Update `updated` when the project record actually changes. Existing records were migrated from the previous site, not independently reverified.

Optional project fields: `year`, `result`, `location`, `image`, `imageAlt`, `imageWidth`, `imageHeight`, `repository` (HTTPS). `tags` is optional for historical competition records. `imageAlt` is required if `image` is set. The Markdown body can include progress notes, headings, lists, tables, resource links, photos and video links. The short `summary` is required metadata and should be at most 320 characters. Preserve verified historical results: TAIPAN's 2022 WRO result belongs to Dortmund, and the 2026 entry is WRO Open Championship Europe in Zagreb, not the International Final. There is deliberately no Get involved CTA in competition details.

## Members and Partners

Member fields: `name`, `role`, `group` (`leadership`, `advisor`, `member`), optional `placeholder`, `order`, `draft`, `image`, `imageAlt`, `linkedin` (HTTPS). The body is the biography or role description. The current board and faculty advisors are named records migrated from the latest website. Preserve them unless given confirmed changes. For an explicitly unfilled role, `placeholder: true` shows its role rather than pretending a named person is confirmed.

Sponsor fields: `name`, optional `order`, `draft`, `logo`, `href` (HTTPS), `descriptor`, `monochrome` (boolean), `optical` (positive number up to 3), and `bounds` (`[left, top, artworkWidth, artworkHeight, originalWidth, originalHeight]`). Existing bounds and optical adjustments preserve the approved equal-visual-area layout without modifying the source marks. Keep them when changing prose. HPS remains full-colour; ActiveLabs and the corrected Menasteel logo are retained. Use only confirmed relationships and approved marks. Club brand assets in `public/brand/` must not be changed for a routine content edit.

## Publish a Journal Entry

Copy `content/_templates/post.md` into `content/posts/your-slug.md`. Required fields: `title`, `date`, `author`, `summary`. Optional fields: `updated`, `tags`, `image`, `imageAlt`, `order`, `draft`. Posts are sorted by `date` newest first, then filename. Dates must be real `YYYY-MM-DD` values. Future dates are not an automatic scheduling system: use `draft: true` until ready, then publish in a new commit.

A published entry is available at `/#blog/your-slug` (or `<your-base-path>/#blog/your-slug`). Change `draft: true` to `draft: false` to include it. Empty collections show an appropriate empty state. Drafts are validated but excluded from the JavaScript bundle; there is no public draft-preview route. You can preview a draft locally by temporarily setting it to false and reverting that field before committing.

**Draft does not mean private.** Files committed to a public GitHub repository remain visible there. Everything in `public/`, including unused images or videos, is copied to the published site. Never commit private material, secrets, private student information, or unpublished media that must remain confidential.

## Markdown and Images

Use headings (`##`), paragraphs, **bold**, lists, blockquotes, fenced code, links and GitHub-style tables. Do not use raw HTML, JSX, iframe snippets, scripts or inline styles. Image paths are local and validated:

```markdown
![Describe the actual robot and what the photo shows](/uploads/projects/rover-test.jpg)

[Download the workshop resource](/uploads/resources/workshop.pdf)

[Visit the repository](https://github.com/your-org/your-project)
```

Upload the actual file under the matching `public/uploads/` path. Use meaningful alt text, small optimized images, clear filenames, and consent for personal photographs. Missing files fail the build. Use `#projects`, `#team`, `#contact` and `#blog/<slug>` for internal links. Relative links to `.md` files are not web addresses.

## YouTube, OneDrive and Microsoft Stream

Put a video link **alone in a paragraph**, with the exact `video:` prefix and an accessible title:

```markdown
[video: Rover obstacle-avoidance demonstration](https://www.youtube.com/watch?v=YOUR_ID_HERE)
```

Replace the placeholder with a real 11-character YouTube ID. Watch, share (`youtu.be`), shorts, live and embed URLs are accepted. Players use YouTube's privacy-enhanced domain and load only after the visitor clicks. Do not invent a URL or use an unrelated example clip as club footage.

For OneDrive, copy only the **HTTPS URL inside `src="..."`** from Microsoft's generated Embed code, not the whole iframe:

```markdown
[video: Workshop recording](https://onedrive.live.com/embed?resid=YOUR_REAL_RESOURCE_ID&authkey=YOUR_EMBED_KEY)
```

The placeholders above are not working credentials. A real personal OneDrive embed URL is supported. Microsoft Stream/SharePoint-generated URLs ending in `/_layouts/15/embed.aspx?UniqueId=...` are also supported, including personal or site path prefixes. Ordinary OneDrive sharing links (`1drv.ms` or `onedrive.live.com`) and SharePoint sharing links render an **Open video** link rather than being guessed into an embed URL.

Availability depends on the Microsoft account, tenant policy and sharing permissions. Embedding does not bypass sign-in or access restrictions. Test as an intended visitor in an incognito window. If the provider blocks framing or requires login, the Open video link remains available. For a fully public site, an approved public/unlisted YouTube upload is often simpler. Provide captions or a nearby transcript for spoken content.

Small local `.mp4` and `.webm` files can use the same video syntax with `/uploads/...`, but do not commit large recordings. No provider request is made by a player until clicked. Ordinary external links still navigate to their provider when opened.

Official references: [React Markdown](https://github.com/remarkjs/react-markdown), [Vite virtual modules](https://v5.vite.dev/guide/api-plugin.html), [Microsoft embedding guidance](https://support.microsoft.com/en-gb/onedrive/how-to-add-an-embedded-document-or-picture-into-a-webpage).

## Local Checks

```bash
npm ci
npm run content:check
npm test
npm run build
npm run dev -- --host 127.0.0.1
```

The dev server watches new, edited and deleted content files. YAML syntax errors, unknown fields, invalid statuses/dates, missing images and unsupported video hosts produce a file-specific error. A failing production build should block deployment.

## A Prompt for an AI Agent

> Read AGENTS.md and docs/CONTENT-GUIDE.md. Update only content/projects/taipan.md: add the supplied technical note to the Markdown body. Preserve its completed status, filename, year, result, location and frontmatter schema. Set updated to the actual edit date. Do not invent milestones, people or media. Run content:check, tests and build. Do not change UI code or push automatically.
