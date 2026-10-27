# Khu Mo Brochure Web (Next.js)

Public brochure website for Khu Mo Distillery, implemented with Next.js App
Router, TypeScript, and Tailwind CSS. The design follows
`../documents/UI_UX_DESIGN_SPEC.md`.

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
- `LEADS_WEBHOOK_URL` (optional): enquiries are POSTed here as JSON
  (`name`, `phone`, `email`, `interest`, `product`, `productName`, `packaging`,
  `quantity`, `company`, `region`, `message`, `consent`, `createdAt`; empty
  optional fields are omitted). If unset, the API route only logs the lead
  server-side.

## Routes

- `/` redirects to the default locale `/vi`
- `/{locale}` homepage: hero slideshow, product lines, brand story, quality and
  process, where-to-buy teaser
- `/{locale}/products` catalogue with filters (category, volume, packaging)
  kept in the URL query, e.g. `?category=infused`
- `/{locale}/products/{slug}` product detail: gallery, specs, purchase and bulk
  enquiry, packaging, related products
- `/{locale}/story` brand story, `#process`, `#news`
- `/{locale}/where-to-buy` points of sale, `#delivery`, `#order` enquiry form
- `/{locale}/partners` company facts, distribution, `#partner-form`
- `/{locale}/legal/{privacy|terms|cookies|shipping}` draft legal pages (need
  legal review before launch)
- `/api/contact` POST enquiry endpoint (zod validation shared with the form,
  honeypot field, in-memory rate limit of 5 requests per IP per 10 minutes)

All pages are statically generated for `vi` and `en`. Unknown product slugs
and paths return 404.

## Age gate and cookies

- First visit shows an 18+ age gate; the page behind it is inert until the
  visitor confirms. "Leave" sends the visitor to google.com.
- After the gate, a cookie notice offers "accept all", "essential only" or
  per-category settings (analytics, marketing). It can be reopened from the
  footer ("Cookie settings").
- Choices are stored in `localStorage`: `khu-mo:age-verified`,
  `khu-mo:cookie-consent`, `khu-mo:theme`. A head script applies them before
  first paint, so returning visitors never see the gate flash.
- No analytics or marketing scripts are installed yet; read the stored consent
  before adding any.

## Content

Copy lives in `lib/i18n.ts`; data lives in JSON validated by zod at build time.

### `content/products.json`

Each product has `slug`, `category` (`traditional` | `infused`), `palette`
(label colour used for the placeholder image), `images[]`, localized `name`,
`tagline`, `description`, `colors`, plus `origin`, `abv`, `ingredients` and
`variants[]` (`volumeMl`, `packaging`: `bottle` | `pack` | `can`, `price` in
VND). Use `null` for anything not confirmed: the site shows "Đang cập nhật" for
specs and "Liên hệ báo giá" for prices. A filter group appears only when it has
more than one option.

### `content/site-config.json`

- `brand.logoImage` (single-colour logo on a transparent background; it is used
  as a mask and recoloured) and `brand.logoAspectRatio`
- `company`: `name`, `address`, `phone`, `email`, `taxCode`, `facebookUrl`.
  When `phone` is set, call buttons appear across the site.
- `hero.slides[]`: `key` (`brand` | `distillery` | `product`, selects copy in
  `lib/i18n.ts`), `image`, `tone` (`light` | `dark`: text and logo colour that
  stands out on that image), `href` (CTA target); `hero.intervalMs`
- `story.image`, `process.image`
- `salesPoints[]`: `name`, `type` (`distillery` | `store` | `agent`),
  `address`, optional `phone`, `hours`. "Directions" links to Google Maps
  searched by address.

Image files go in `public/images/`; prefer compressed WebP/JPG. Hero images
fill the whole screen, so use landscape photos at least 1920px wide.

### Still to confirm

- Phone, email, tax code and Facebook page
- Volume, ABV, ingredients and prices for both products
- Photos for Rượu mơ ngâm đường phèn
- Company address (read from the bottle label), story and process copy
- Legal pages

## Locales

- Default locale: `vi` (Vietnamese); additional locale: `en`
- Switch from the top bar (desktop) or the menu drawer (mobile)
- Locale routing is handled by `middleware.ts`

## Theme

Light by default, with an optional dark theme; the visitor's choice is
remembered.
