# A1 Luxury Furniture Atelier

> **Masterpieces in Living Form** — High-end luxury architectural furniture atelier e-commerce platform built with Next.js 14, Tailwind CSS, Prisma ORM, and SQLite.

---

## ✨ Features

- **Cinematic Visual Experience**: Atmospheric full-bleed imagery, rich typography (Playfair Display & Plus Jakarta Sans), and smooth scroll animations.
- **Continuous Infinite Category Loop**: Real-time continuous marquee showcasing living sanctuaries, dining suites, and bespoke commissions.
- **Curated Collections & Filter Archive**: High-precision filtering by room category, material, and price with instant search.
- **Multi-User Patron Authentication**: Dedicated user accounts with direct Name/Email login, Mobile SMS OTP verification, and guest browsing.
- **Executive Admin Control Room (`/admin`)**:
  - Secure Admin ID & Password authentication gate.
  - Real-time commercial orders, status transitions, and consignment tracking.
  - Variant stock management & low-inventory alerts.
  - Privilege coupon creation and review moderation.
  - Client on-site installation recording with image curation and pinned featured projects.
- **White-Glove Home Visit Concierge**: Spatial alignment consultations and bespoke in-home curation booking.
- **Type-Safe Full-Stack**: 100% strict TypeScript coverage with Prisma ORM database models.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup & Seeding
```bash
npx prisma db push
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🔐 Atelier Admin Access (`/admin`)

- **Admin ID**: `admin@a1furniture.com` (or `admin`)
- **Admin Password**: `admin123`
