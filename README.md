# AURELIA Fine Jewelry

<div align="center">

**Haute Joaillerie & Bespoke Fine Jewelry E-Commerce Platform**

*Crafted with Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS, Framer Motion, Prisma ORM, PostgreSQL, and Redis.*

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.10.1-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-6933FF?style=flat-square)](https://turbo.build/pack)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [Storefront & Shopping Experience](#storefront--shopping-experience)
  - [Interactive Bespoke Ring Builder](#interactive-bespoke-ring-builder)
  - [Real-Time Metal Pricing Engine](#real-time-metal-pricing-engine)
  - [Private Consultation Booking](#private-consultation-booking)
  - [Cart, Wishlist & Currency Switcher](#cart-wishlist--currency-switcher)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
  - [Database Setup with Prisma](#database-setup-with-prisma)
- [API Reference](#api-reference)
  - [Products API](#products-api)
  - [Live Pricing Calculation](#live-pricing-calculation)
  - [Consultation Appointments](#consultation-appointments)
- [Data Models & Schema](#data-models--schema)
- [High-Value Inventory Lock](#high-value-inventory-lock)
- [Production Integration Boundary](#production-integration-boundary)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## Overview

**AURELIA** is a luxury e-commerce web application engineered for high-end jewelry ateliers and maisons. Designed with a timeless editorial aesthetic and built on high-performance modern web architecture, Aurelia pairs smooth client-side interactions with enterprise-grade data models.

The storefront delivers an elevated customer journey: from exploring fine emeralds, solitaire diamonds, and Akoya pearls, to configuring bespoke engagement rings with live gemstone certificate previews, transparent metal weight quotes, custom engravings, and booking 1-on-1 private video consultations with master jewelers.

---

## Key Features

### Storefront & Shopping Experience
- **Editorial Homepage:** Immersive hero presentation, curated collection highlights, bestsellers rail, artisan craftsmanship showcase, customer testimonials, and newsletter subscription.
- **Dynamic Category & Collection Pages (`/collections/[category]`):** Multi-facet filtering by metal purity (14K, 18K, 22K), gemstone type (diamonds, emeralds, pearls), and price range, with sorting and grid density controls.
- **Product Detail Experience (`/products/[slug]`):** Multi-angle high-resolution imagery, metal selector, ring sizing guide, custom engraving preview with font options, certificate previews (GIA/IGI specifications), and transparent pricing breakdowns.
- **Brand Story & Journal:** Dedicated editorial spaces (`/our-story`, `/journal/[slug]`) to showcase heritage, ethical sourcing, and atelier craftsmanship.

### Interactive Bespoke Ring Builder (`/builder`)
- **Step 1 — Setting & Metal:** Choose from classic solitaire, halo, pave, or bezel settings in 18K Yellow Gold, White Gold, Rose Gold, or Platinum.
- **Step 2 — Diamond Cut & Carat:** Select stone cut (Round, Oval, Emerald, Princess, Cushion, Pear) and customize carat weight with live visual feedback.
- **Step 3 — Review & Engraving:** Finalize the piece with personalized laser engraving, custom ring sizing, and instant cart dispatch.

### Real-Time Metal Pricing Engine
- Transparent breakdown calculating:
  $$\text{Total Price} = (\text{Metal Weight (g)} \times \text{Market Rate}) + \text{Gemstone Value} + \text{Making Charges} + \text{Taxes}$$
- Supports live market rates or environment-configured overrides for 14K/18K/22K yellow gold, white gold, rose gold, and platinum with illustrative fallbacks.

### Private Consultation Booking (`/appointments`)
- Interactive concierge scheduling for 30-minute private video consultations with jewelry stylists.
- Validates appointments with Zod (topic, name, email, time slot validation) and persists bookings directly to PostgreSQL via Prisma Client.

### Cart, Wishlist & Currency Switcher
- **Slide-Over Drawer Cart:** Real-time quantity adjustments, custom engraving details, complementary signature gift boxing, and insured delivery options.
- **Multi-Currency Support:** Instant switching between **USD ($)**, **EUR (€)**, and **GBP (£)** with persistent preference memory.
- **Wishlist Portal (`/wishlist`):** Bookmark favorite pieces across sessions with instant add-to-cart functionality.
- **Multi-Step Checkout UI (`/checkout`):** Seamless checkout flow covering shipping address verification, delivery methods, and mock payment gateway confirmation.

---

## Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 16 (Turbopack)](https://nextjs.org/) | App Router, Server Components, API routes, Turbopack bundling |
| **UI & Runtime** | [React 19](https://react.dev/) | Component architecture, Transitions, Hooks |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Bespoke design system, editorial serif typography, responsive layouts |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth page transitions, drawer animations, interactive hover states |
| **Carousels** | [Swiper 14](https://swiperjs.com/) | Curated product rails and gallery swiping |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, minimalist iconography |
| **ORM & Database** | [Prisma 7](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) | Type-safe queries, migration system, relational data modeling |
| **Driver Adapter** | `@prisma/adapter-pg` + `pg` | High-efficiency PostgreSQL connection pooling |
| **Cache & Lock** | [Redis (ioredis)](https://redis.io/) | High-value inventory token lock mechanism |
| **Validation** | [Zod](https://zod.dev/) | Runtime request body and schema validation |

---

## Directory Structure

```text
jewellery-website/
├── prisma/
│   ├── schema.prisma          # Relational PostgreSQL models (Products, Variants, Orders, Appointments)
│   └── migrations/            # Version-controlled database migrations
├── public/                    # Static assets, logos, and illustrative imagery
├── src/
│   ├── app/                   # Next.js App Router pages and API routes
│   │   ├── [slug]/            # Dynamic landing routes
│   │   ├── account/           # Customer account portal
│   │   ├── api/v1/            # REST API endpoints
│   │   │   ├── appointments/  # Consultation booking endpoint
│   │   │   ├── pricing/       # Dynamic market-rate pricing engine
│   │   │   └── products/      # Catalog search, filter, and detail endpoints
│   │   ├── appointments/      # Consultation booking page
│   │   ├── builder/           # Bespoke 3-step ring customizer
│   │   ├── checkout/          # Multi-step checkout experience
│   │   ├── collections/       # Collection and category browsing pages
│   │   ├── journal/           # Editorial articles and guides
│   │   ├── our-story/         # Atelier heritage and craftsmanship page
│   │   ├── products/          # Product display pages
│   │   ├── wishlist/          # Customer saved items portal
│   │   ├── globals.css        # Luxury design tokens, typography, and styling
│   │   ├── layout.tsx         # Root layout with site shell and navigation
│   │   └── page.tsx           # Storefront homepage
│   ├── components/            # Reusable UI components
│   │   ├── checkout-form.tsx  # Multi-step shipping and checkout form
│   │   ├── collection-view.tsx# Category grid with filters and sorting
│   │   ├── product-card.tsx   # Product card with hover alternate image and quick actions
│   │   ├── product-detail.tsx # Interactive product view, customizer, and pricing
│   │   ├── product-rail.tsx   # Horizontal scrollable product showcase
│   │   ├── ring-builder.tsx   # Interactive ring builder wizard
│   │   ├── site-header.tsx    # Responsive header with search, wishlist, and cart trigger
│   │   ├── site-footer.tsx    # Atelier footer with newsletter and customer care links
│   │   ├── site-shell.tsx     # Application shell wrapper
│   │   └── store-provider.tsx # Global state: Cart, Wishlist, Currency, Drawer modals
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility libraries and backend helpers
│       ├── catalog.ts         # In-memory illustrative catalog and formatting helpers
│       ├── inventory-lock.ts  # Redis-backed 15-minute checkout reservation lock
│       └── prisma.ts          # Singleton Prisma client instance
├── .env.example               # Example environment variables
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and build scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or later (LTS recommended)
- **npm**: `v10.x` or later
- **PostgreSQL**: (Optional for local browsing; required for database-backed appointments and full persistence)
- **Redis**: (Optional; required for concurrent checkout inventory lock)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "jewellery website"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```powershell
   # Windows PowerShell
   Copy-Item .env.example .env

   # macOS / Linux Bash
   cp .env.example .env
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the storefront.

---

## Environment Variables

Edit your `.env` file to match your infrastructure:

```ini
# PostgreSQL connection for Prisma models & consultation bookings
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/aurelia?schema=public"

# Redis connection for high-value inventory reservations (15-min TTL)
REDIS_URL="redis://localhost:6379"

# Metal market rates per gram in USD (Optional; fallback rates applied if empty)
METAL_RATE_YELLOW_GOLD_14K="48"
METAL_RATE_YELLOW_GOLD_18K="62"
METAL_RATE_YELLOW_GOLD_22K="76"
METAL_RATE_WHITE_GOLD_14K="51"
METAL_RATE_WHITE_GOLD_18K="66"
METAL_RATE_ROSE_GOLD_14K="49"
METAL_RATE_PLATINUM="44"
```

> [!NOTE]
> The storefront is pre-configured with a fallback illustrative catalog (`src/lib/catalog.ts`). You can browse products, test the ring builder, and simulate checkout immediately without configuring an active database.

---

## Database Setup with Prisma

When ready to connect PostgreSQL for persisted customer appointments, orders, and products:

1. **Generate the Prisma client:**
   ```bash
   npm run db:generate
   ```

2. **Validate schema integrity:**
   ```bash
   npm run db:validate
   ```

3. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

---

## API Reference

### Products API

#### `GET /api/v1/products`
Retrieves products with multi-parameter filtering, searching, and sorting.

- **Query Parameters:**
  - `q` *(string)*: Search term matching title or description.
  - `category` *(string)*: Filter by category (e.g., `Engagement rings`, `Necklaces`, `Earrings`, `Bracelets`).
  - `metal` *(string)*: Filter by metal (e.g., `18K Yellow Gold`, `18K White Gold`, `Platinum`).
  - `stone` *(string)*: Filter by gemstone type.
  - `cut` *(string)*: Filter by diamond cut (e.g., `Round`, `Emerald`, `Oval`).
  - `minPrice` / `maxPrice` *(number)*: Price boundary filtering.
  - `sort` *(string)*: Sort by `price-asc`, `price-desc`, `newest`, or `featured`.

#### `GET /api/v1/products/:slug`
Fetches detailed product information, available variants, gemstone certification data, and purity options.

---

### Live Pricing Calculation

#### `POST /api/v1/pricing/calculate`
Calculates a real-time price quote based on metal weight, market spot rate, stone value, making charges, and tax rate.

- **Request Body:**
  ```json
  {
    "metal": "yellow-gold-18k",
    "metalWeightGrams": 4.5,
    "gemstoneValue": 1200,
    "makingCharges": 350,
    "taxRate": 0.08
  }
  ```

- **Response (`200 OK`):**
  ```json
  {
    "currency": "USD",
    "marketRatePerGram": 62,
    "breakdown": {
      "metalCost": 279.00,
      "gemstoneValue": 1200.00,
      "makingCharges": 350.00,
      "tax": 146.32,
      "total": 1975.32
    },
    "rateSource": "configured market rate"
  }
  ```

---

### Consultation Appointments

#### `POST /api/v1/appointments`
Schedules a 30-minute private video consultation with an atelier stylist.

- **Request Body:**
  ```json
  {
    "name": "Evelyn Vance",
    "email": "evelyn@example.com",
    "topic": "Engagement ring",
    "scheduledAt": "2026-11-15T14:30:00.000Z"
  }
  ```

- **Validation Rules:**
  - Name: 2–120 characters.
  - Email: Valid email format.
  - Topic: One of `Engagement ring`, `Fine jewelry`, `Custom design`, or `Care & repair`.
  - Scheduled At: Must be at least 1 hour into the future.

---

## Data Models & Schema

The PostgreSQL schema (`prisma/schema.prisma`) includes models engineered specifically for fine jewelry retail:

- **`Product` & `Category`**: Catalog hierarchy with slug routing and customization flags.
- **`ProductVariant`**: Granular metal type (`YELLOW_GOLD`, `WHITE_GOLD`, `ROSE_GOLD`, `PLATINUM`), purity (`K14`, `K18`, `K22`, `PURE`), exact metal weight in grams, making charges, and inventory stock.
- **`Gemstone`**: Cut (`ROUND`, `OVAL`, `PRINCESS`, `EMERALD`, `CUSHION`), carat weight, color, clarity (`VS1`, `VVS2`, etc.), and certificate numbers/URLs.
- **`Customer` & `Order`**: Order lifecycle management (`PENDING`, `CONFIRMED`, `IN_PRODUCTION`, `SHIPPED`, `DELIVERED`), gift notes, and tax/shipping amounts.
- **`CustomEngraving`**: Inscription text, font styles, and generated preview images.
- **`InsuredShipmentTracking`**: High-value carrier tracking and insurance declarations.
- **`Appointment`**: Virtual concierge consultation bookings with time slot tracking.

---

## High-Value Inventory Lock

Fine jewelry e-commerce requires preventing double-purchases of one-of-a-kind gemstones and bespoke pieces while a customer completes checkout.

`src/lib/inventory-lock.ts` provides token-guarded Redis reservations:
- **Reservation Window:** 15 minutes (`EX 900`).
- **Token Verification:** Atomic releases using a custom Lua script ensure that a customer's lock cannot be inadvertently released by another process.
- **Fail-Safe:** Automatically falls back gracefully if Redis is temporarily unreachable.

---

## Production Integration Boundary

Before accepting live customer transactions:
1. **PCI-Compliant Payments:** Integrate Stripe Elements, Apple Pay, or Klarna. Never collect or store raw cardholder credentials.
2. **Authentication & Session Security:** Introduce authenticated customer sessions with HTTP-only cookies and refresh token rotation.
3. **Live Market Rate Feeds:** Connect the pricing engine to an authorized real-time precious metals API (e.g., London Bullion Market Association feeds).
4. **Order Management & Fulfillment:** Wire webhook events for payment capture, automated invoicing, insured shipping label generation, and transactional email confirmation.
5. **Asset Storage:** Store high-resolution photography and digital gemstone certificates on a CDN (e.g., AWS S3 / Cloudflare R2).

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack on `http://localhost:3000` |
| `npm run build` | Compiles the production build |
| `npm run start` | Runs the compiled production server |
| `npm run typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint to verify code quality standards |
| `npm run db:generate` | Generates the Prisma Client from `prisma/schema.prisma` |
| `npm run db:validate` | Validates the Prisma schema configuration |
| `npm run db:migrate` | Runs database migrations in development mode |

---

## License

This project is private and proprietary. All rights reserved.


