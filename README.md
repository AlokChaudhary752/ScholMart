# ScholMart — Institutional School Uniform ERP & B2B Manufacturing SaaS

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-orange?logo=three.js)](https://threejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-darkblue?logo=prisma)](https://www.prisma.io/)

A complete, production-grade B2B SaaS platform for school uniform manufacturers and suppliers to manage bulk institutional procurement, digital student sizing, computerized embroidery, multi-stage production tracking, and GST billing.

---

## 🏛️ System Architecture & Folder Structure

```
ScholMart/
├── prisma/
│   ├── schema.prisma           # Normalized PostgreSQL schema (multi-tenant, orders, sizing, GST)
│   └── seed.ts                 # Database seed script with schools & uniform items
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Sora & Inter Google fonts + theme providers
│   │   ├── page.tsx            # 3D landing page with hero, configurator, and timeline
│   │   ├── providers.tsx       # ThemeProvider (next-themes) + TanStack Query provider
│   │   ├── auth/
│   │   │   ├── login/          # Split-screen 3D login with 1-click demo switcher
│   │   │   ├── signup/         # Multi-role signup with password strength meter & OTP modal
│   │   │   └── forgot-password/# Tokenized password recovery workflow
│   │   └── dashboard/
│   │       ├── layout.tsx      # Dashboard shell with collapsible sidebar & topbar
│   │       ├── page.tsx        # Overview KPI cards, Recharts, and AI supply insights
│   │       ├── schools/        # Contracted schools management with ledger drawer
│   │       ├── catalog/        # Uniform catalog, fabric specs, and volume price slabs
│   │       ├── orders/         # Orders pipeline with 8-stage Kanban board & CSV uploader
│   │       ├── measurements/   # Student anthropometric records & predictive sizing curves
│   │       ├── inventory/      # Raw materials multi-warehouse tracking & mill PO generator
│   │       ├── production/     # 6-stage production tracking & 4-eye QC checklist audit
│   │       ├── billing/        # GST-compliant tax invoices & printable PDF preview
│   │       ├── payments/       # Ledger, aging analysis, & Razorpay payment links
│   │       ├── logistics/      # Fleet vehicle tracking & Proof of Delivery (POD) sign-off
│   │       ├── reports/        # School profitability, GSTR-1 summary, & tailor productivity
│   │       ├── crm/            # Prospective school lead acquisition pipeline
│   │       └── settings/       # Company profile, GSTIN, and banking coordinates
│   ├── components/
│   │   ├── 3d/                 # Three.js & React Three Fiber canvas & procedural models
│   │   ├── dashboard/          # Collapsible sidebar, topbar with search & notifications
│   │   ├── landing/            # Preloader, hero, marquee, customizer, timeline, testimonials, FAQ
│   │   └── ui/                 # Reusable buttons, cards, inputs, badges, modals, tabs
│   ├── lib/
│   │   ├── auth.ts             # Zustand auth store with role-based access & demo users
│   │   ├── mockData.ts         # Enterprise datasets for institutions, catalog, & orders
│   │   ├── prisma.ts           # Prisma client singleton
│   │   └── utils.ts            # Formatting helpers (INR currency, dates, class merging)
│   └── styles/
│       └── globals.css         # Design tokens, CSS variables, and glassmorphic utilities
├── .env.example                # Production environment template
├── tailwind.config.ts          # Custom brand tokens (Deep Navy, Warm Amber/Orange)
└── next.config.mjs             # Next.js bundler config with 3D package transpilation
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js `v18.17+` or `v20+` / `v22+`
- npm `v9+` or `v10+`

### 2. Installation
```bash
git clone https://github.com/AlokChaudhary752/ScholMart.git
cd ScholMart
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
```

### 4. Database Schema & Prisma Client
```bash
npx prisma generate
```

### 5. Run the Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🚀 Deployment Instructions

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Import project in the [Vercel Dashboard](https://vercel.com/new).
3. Set Environment Variables from `.env.example` (`DATABASE_URL`, `NEXTAUTH_SECRET`).
4. Click **Deploy**.

4. Click **Deploy**.

### Option B: Docker Compose (Full Stack + PostgreSQL)
```bash
docker-compose up -d --build
```
This boots up:
- Next.js 14 App container on `http://localhost:3000` (optimized standalone Alpine container)
- PostgreSQL 16 container on `localhost:5432` with persistent volumes and automated health checks

### 🧪 Automated Testing Suite
Run the test suite verifying Indian currency notation, 5% GST calculations, anthropometric sizing curves, and Zod API contracts:
```bash
npm test
```

### 📡 REST API & OpenAPI Specification
ScholMart exposes production-ready REST endpoints:
- `GET /api/schools` & `POST /api/schools`
- `GET /api/orders` & `POST /api/orders`
- `GET /api/catalog` & `POST /api/catalog`
- `GET /api/invoices` & `POST /api/invoices`

The full OpenAPI 3.0 specification is available at `public/openapi.json` and can be imported into Postman or Swagger UI.

---

## 👤 Admin User Guide & 1-Click Demo Profiles

When accessing the **[Login Page](http://localhost:3000/auth/login)**, you can click on any of the instant demo profiles to explore different role perspectives:

| Role | Demo Credentials | Capabilities |
|---|---|---|
| **Supplier Admin** | `admin@scholmart.com` | Full platform control: manage schools, catalog pricing, generate mill POs, oversee production lines, and issue GST tax invoices. |
| **School Representative** | `principal@dps.edu.in` | View institutional catalog, track active campus orders, review student sizing records, and download ledger statements. |
| **Production Head** | `production@scholmart.com` | Monitor CAD laser cutting, line stitching, Madeira crest embroidery, and sign off on 4-eye QC audits. |
| **Accountant** | `accounts@scholmart.com` | Generate GSTR-1 summaries, reconcile bank NEFT remittances, track 30-60-90 day aging, and issue Razorpay payment links. |

---

## 📄 License
MIT &copy; ScholMart Technologies Private Limited
