# Khu Mo Brochure Web (Next.js)

Public brochure website for Khu Mo Distillery, implemented with Next.js App
Router, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 20+
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000` by default.

## Build

```bash
npm run build
npm run start
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL` (optional): canonical site URL for metadata and SEO
  files; defaults to `http://localhost:3000` in development.
- `LEADS_WEBHOOK_URL` (optional): contact leads are POSTed here as JSON
  (`name`, `email`, `phone`, `interest`, `message`, `createdAt`). If unset, the
  contact API route only logs the lead server-side.

## Included v1 pages/routes

- `/` redirects to default locale `/vi`
- `/{locale}` brochure homepage (`/vi`, `/en`), statically generated
- `/{locale}/legal/privacy` legal placeholder
- `/{locale}/legal/terms` legal placeholder
- `/api/contact` POST contact endpoint (validated input, honeypot field,
  in-memory rate limit of 5 requests per IP per 10 minutes)

## Homepage layout

Top to bottom: top bar, full-screen hero slideshow, Discover (product
carousel), Story, Visit (video + "Book a visit"), Process, footer.

- **Top bar**: menu drawer (left; navigation, language, light/dark theme),
  logo (centre), search, account and wishlist (right).
- **Logo**: starts large at the bottom-centre of the hero, then glides up and
  shrinks into the top bar as the hero scrolls away. Its colour follows each
  slide's `logoTone`, then the theme colour once docked.
- **Search** filters products client-side (diacritic-insensitive) and jumps the
  Discover carousel to the selected product.
- **Wishlist** is stored in the browser (`localStorage`), no account needed.
- **Account** sign-in/register is UI only; there is no account backend yet.
- **Enquiries**: "Book a visit" and product "Enquire" buttons open the contact
  form in a popup with the interest (and product) preselected.
- **Theme**: light by default; the visitor's choice is remembered.

## Locale language settings

- Default locale: `vi` (Vietnamese)
- Additional locale: `en` (English)
- Locale switcher lives in the menu drawer
- Locale routing is handled by `middleware.ts`

## Change images, slides and video

- Edit `content/site-config.json`. Image files go in `public/images/`; prefer
  compressed WebP/JPG (a few hundred KB) over multi-MB PNG exports. Hero images
  fill the whole screen, so use landscape photos at least 1920px wide.
- Keys:
  - `brand.logoImage` (single-colour logo on a transparent background; it is
    used as a mask and recoloured) and `brand.logoAspectRatio`
  - `hero.slides[]`: `key` (selects title/description in `lib/i18n.ts`),
    `image`, `logoTone` (`light` | `dark`: logo/text colour that stands out on
    that image); `hero.intervalMs`
  - `product.items[]`: Discover carousel (`key` must exist in
    `lib/site-config.ts`)
  - `story.image`, `process.backgroundImage`
  - `visit.poster` and `visit.videoSrc` (e.g. `/videos/distillery.mp4` placed
    in `public/videos/`; `null` shows the poster image instead)
- Copy lives in `lib/i18n.ts`.
