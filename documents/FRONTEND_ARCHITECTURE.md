# Frontend architecture — Khu Mo brochure site

Goals: **fast loading**, **SEO-friendly**, **easy to maintain**. The public site is a marketing/brochure experience; a separate **admin/CRM** (e.g. existing Spring + Vaadin) can stay on another origin or path.

---

## Framework choice

### Recommended: **Next.js (App Router)** + **TypeScript**

| Criterion | Why Next.js fits |
|-----------|------------------|
| **Fast loading** | Static generation (`generateStaticParams` / default static where possible), automatic code splitting, built-in **Image** optimization, edge-friendly deployments. |
| **SEO** | Server-rendered or static HTML per route; **`metadata` API** (title, description, Open Graph, canonical); easy **`sitemap.ts`** / **`robots.ts`**; semantic markup in React. |
| **Maintainability** | Large ecosystem, clear patterns, easy onboarding; same language as many backends; [Vercel](https://vercel.com) aligns with your repo’s “Vercel” direction. |

**Deployment:** Static export (`output: 'export'`) if the site is 100% static + form via external API; otherwise default Node/edge build with **ISR** for rare content updates.

### Strong alternative: **Astro**

- **Best raw performance** for content-heavy brochure (minimal JS by default, “islands” for contact form only).
- **Trade-off:** Smaller hiring pool than Next; deeper Next integration if you later merge app + marketing in one monolith.

**Decision:** Prefer **Next.js** unless you want absolute minimum JS and are comfortable with Astro’s model.

---

## Folder structure (Next.js App Router)

```
khu-mo-web/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, metadata defaults, header/footer shell
│   ├── page.tsx                   # Home: Story, Product, Process, Gallery, Contact sections
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── opengraph-image.tsx         # Optional dynamic OG (or static og.png in app/)
│   ├── legal/
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   └── api/
│       └── contact/
│           └── route.ts           # POST contact → your backend or email provider
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── MobileNav.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Story.tsx
│   │   ├── Product.tsx
│   │   ├── Process.tsx
│   │   ├── Gallery.tsx
│   │   └── Contact.tsx
│   └── ui/                        # Buttons, Section, Container, etc.
├── lib/
│   ├── constants.ts               # Nav links, site URL
│   └── utils.ts                   # cn(), helpers
├── content/                       # Optional: MD/MDX for copy (see libraries)
├── public/
│   ├── images/
│   └── favicon.ico
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

**Coexistence with Java CRM:** Keep `my-app` (Spring/Vaadin) as **admin only**; brochure lives in `khu-mo-web/` (or repo split). Contact API can proxy to Spring REST or use a serverless mail/CRM integration.

---

## Key libraries

| Area | Library | Role |
|------|---------|------|
| **Styling** | **Tailwind CSS** | Fast iteration, design tokens in `tailwind.config`, matches `UI_UX_BRAND.md` as CSS variables. |
| **Class merge** | **clsx** + **tailwind-merge** (or **cva** for variants) | Safe conditional classes. |
| **Forms** | **React Hook Form** + **Zod** | Contact form validation; `@hookform/resolvers` for Zod. |
| **Images** | **next/image** | Lazy load, sizes, modern formats. |
| **Icons** | **Lucide React** | SVG icons (aligned with brand checklist: no emoji-as-icons). |
| **Analytics** (optional) | **Vercel Analytics** / **Plausible** | Privacy-friendly, lightweight. |
| **Content** (optional) | **MDX** (`@next/mdx`) or **Contentlayer** | Editors maintain Story/Process copy without touching layout code. |
| **E2E** (optional) | **Playwright** | Smoke tests for nav anchors + form. |

**Avoid for v1:** Heavy animation libraries site-wide; large UI kits if you only need a brochure—keep JS small.

---

## Backend integration (lightweight)

- **Contact POST:** `app/api/contact/route.ts` validates with Zod, then forwards to **Spring REST** (`POST /api/leads`) or **Resend** / **SendGrid** / **Formspree** for MVP.
- **SEO:** Set `metadataBase` to production URL; use absolute URLs in OG images.

---

## Summary

| Item | Choice |
|------|--------|
| **Framework** | Next.js (App Router) + TypeScript |
| **Styling** | Tailwind CSS + CSS variables from brand doc |
| **Forms** | React Hook Form + Zod |
| **Images / SEO** | `next/image`, `metadata`, `sitemap.ts`, `robots.ts` |
| **Structure** | `app/` routes + `components/sections/*` + `components/ui/*` |

See also: `UI_UX_BRAND.md`, `BROCHURE_REDESIGN.md`, `CONTEXT.md`.
