# AUI Robotics Website: Agent Instructions

## Content First

This is a static, Git-managed website. There is no database, CMS server, authentication service, or runtime content API. Routine editorial requests belong in `content/**/*.md`, not React components or JavaScript data arrays. Read `docs/CONTENT-GUIDE.md` before editing content, and use the matching file in `content/_templates/` for new entries.

## Required Conventions

- Preserve the YAML frontmatter delimiters and field types. Filenames are lowercase kebab-case and become stable slugs.
- Project statuses are exactly `Active`, `Completed`, `Upcoming`, or `Paused`. Update the body with a factual progress note and set `updated` to the actual update date.
- Never invent member names, achievements, sponsor relationships, project milestones, or video URLs. Retained role placeholders must remain explicitly marked `placeholder: true` until confirmed.
- Preserve the latest named board/advisor records, corrected competition results, ActiveLabs and Menasteel logos, full-colour HPS mark, uncropped event gallery, randomized photo backdrops, and Build. Break. Repeat. tagline. Do not restore the removed curious/join section, old fictional project placeholders, or Get involved CTA in competition details. Join us points to Contact.
- Use real `YYYY-MM-DD` dates. Set `draft: true` for unfinished content. Drafts are validated but excluded from the site bundle. Drafts committed to a public GitHub repository are NOT private.
- Use ordinary Markdown, not HTML, JSX, scripts, inline styles, or iframe snippets. Video syntax is a standalone `[video: Accessible title](https://supported-provider-url)` link.
- Keep media in `public/uploads/`; refer to it as `/uploads/...`. Do not put large videos in Git. Use approved external video hosting.
- Only publish photos and personal profiles with consent. Provide meaningful alt text, titles for videos, captions/transcripts for spoken video, and verify sharing permissions in an incognito window.
- Do not alter the original club logotype, its proportions, minimum size, clear space, fonts, or the established monochrome visual system for an editorial task. Do not reintroduce generated lab backgrounds.
- Keep content edits scoped. Do not change schemas, dependencies, layouts, or deployment configuration unless the request actually needs it. Unsupported fields should not be silently added.

## Architecture

`scripts/content-loader.mjs` parses and validates content at build time. `scripts/content-plugin.mjs` exposes only published content as `virtual:club-content`. `src/content.js` is the frontend access point. `MarkdownContent` renders safe Markdown; `VideoEmbed` handles allowlisted, click-to-load media. Blog URLs use `#blog/<slug>` so static hosting needs no rewrite rules. UI and accessibility labels remain in React; editorial copy lives in Markdown.

## Before Finishing

1. Run `npm run content:check`.
2. Run `npm test` and `npm run build`.
3. For layout or renderer changes, check desktop and mobile, project filters, member links, blog deep links/back navigation, and video fallback links. Do not claim playback was verified without a real authorized video.
4. Report the files changed and verification performed. Do not commit or push unless requested. Never discard unrelated changes.

Content is published only after the repository's static deployment rebuilds. A GitHub edit alone does not update a previously deployed bundle unless the host has Git integration configured.
