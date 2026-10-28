# Comparison And Merge Decisions

The final implementation lives in this repository, `/home/redapple/coding/aui-robotics-website`.

| Area | Existing Repository | Earlier Brand Version | Merged Result |
| --- | --- | --- | --- |
| Identity | Archivo/Manrope, compressed headings, grid background, theme toggle | Original logo, Montserrat/DM Sans, brand tagline | Original logo, self-hosted brand fonts, consistent black/white/grey section treatments |
| Opening | Full-height generic engineering claim; missing hero asset produces a fallback | Brand-first opening with clear student and partner paths | Image-free brand opening with project and student paths; next section remains visible at normal desktop/mobile sizes |
| Projects | Six narrow carousel entries, bot placeholders, content squeezed at desktop | Broad engineering disciplines without individual project records | Retained six project records; status filters, keyboard-accessible project index, readable selected details |
| Club Introduction | Statistics and missing photo slots | Open editorial layout and practical principles | Editorial introduction and three open principles; no unconfirmed statistics or missing image slots |
| Team | Role placeholders presented as personal profile cards and advisor portraits | No detailed team structure | Named organizational roles and mentor areas from the existing data, without fictional names or portrait placeholders |
| Partners | Existing partner names and local logo assets | Clear partner proposition | Original partner records plus the partnership invitation and three concrete ways to contribute |
| Contact | Local success message without transmission; placeholder social links; different email | Direct mail links using the supplied guide's club address | Labelled contact fields that compose an actual email draft, direct mail links, no false delivery claim or dead social links |
| Imagery | Optional photo slots and empty image fallbacks | Lab concept image | No lab pictures, AI-generated hero, or image placeholders; original brand artwork and partner marks only |

## Section Plan

| Section | Treatment | Pattern |
| --- | --- | --- |
| Hero | Black identity field | Staggered reveal |
| The Club | White editorial introduction and open columns | Staggered reveal |
| Projects | Black project index and selected details | Sticky index |
| The Team | White role roster and mentor areas | Sticky introduction and reveal |
| Partners | Light-grey band, flat white logo wall | Staggered reveal |
| Join Us | Black discipline tabs and charcoal content | Reveal and tab transition |
| Contact | White invitation and unframed email form | Final reveal |

Brand palette: `#000000`, `#222222`, `#888888`, `#E5E5E5`, `#FFFFFF`. Third-party sponsor artwork retains the supplied source colors. The club logo is never filtered, animated, distorted, or recreated as text.

The project titles, descriptions, statuses, and partner records remain owner-supplied content. The redesign does not independently verify those records. No deployment, commit, or push is performed.

## Verified Result

| Step | Section | Result |
| --- | --- | --- |
| 1 | Hero | Original artwork, minimum logo width, exclusion space, compact desktop layout, and mobile layout verified |
| 2 | The Club | Editorial layout and open principles reviewed; no missing images or unsupported statistics |
| 3 | Projects | All six records retained; status filtering, selection, arrow keys, Home/End, and horizontal mobile layout verified |
| 4 | The Team | Organizational roster and mentor areas reviewed; no fictional portraits or names |
| 5 | Partners | All supplied image assets load; ten partner entries remain available; website links preserved |
| 6 | Join Us | Four discipline tabs, keyboard navigation, selected content, and role-specific email subjects verified |
| 7 | Contact | Native validation, correctly addressed email draft, message preservation, and responsive fields verified |

Production build: passed. Browser runtime errors: none. Responsive widths checked: 320, 390, 768, 1440, and 1920 pixels. Reduced-motion navigation, mobile menu dismissal, Escape focus restoration, anchor alignment, and horizontal-overflow checks passed. This is targeted UI verification, not a full accessibility certification.

Local evidence is saved in the ignored `test-output/redesign/` directory. `comparison.png` places the original repository and merged result side by side. These review images are not included in the production bundle or intended to be committed.
