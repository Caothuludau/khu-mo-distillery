# CONTEXT

## System purpose
Khu Mo Distillery needs a digital platform to present and manage its offerings (white wines, tropical fruit wines, gift cards, and event-focused products) while maintaining customer relationship data. The current codebase is an early Vaadin/Spring scaffold that mainly implements a CRM-style contact list. For a remake, the system should be defined as a distillery commerce + relationship management platform: product storytelling and discovery on the customer side, with structured customer/contact management on the business side.

## Domain model
- **Business domain anchor:** `Distillery` is the owning business context for all products, customer relationships, and sales interactions.
- **Current implemented core entity:** `Contact` (fields implied by UI/repository: first name, last name, email).
- **Current supporting reference entities:** `Company`, `Status`.
- **Current relationships:** `Contact -> Company` (many contacts may belong to one company), `Contact -> Status` (many contacts may share one status).
- **Intended commercial concept from project brief:** `Product` as a sellable/advertised item (wine, gift card, event wine package).
- **Intended classification concept:** `ProductCategory` (white wine, tropical fruit wine, gift card, special event).
- **Intended customer-side concept:** `Order`/`PurchaseIntent` linked to one customer/contact and one or more products.
- **Intended event concept:** `EventOffering` for special-event wine bundles/services, related to products and customer requests.
- **Reference data concept:** `Status` should evolve into explicit lifecycle states (lead/customer/order/event-request statuses).

## Key data flows
- **Current flow (implemented):** user opens contact page -> UI `ContactView` requests records from `ContactService` -> service reads/writes through `ContactRepository` -> JPA persistence.
- **Current query flow (implemented):** contact search filters by first/last name via repository query.
- **Current write flow (implemented):** create/update/delete contact through service delegation to repository.
- **Remake flow (catalog):** business defines products and categories -> catalog is published to customer-facing pages -> visitors browse/filter offerings.
- **Remake flow (conversion):** visitor submits inquiry or purchase intent -> system creates/updates contact -> links request to products/categories -> assigns lifecycle status.
- **Remake flow (operations):** staff reviews leads/orders/event requests -> updates status and notes -> tracks outcomes for repeat sales and relationship management.

## Related design reference
- UI/UX brand and visual direction for the remake is documented in `UI_UX_BRAND.md`.
- Brochure site structure (sitemap, sections, UX flow): `BROCHURE_REDESIGN.md`.
- Frontend stack recommendation (framework, folders, libraries): `FRONTEND_ARCHITECTURE.md`.
