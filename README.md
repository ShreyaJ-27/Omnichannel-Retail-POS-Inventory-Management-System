# Omnichannel Retail POS & Inventory Management System

A modern, responsive Point of Sale (POS) and inventory management system built with React, Vite, and Tailwind CSS for seamless omnichannel retail operations. Includes a customer-facing frontend and an admin dashboard for analytics and inventory control.

Live demo: https://pos-inventory-management-system-dyg.vercel.app/

## Tech stack
- Languages: JavaScript, CSS, HTML
- Framework / runtime: React (Vite)
- UI: Tailwind CSS
- Notable libraries / tools: Vite, PostCSS, Tailwind

## Key features
- Responsive POS interface for quick checkout (frontend/src/pages/POS.jsx)
- Inventory management and product listing (frontend/src/pages/Inventory.jsx)
- Order management and order history (frontend/src/pages/Orders.jsx)
- Admin dashboard with analytics and low-stock alerts (admin-dashboard/src/pages/Analytics.jsx, admin-dashboard/src/pages/Dashboard.jsx)
- Shared service layer for API calls (frontend/src/services, admin-dashboard/src/services/api.js)
- State management scaffold (frontend/src/store)
- Utility helpers (frontend/src/utils)

## Project structure (top-level)
```
admin-dashboard/        Admin dashboard UI (analytics, admin pages)
  ├─ public/
  ├─ src/
  │  ├─ components/     Reusable UI components (LowStock.jsx, StatCard.jsx)
  │  ├─ pages/          Admin pages (Analytics.jsx, Dashboard.jsx)
  │  └─ services/       API client (api.js)
  ├─ package.json
  └─ vite.config.js

frontend/               Customer-facing POS and storefront
  ├─ public/
  ├─ src/
  │  ├─ pages/          Main app pages (Inventory.jsx, Orders.jsx, POS.jsx)
  │  ├─ components/     UI components
  │  ├─ services/       API client and data access
  │  ├─ store/          State management
  │  └─ utils/          Utility helpers
  ├─ package.json
  ├─ tailwind.config.js
  └─ vite.config.js
```

How it fits together:
- The repository contains two separate Vite-based React apps:
  - frontend: the customer-facing POS and storefront.
  - admin-dashboard: the administration and analytics interface.
- Both apps use a small service layer (src/services/api.js) to call a backend API. Pages import components and services to drive the UI and state.

## Getting started (local development)
Prerequisites:
- Node.js (16+ recommended) and npm or yarn installed.

Clone the repo and run each app separately.

1. Frontend (customer POS)
```bash
# from repository root
cd frontend
npm install
npm run dev
# open the printed Vite URL (usually http://localhost:5173)
```

2. Admin dashboard
```bash
cd admin-dashboard
npm install
npm run dev
# open the printed Vite URL for the admin app
```

Notes:
- Both apps are Vite projects — use `npm run build` to create production builds and `npm run preview` to serve a production build locally (if available in package.json).
- If the apps need to talk to a backend API, update the API base URL in the service file:
  - admin-dashboard/src/services/api.js
  - frontend/src/services/* (look for an `api` or `client` file)
  Add environment variables or edit the base URL constant in those files as needed.

## Build & deploy
- The frontend is already deployed (see Live demo link above). You can deploy both apps to Vercel, Netlify, or any static hosting that supports single-page apps.
- Typical steps to deploy:
  - Set the build command: `npm run build`
  - Set the output directory: `dist` (Vite default)
  - Configure any required environment variables (API endpoint, keys)

## Known files of interest
- frontend/src/pages/Inventory.jsx — inventory UI and item management
- frontend/src/pages/Orders.jsx — orders list and order actions
- frontend/src/pages/POS.jsx — POS checkout interface
- admin-dashboard/src/pages/Analytics.jsx — analytics dashboards
- admin-dashboard/src/pages/Dashboard.jsx — admin overview
- admin-dashboard/src/services/api.js — admin API client

## License
This project is licensed under the MIT License — see the LICENSE file for details.

## Contact
Created by ShreyaJ-27. For questions or collaboration, open an issue or pull request in this repository.
