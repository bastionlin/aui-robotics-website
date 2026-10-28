# AUI Robotics Club Website

A responsive, single-page club website following the supplied AUI Robotics Club logotype guidelines.

## Development

```bash
npm install
npm run dev
```

Run `npm run build` for the production bundle and `npm run preview` to inspect it locally.

## Club Content

- Projects and their statuses: `src/data/projects.js`.
- Club leadership roles and mentor areas: `src/data/team.js`.
- Partner names, website links, and logo paths: `src/data/sponsors.js`.
- Contact address and navigation: `src/lib/club.js`.

The team currently lists the organizational roles supplied in the repository. Add confirmed names and profiles to the data before introducing individual member profiles. Project descriptions and partner records have been retained from the existing site.

## Brand Assets

The original black and white logo artwork is in `public/brand/`. Montserrat and DM Sans are hosted locally in `public/fonts/`. Brand colors and layout tokens are declared at the top of `src/index.css`.

Logos have 2X clear space, with X equal to one twenty-third of the horizontal artwork width. The horizontal lockup remains at least 160px wide. No AI-generated background, lab concept image, missing-photo placeholder, or decorative logo effect is used.

## Contact

The contact form composes a message to `auirobotics@aui.ma` in the visitor's email application. It does not submit to a server, clear the visitor's message, or claim that an email has been delivered. Direct email links are also provided.

## Motion And Accessibility

The app uses Framer Motion for entrance and selection transitions, Lenis for smooth navigation, and GSAP ScrollTrigger for reading progress. Reduced motion uses native navigation without scroll animation. Project and discipline selectors support arrow keys, Home, and End. Mobile navigation supports Escape and restores focus to its trigger.

See `DESIGN-NOTES.md` for the comparison and redesign decisions.
