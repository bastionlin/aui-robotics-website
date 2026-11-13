# AUI Robotics Club Website

A responsive, static club website following the AUI Robotics Club logotype guidelines. Content is managed in Markdown through GitHub, without a backend or database.

## Development

```bash
npm install
npm run dev
```

Run `npm run build` for the production bundle and `npm run preview` to inspect it locally.

## Edit Content Without Writing Code

- Projects and their statuses: `content/projects/*.md`.
- Members, roles and advisors: `content/members/*.md`.
- Partners: `content/sponsors/*.md`.
- Journal posts: `content/posts/*.md`.
- Section copy: `content/sections/*.md`.
- Hero, contact address, navigation and footer identity: `content/site.md`.

Start with [the content guide](docs/CONTENT-GUIDE.md) and a template in `content/_templates/`. AI contributors must read [AGENTS.md](AGENTS.md). Markdown supports images, links, tables and click-to-load YouTube/OneDrive/Stream videos. The build validates frontmatter, dates, status values, media paths and video hosts. Drafts are omitted from the frontend bundle, not hidden from a public Git repository.

Run `npm run content:check`, `npm test`, and `npm run build` before merging. The included GitHub workflow runs all three. Your existing Git-connected static host must rebuild and publish `dist/` after a merge; the workflow itself is validation, not a deployment service. Journal URLs use `#blog/<slug>` and work without server rewrites.

The latest competition record, seven executive board members, three faculty advisors, eleven partner records, approved logo sizing, real event photos, and the Build. Break. Repeat. tagline are preserved in Markdown. The removed curious section and project Get involved link remain removed. See the content guide before editing historical results or named profiles.

## Brand Assets

The original black and white logo artwork is in `public/brand/`. Montserrat and DM Sans are hosted locally in `public/fonts/`. Brand colors and layout tokens are declared at the top of `src/index.css`.

Logos have 2X clear space, with X equal to one twenty-third of the horizontal artwork width. The horizontal lockup remains at least 160px wide. No AI-generated background, lab concept image, missing-photo placeholder, or decorative logo effect is used.

## Contact

The contact form composes a message to `auirobotics@aui.ma` in the visitor's email application. It does not submit to a server, clear the visitor's message, or claim that an email has been delivered. Direct email links are also provided.

## Motion And Accessibility

The app uses Framer Motion for entrance and selection transitions, Lenis for smooth navigation, and GSAP ScrollTrigger for reading progress. Reduced motion uses native navigation without scroll animation. The project selector supports arrow keys, Home, and End. Mobile navigation supports Escape and restores focus to its trigger.

See `DESIGN-NOTES.md` for the comparison and redesign decisions.
