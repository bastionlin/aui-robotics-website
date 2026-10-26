# AUI Robotics Club Website

The official single-page website for AUI Robotics Club at Al Akhawayn University in Ifrane, Morocco.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build, then `npm run preview` to review it locally.

## Update club content

- Projects live in `src/data/projects.js`.
- Leadership and advisor details live in `src/data/team.js`.
- Sponsor names and logo paths live in `src/data/sponsors.js`.
- The contact form is frontend-only and shows a local confirmation after submit.

## Replace visual placeholders

Add the actual photo at the matching path inside `src/assets/images/`. The app detects files in this folder during build and renders a labelled bot fallback when a slot is empty or an image fails to load. Images use `object-fit: cover`, so close aspect ratios are best.

| Section | File path | Recommended dimensions |
| --- | --- | --- |
| Hero background | `src/assets/images/hero.jpg` | 1920 x 1080 |
| About photo | `src/assets/images/about-1.jpg` | 800 x 600 |
| About photo | `src/assets/images/about-2.jpg` | 800 x 600 |
| Advisor photos | `src/assets/images/team/advisor-[name].jpg` | 400 x 400 |
| Sponsor logos | `src/assets/images/sponsors/[name].png` | 600 x 240 |
| Member 1-N | `src/assets/images/team/member-N.jpg` | 400 x 400 |
| Project images | `src/assets/images/projects/[name].jpg` | 800 x 600 |
| Club logo | `src/assets/images/logo.png` | 200 x 60 transparent PNG |

When a filename changes, update the corresponding image value in `src/data/projects.js`, `src/data/team.js`, or `src/data/sponsors.js`. The hero, about photos, and logo paths are set in their relevant section component. Replace the role-based advisor placeholders with confirmed names, roles, and profiles in `src/data/team.js`.
