# Apex Pain Clinic v2 — Post-Build Notes

**Live URL:** https://cmarrero117.github.io/apex-pain-clinic-v2/  
**Repo:** https://github.com/cmarrero117/apex-pain-clinic-v2  
**Build completed:** June 29, 2026  
**Site type:** Informational / Lead Generation

---

## What Was Built

A 4-page static website for a fictional pain management clinic, deployed via GitHub Pages. Built incrementally using the Generic GitHub Website Playbook to avoid the timeout and hallucination issues encountered in the previous `apex-pain-clinic-demo` build.

### Pages
| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, trust bar ticker, services preview, about teaser, team teaser, contact form |
| Services | `services.html` | Full 6-service grid with page banner |
| About | `about.html` | Mission, core values list, stats band |
| Team | `team.html` | 3 doctor cards with specialties |

---

## File Structure

```
apex-pain-clinic-v2/
├── index.html
├── services.html
├── about.html
├── team.html
├── css/
│   ├── tokens.css       # Design system: color, type, spacing, shadow tokens
│   └── style.css        # All component and layout styles
├── js/
│   └── main.js          # Nav toggle, sticky header shadow, form submission
└── BUILDNOTES.md
```

---

## Design System (tokens.css)

- **Color palette:** Muted blue-steel primary (`#2c5f7a`), warm white surface, soft grays for text hierarchy
- **Typography:** System font stack; fluid scale using `clamp()` for headings
- **Spacing:** Token-based scale (`--space-1` through `--space-20`) applied consistently across all sections
- **Shadows:** 3-level system (`--shadow-sm`, `--shadow-md`, `--shadow-lg`)
- **Border radius:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

---

## Key Component Decisions

### Navigation
- Sticky header with scroll-triggered shadow via JS
- Mobile hamburger toggle with `aria-expanded` state managed in `main.js`
- `aria-current="page"` set on active nav link per page
- All nav links close the mobile menu on click

### Trust Bar
- CSS keyframe marquee ticker (`aria-hidden="true"` on the track — purely decorative)
- Items duplicated in HTML for seamless loop without JS

### Hero
- Full-viewport with overlay and `aria-labelledby` pointing to `h1`
- Scroll arrow links to `#services` section with `aria-label`
- Reduced-motion: animation disabled via `@media (prefers-reduced-motion: reduce)`

### Contact Form
- `novalidate` + native `checkValidity()` / `reportValidity()` for validation
- Success message uses `role="status"` + `aria-live="polite"` + `aria-atomic="true"`
- All required fields have both `required` and `aria-required="true"`
- All inputs have `autocomplete` attributes (`name`, `email`, `tel`, `off`)
- Date field has `aria-describedby` pointing to a visible hint span

---

## Accessibility Checklist ✅

- [x] `lang="en"` on `<html>`
- [x] Skip link to `#main` on every page
- [x] All landmark roles (`banner`, `main`, `contentinfo`, `navigation`)
- [x] `aria-current="page"` on active nav link
- [x] `aria-expanded` toggled in JS on mobile nav
- [x] `aria-label` on all icon-only buttons and links
- [x] `aria-hidden="true"` on all decorative SVGs and elements
- [x] Form `autocomplete`, `aria-required`, `aria-describedby`
- [x] Form success `role="status"` + `aria-live` + `aria-atomic`
- [x] Doctor tag lists labelled with `aria-label="Specialties"`
- [x] Decorative dot spans in values list hidden from AT
- [x] Reduced motion support via CSS

---

## Mobile QA ✅

- Verified at 375px (iPhone SE) across all 4 pages
- Two breakpoints: `≤768px` and `≤480px`
- Hero, sections, cards, buttons, stats, footer all verified
- `btn--nav` excluded from full-width rule at 480px
- Stats numbers use `clamp()` to prevent overflow on small screens

---

## What Worked Well

- **Incremental build strategy** — building one section/page at a time eliminated timeouts and kept each commit focused
- **tokens.css first** — design coherence across all 4 pages required zero style backtracking
- **Semantic HTML from day one** — the a11y audit required only minor additions, not structural rewrites
- **CSS-only trust bar ticker** — no JS dependency for the marquee animation
- **`aria-hidden` on decorative SVGs** — established early as a default pattern, saved audit time

---

## Open Items / Future Enhancements

- [ ] Replace placeholder doctor avatar SVGs with real photos
- [ ] Connect contact form to a backend (e.g. Formspree, Netlify Forms)
- [ ] Add a Testimonials / Reviews section to index.html
- [ ] Add a Locations page or map embed
- [ ] Add Open Graph meta tags for social sharing previews
- [ ] Consider adding a blog/articles section for SEO
- [ ] Privacy Policy and Terms of Use pages (currently placeholder `#` links)

---

## Lessons for Future Builds

1. Always establish `tokens.css` before writing any component styles
2. Set `aria-hidden="true"` on decorative SVGs as the default at write time, not during audit
3. Add `autocomplete` attributes to form inputs at build time — not as an afterthought
4. Duplicate trust bar items in HTML (not JS) for CSS-only animation loops
5. Apply `aria-required` alongside HTML `required` from the start
6. Two-breakpoint mobile strategy (`≤768px` + `≤480px`) is sufficient for this site type
