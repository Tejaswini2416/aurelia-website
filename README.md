# AURELIA Fine Jewelry

A luxury jewelry storefront built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Swiper, Prisma, PostgreSQL, and Redis.

## Run locally

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

Replace the placeholder PostgreSQL connection in `.env` before using Prisma-backed consultation booking. The storefront otherwise works without external services using a small illustrative catalog; Redis is required by the inventory reservation service. Configure real metal market rates before relying on the pricing API.

```bash
npm run db:generate
npm run db:validate
npm run db:migrate
```

## Storefront

- Home, collection, and product pages with responsive navigation and search suggestions.
- Filters for metal, gemstone, and price; sorting and grid density controls.
- Product customization for metal, ring size, and engraving, including a certificate preview and pricing breakdown.
- Persistent browser cart and wishlist, currency display (illustrative USD/EUR/GBP conversion), and a multi-step checkout UI.
- Three-step ring builder and consultation request form.

## API routes

- `GET /api/v1/products` supports `q`, `category`, `metal`, `stone`, `minPrice`, `maxPrice`, `cut`, and `sort`.
- `GET /api/v1/products/:slug` returns the product and available metal options.
- `POST /api/v1/pricing/calculate` validates a metal/weight/stone/making-charge quote and returns a transparent price breakdown.
- `POST /api/v1/appointments` validates and persists a consultation request using Prisma.

Catalog responses are currently backed by `src/lib/catalog.ts`. Replace that repository with PostgreSQL-backed catalog queries and populate the included Prisma models before launch. `src/lib/inventory-lock.ts` provides token-checked Redis reservations with a 15-minute expiry; call it from an authenticated checkout flow after adding customer-session authorization.

## Production integration boundary

The checkout and payment choices are a frontend demonstration; no payment is processed and no order is created. Before accepting real orders, integrate a PCI-compliant provider (for example Stripe/PayPal/Klarna), server-side order creation, authenticated customer sessions and refresh-token rotation, authorization, stock checks, rate limiting, validated market-rate feeds, transactional email, shipping-label/insurance providers, and production image/certificate storage. Never collect or store raw card numbers in this application.

## Validation

```bash
npm run typecheck
npm run lint
npm run db:validate
npm run build
```
