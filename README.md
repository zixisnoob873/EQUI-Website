# EQUI Gaming Platform 🎮

A premium, Cyberpunk 2077-themed gaming lounge website and content management platform built for **EQUI** (Gulberg 3 & Airline Society, Lahore).

Features a 3D animated WebGL background, instant branch-switching across all 7 content pages, detailed hardware spec tables, PlayStation 5 arena game library, interactive Google Maps location finder, and a full-stack Admin Dashboard to edit all content live.

---

## 🌟 Key Features

- **Cyberpunk 2077 Visual Aesthetic**: High-contrast dark void palette (`#0a0a0a`), warning yellow (`#f5a623`) & sharp gold (`#ffd700`) accents, neon glows, HUD bracket borders, and CRT scanlines.
- **3D Animated Hero**: Three.js / React Three Fiber interactive wireframe icosahedron with floating particles and grid plane.
- **Branch-Switching System**: Instant tab toggle between **Gulberg 3** and **Airline Society** with URL query parameter synchronization (`?branch=gulberg-3`).
- **7 Public Content Pages**:
  - **Home (`/`)**: 3D hero, features grid, live stats, and branch CTAs.
  - **Pricing (`/pricing`)**: 3 PC gaming tiers + PS5 console rates (hourly & daily pass).
  - **PCs (`/pcs`)**: Specs breakdown tables (CPU, GPU, RAM, Monitor) and peripherals lists.
  - **Consoles (`/consoles`)**: PS5 arena setup description & 15+ game library grid.
  - **Contact (`/contact`)**: Branch phone numbers, landlines, direct WhatsApp chat, email, address, and operating hours.
  - **Location (`/location`)**: Interactive Google Maps embed with GPS coordinates & directions CTA.
  - **Branches (`/branches`)**: Side-by-side branch comparison.
  - **Gallery (`/gallery`)**: Filterable photoshoot gallery (Setups, Events, Ambiance, Gaming) with an interactive Lightbox viewer.
- **Full Admin Dashboard (`/admin`)**:
  - Token-authenticated control center powered by **Laravel Sanctum**.
  - Management pages to edit branch details, maps embeds, rates, hardware specs, operating hours, and photoshoot photos per branch.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 (with `@theme` inline design tokens)
- **3D / WebGL**: Three.js & React Three Fiber (R3F)
- **Animations**: Framer Motion & GSAP
- **Typography**: Google Fonts (Orbitron & JetBrains Mono)

### Backend API
- **Framework**: Laravel 11 / 12 (API Mode)
- **Language**: PHP 8.3.33
- **Database**: SQLite (`backend/database/database.sqlite`)
- **Auth**: Laravel Sanctum 4.3 (Bearer Tokens)
- **CORS**: Laravel CORS middleware configured for `http://localhost:3000`

---

## 🚀 Getting Started

### Prerequisites

All software is already installed locally on your system:
- **Node.js**: `v20+` (`v24.19.0` installed at `C:\Program Files\nodejs`)
- **PHP**: `v8.2+` (`v8.3.33` installed at `C:\php`)
- **Composer**: `v2.10+` (`v2.10.2` installed at `C:\php`)

---

### Running the Application Locally

Run **two terminal windows** side-by-side:

#### Terminal 1 — Start Laravel API Server (Port 8000)
```powershell
cd backend
$env:Path = "C:\php;" + [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
php artisan serve --port=8000
```
> **Output:** `INFO Server running on [http://127.0.0.1:8000]`

#### Terminal 2 — Start Next.js Frontend Server (Port 3000)
```powershell
npm run dev
```
> **Output:** `▲ Next.js 16 - Ready in localhost:3000`

---

## 🌐 URLs & Admin Credentials

| Interface | URL | Credentials / Notes |
|---|---|---|
| **Public Website** | [http://localhost:3000](http://localhost:3000) | Full Cyberpunk 3D website |
| **Admin Login** | [http://localhost:3000/admin/login](http://localhost:3000/admin/login) | **Email:** `admin@equigaming.pk`<br/>**Password:** `admin123` |
| **Admin Control Panel** | [http://localhost:3000/admin](http://localhost:3000/admin) | Live content editor |
| **Backend REST API** | [http://127.0.0.1:8000/api/branches](http://127.0.0.1:8000/api/branches) | Live JSON endpoints |

---

## 📁 Project Directory Structure

```
EQUI-Website/
├── src/
│   ├── app/
│   │   ├── globals.css           ← Cyberpunk design system & custom keyframes
│   │   ├── layout.tsx            ← Root layout with fonts & metadata
│   │   ├── page.tsx              ← Landing page with 3D hero background
│   │   ├── loading.tsx           ← Loading fallback
│   │   ├── pricing/page.tsx      ← Branch-switched pricing page
│   │   ├── pcs/page.tsx          ← 3-Tier PC specs breakdown
│   │   ├── consoles/page.tsx     ← PS5 setup & games list
│   │   ├── contact/page.tsx      ← Branch phone, WhatsApp & hours
│   │   ├── location/page.tsx     ← Google Maps embed & directions
│   │   ├── branches/page.tsx     ← Gulberg 3 vs Airline Society overview
│   │   ├── gallery/page.tsx      ← Filterable gallery with Lightbox modal
│   │   └── admin/                ← Admin dashboard pages (branches, pricing, pcs, consoles, contact, gallery)
│   ├── components/
│   │   ├── 3d/CyberBackground.tsx← R3F 3D wireframe & particle background
│   │   ├── layout/               ← Navbar & Footer components
│   │   └── ui/                   ← BranchSwitcher, HUDCard, SectionTitle, StartButton, Lightbox
│   ├── lib/
│   │   ├── api.ts                ← API client connecting Next.js to Laravel API (with camelCase transformer)
│   │   ├── auth.ts               ← Admin authentication & bearer token helper
│   │   └── mockData.ts           ← Offline fallback dataset
│   └── types/                    ← TypeScript interfaces for all domain models
├── backend/                      ← Laravel API Backend
│   ├── app/
│   │   ├── Http/Controllers/     ← PublicApiController, AdminApiController, AuthController
│   │   └── Models/               ← Branch, PricingTier, PcTier, Console, Contact, GalleryImage, User
│   ├── config/cors.php           ← CORS configuration for localhost:3000
│   ├── database/
│   │   ├── database.sqlite       ← Local SQLite database
│   │   ├── migrations/           ← Table definitions
│   │   └── seeders/              ← Seed data for Gulberg 3 & Airline Society
│   └── routes/api.php            ← REST API routes
├── package.json
└── README.md
```

---

## 📝 License

Copyright &copy; 2026 EQUI Gaming. All rights reserved.
"# EQUI-Website" 
