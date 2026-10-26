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

Product "Enquire" buttons link to `/{locale}?interest=product&product={key}#contact`,
which preselects the interest and pre-fills the message.

## Locale language settings

- Default locale: `vi` (Vietnamese)
- Additional locale: `en` (English)
- Locale switcher appears in header (desktop and mobile)
- Locale routing is handled by `middleware.ts`

## Change banner and section images

- Edit `content/site-config.json` to swap images per section.
- Image files should be placed in `public/images/`. Prefer compressed WebP/JPG
  (a few hundred KB) over multi-MB PNG exports.
- Current keys:
  - `hero.logoImage` (light logo on transparent background)
  - `story.image`
  - `product.items[].image` (`key` must exist in `lib/site-config.ts`)
  - `process.backgroundImage`
  - `gallery.items[]` (`key` selects the caption in `lib/i18n.ts`; optional
    `fit`: `cover` | `contain`)
  - `contact.backgroundImage`
- Copy (including product names/blurbs and gallery captions) lives in
  `lib/i18n.ts`.
