# Brochure Website Redesign — Khu Mo

Modern, **web-first** brochure site with **responsive mobile** behavior. Structure and pacing are inspired by luxury brochure sites such as [SWD Bespoke](https://www.swdbespoke.com/): immersive hero, clear category-style navigation, featured highlights, editorial rhythm, and repeated **enquire / get in touch** paths—adapted to a premium liquor brand (see `UI_UX_BRAND.md`).

---

## Sitemap

| Route / location | Purpose |
|------------------|---------|
| **`/` (Home)** | Single scroll experience: Story → Product → Process → Gallery → Contact (anchor IDs: `#story`, `#product`, `#process`, `#gallery`, `#contact`). |
| **`/legal/privacy`** (optional) | Privacy policy — linked from footer only. |
| **`/legal/terms`** (optional) | Terms — footer only. |

**Navigation model (recommended):**  
- Primary: sticky **top bar** with logo + text links to section anchors (smooth scroll on same page).  
- Mobile: **hamburger** → same links + primary CTA **Enquire** (scroll to `#contact` or open contact panel).  
- Footer: brand line, social (if any), legal links, **Contact** repeat.

No separate “Products” URL required for v1; products live in the **Product** section on Home. Add `/products/{slug}` later if CMS or deep links are needed.

---

## Section-by-section breakdown

### 1. Global chrome (header + footer)

**Inspired by SWD:** persistent wayfinding, premium restraint, strong CTAs without clutter.

| Element | Web | Mobile |
|---------|-----|--------|
| Header | Logo left; nav: Story, Product, Process, Gallery, Contact; **Enquire** button (accent) | Logo + menu toggle; Enquire visible in drawer or as icon/text |
| Footer | Short heritage line (e.g. est. year / origin), link to contact, optional journal/newsletter block later, legal | Stacked columns, thumb-friendly tap targets |

**Brand alignment:** dark surfaces, copper/gold accent on CTA, minimal copy.

---

### 2. Hero (above Story)

**Inspired by SWD:** full-bleed headline + one primary action + optional secondary (e.g. “View range” scroll to `#product`).

- **Headline:** one dominant line (brand voice: strong, mysterious).  
- **Subline:** one sentence — craft + audience (young professionals).  
- **Primary CTA:** Enquire / Get in touch → `#contact`.  
- **Secondary CTA:** Explore products → `#product`.  
- **Media:** full-width image or video loop (low light, industrial texture); lazy-load; `prefers-reduced-motion` fallback to static image.

---

### 3. Story (`#story`)

**Purpose:** Brand myth — mining / underground / raw / industrial; emotional hook before product.

- **Layout:** Split block (text + large image) on desktop; stacked on mobile.  
- **Content blocks:** Short paragraph + 2–3 bullets (origin, attitude, who it’s for).  
- **Optional:** pull quote or single stat (e.g. years, region) like SWD’s “heritage” cues.  
- **Transition:** subtle divider or full-bleed band into Product.

---

### 4. Product (`#product`)

**Inspired by SWD:** “featured products” tiles with labels and clear next step—not a full shop, brochure + enquiry.

- **Intro strip:** one line + optional category chips (White wine, Tropical fruit, Gift, Events).  
- **Grid:** 3–6 featured items (image, name, one-line descriptor, **Enquire** or **Learn more** → scroll to contact with product hint via query/hash e.g. `#contact?topic=product-name` or pre-filled hidden field).  
- **Behavior:** horizontal scroll carousel on mobile for density without endless vertical scroll; grid on tablet/desktop.  
- **Accessibility:** focus order, keyboard carousel controls if used.

---

### 5. Process (`#process`)

**Inspired by SWD:** “expertly crafted” / craftsmanship narrative—here: distillation as industrial discipline.

- **Format:** 3–5 numbered or titled steps (Raw source → Ferment → Distill → Rest → Bottle).  
- **Visual:** iconography or monochrome process photography; timeline on desktop, vertical stack on mobile.  
- **CTA (soft):** “Ask how we work with events” → `#contact`.

---

### 6. Gallery (`#gallery`)

**Inspired by SWD:** portfolio / atmosphere—mood, venues, bottle details, lifestyle (young professionals in refined industrial settings).

- **Layout:** masonry or uniform grid; lightbox optional for v2.  
- **Mobile:** 2-column grid or swipe gallery; avoid tiny thumbnails.  
- **Performance:** responsive images (`srcset`), WebP where possible.

---

### 7. Contact (`#contact`)

**Inspired by SWD:** clear “get in touch” / enquire pattern—simple, trustworthy, low friction.

- **Form fields (brochure MVP):** Name, Email, Phone (optional), Interest (select: General, Product, Events, Trade), Message.  
- **Submit:** success state inline (no full page reload if using SPA-style Vaadin).  
- **Backend tie-in:** map to existing or future `Contact` + `Status` (e.g. `Lead — Website`).  
- **Alternate:** mailto / phone line as secondary row for users who dislike forms.  
- **Trust:** short privacy note + link to `/legal/privacy` if present.

---

## UX flow

### Primary paths

1. **Browse → enquire (happy path)**  
   Land on `/` → read Hero → skim Story → scan Product grid → **Enquire** → complete Contact → confirmation message → optional “Join list” later (newsletter, like SWD’s “Stay updated”).

2. **Intent-driven (product-first)**  
   Land on `/` → scroll/jump to `#product` (or from Hero secondary CTA) → tap **Enquire** on a card → Contact with context (product/interest pre-selected).

3. **Trust / craft (research)**  
   Hero → **Process** → **Gallery** → **Contact** when convinced.

4. **Mobile quick exit**  
   Open menu → **Enquire** → `#contact` → submit.

### Responsive behavior

- **Breakpoints:** Design for ~375px, 768px, 1024px, 1440px (align with `UI_UX_BRAND.md` / accessibility checklist).  
- **Touch:** min 44×44px targets; sticky header does not obscure section titles when jumping to anchors (scroll-padding-top).  
- **Motion:** respect `prefers-reduced-motion` for parallax and auto-playing media.

### Implementation note (current codebase)

- Replace CRM-first `MainLayout` + single `ContactView` with a **brochure `HomeView`** at `@Route("")` using one scrollable layout and section components; keep a **staff/admin** route separate if CRM remains (e.g. `/admin/contacts`).  
- Theme: extend `themes/my-app` for dark tokens, typography, and spacing consistent with `UI_UX_BRAND.md`.

---

## Reference

- Luxury brochure patterns: [SWD Bespoke](https://www.swdbespoke.com/)  
- Brand tokens and tone: `UI_UX_BRAND.md`  
- Domain context: `CONTEXT.md`
