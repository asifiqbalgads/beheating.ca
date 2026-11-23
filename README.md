# Breathe Easy Heating & Air Conditioning — Homepage Redesign

A custom, premium homepage concept for **Breathe Easy Heating and Air Conditioning Inc.** — a
family-run HVAC and fireplace company serving Lethbridge and Southern Alberta since 2014.

The page is built as a fast, dependency-free static site (HTML5 + CSS3 + vanilla JavaScript) and is
ready to host on GitHub Pages.

> **Note:** this is a *design concept* built from the business's public website content. The page is
> marked `noindex, nofollow` so it never competes with the live production site in search results.

---

## Live business information used

| | |
|---|---|
| Business | Breathe Easy Heating and Air Conditioning Inc. |
| Industry | HVAC, ventilation, fireplace and hot water services |
| Location | 3628 14 Ave N, Lethbridge, AB T1H 6E7 |
| Phone | 403-894-4989 (24/7 emergency line) |
| Email | info@beheating.ca |
| Hours | Mon–Fri 8:00 a.m. – 4:30 p.m. · 24-hour emergency service |
| Established | 2014 |
| Rating | 4.6 / 5 · 250+ Google reviews |

**Brand colours** (sampled from the company's own logo artwork):

| Token | Hex | Use |
|---|---|---|
| Lime | `#8fc31f` | Primary accent, highlights |
| Green | `#009028` | Brand green, icons, focus |
| Deep green | `#00701f` | Accessible green text |
| Sun yellow | `#f2e200` | Star ratings, small accents |
| Forest | `#0a2e1f` / `#062016` | Dark sections, header/footer |
| Cream | `#faf8f3` | Section backgrounds |

**Typography:** [Manrope](https://fonts.google.com/specimen/Manrope) for display/headings and
[Inter](https://fonts.google.com/specimen/Inter) for body copy — both loaded from Google Fonts with
`display=swap` and a system-font fallback.

---

## Project structure

```
.
├── index.html                  # Single-page homepage (semantic HTML5 + JSON-LD)
├── css/
│   └── style.css               # Design tokens, components, mobile-first responsive rules
├── js/
│   └── script.js               # Nav, services panel, accordion, slider, scroll reveal
├── assets/
│   ├── images/                 # Optimised WebP photography (hero, services, work mosaic)
│   └── logo/                   # Logo lockup + favicons
├── .nojekyll                   # Tells GitHub Pages to serve files as-is
└── README.md
```

All paths are **relative**, so the site works from a repository subdirectory
(`https://<user>.github.io/<repo>/`) as well as from a domain root.

---

## Homepage sections

1. Utility bar — 24/7 notice, email, hours, phone
2. Sticky header — logo, primary navigation, call link, "Book a service" CTA
3. Hero — positioning statement, dual CTA, rating/trust row, branded photography with floating badges
4. Service marquee — continuous keyword strip
5. About — "Breathe easy with our guarantee", company story, trust stats
6. Services — interactive editorial list (desktop media panel / mobile thumbnails) + extras chips
7. Why Breathe Easy — four proof points on a dark forest panel + financing note
8. Process — four-step "how it works" timeline
9. On the job — asymmetric photo mosaic
10. Reviews — real Google testimonials in a scroll-snap slider
11. Service area + contact band — phone, address, email, hours, directions
12. FAQ — accessible accordion
13. Final CTA + footer — full NAP details and service links
14. Mobile action bar (Call / Book) and desktop floating callback button

---

## Interactions

- Mobile drawer navigation with scroll lock, ESC-to-close, scrim, and focus return
- Sticky, compacting header on scroll
- Service list drives a sticky image panel (hover/focus/click); degrades to thumbnails on touch
- Accessible FAQ accordion (`aria-expanded` / `aria-controls`, one open at a time)
- Testimonial slider with keyboard support, dots, and disabled state at both ends
- Reveal-on-scroll animations that respect `prefers-reduced-motion`

No backend is included, and no contact form is faked — every call-to-action points to the real
phone number, email address, Google Maps listing, or the live booking page.

---

## Local preview

Any static server works:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploying to GitHub Pages

1. Push the project to the repository's default branch (or the branch Pages is configured to use).
2. **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Select the branch and the `/ (root)` folder, then save.
4. The site is published at `https://<user>.github.io/<repo>/` (or the custom domain, if configured).

`.nojekyll` is included so that asset folders are served without Jekyll processing.

---

## Assets & credits

- **Logo and photography**: supplied by Breathe Easy (sourced from the company's own website and
  public business listings), optimised to WebP and re-cropped for layout. The logo has been
  background-cleaned only — the mark and wordmark are unchanged.
- **Two supporting service visuals** (air-conditioning condenser and indoor-air-quality interior)
  were generated as illustrative imagery in the brand's style, because the source site had no usable
  photography for those two services. They are not presented as completed customer projects.
- **Icons**: custom inline SVG (no icon font, no emoji).

---

## Browser support

Evergreen Chrome, Edge, Firefox and Safari (desktop + iOS/Android). The layout is mobile-first with
breakpoints tuned for 360, 390, 430, 768, 1024, 1280 and 1440 px viewports. WebP images with native
lazy loading; graceful degradation without JavaScript (all content remains readable and the first
FAQ answer stays open).
