# DevNews Single-Page Layout Design

## Overview

Transform the existing DevNews Drupal theme into a polished single-page demo site suitable for a job interview portfolio. The page should feel complete and professional without being over-engineered.

## Page Structure

```
Fixed Nav → Hero Slider → Articles Grid → About → Footer
```

All sections live on one page. The nav is always visible; clicking a link scrolls to the corresponding section.

## Sections

### 1. Fixed Navigation
- `position: fixed` at the top, full width
- Dark background (`#1e293b`) with the site name "DevNews" on the left
- Links on the right: **Home · About · Articles** — scroll to `#hero`, `#about`, `#articles`
- Add `padding-top` to the body so content isn't hidden behind the nav

### 2. Hero Slider
- Full-width, ~500px tall
- Auto-rotates through the first 3 article cards already rendered on the page
- Each slide: background image + dark overlay + article title + "Read More" link
- Dot indicators at the bottom
- Built with vanilla JS — no external library
- Slide data (image URL, title, link) is read from the existing `.article-card` DOM elements at page load, so no extra Drupal configuration is needed

### 3. Articles Grid
- Existing 3-column card layout — no changes needed
- Section has an `id="articles"` anchor for nav

### 4. About Section
- Light grey background to visually separate from articles
- Centered layout: section title + 2–3 sentences describing DevNews
- Three number highlights below: e.g. **6** Categories · **50+** Articles · **2026** Since
- Numbers use the accent blue (`#0ea5e9`)

### 5. Footer
- Dark background (`#1e293b`)
- Single centered line: `© 2026 DevNews. All rights reserved.`
- Replaces/overrides Olivero's default footer

## Implementation Approach

**One new Twig template**: `templates/page--front.html.twig`
- Extends/replaces the front page layout only
- Hardcodes the Hero, About, and Footer HTML
- Includes the existing Views block for the articles grid via `{{ page.content }}`

**CSS additions** in `css/style.css`:
- Fixed nav styles
- Hero slider layout and transitions
- About section styles
- Footer override

**JS additions** in `js/main.js`:
- Slider auto-rotate (setInterval, ~5s)
- Dot indicator click handlers
- Smooth scroll for nav links (already supported natively via `scroll-behavior: smooth`)

## Constraints

- No external JS libraries (keep it lightweight)
- No changes to existing card styles
- No Drupal admin configuration required
- Must work with the existing Olivero base theme
