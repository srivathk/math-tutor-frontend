<pre>
 __  __       _   _     _             _             
|  \/  | __ _| |_| |__ (_)_   _ _ __ | |_ ___  _ __ 
| |\/| |/ _` | __| '_ \| | | | | '_ \| __/ _ \| '__|
| |  | | (_| | |_| | | | | |_| | | | | || (_) | |   
|_|  |_|\__,_|\__|_| |_|_|\__,_|_| |_|\__\___/|_|   
</pre>

AI Math Tutor – Frontend

Next.js + TailwindCSS UI for the AI Math Tutor backend.
Collects a problem, calls the API, and renders hint / next step / verification.

OVERVIEW

- Framework: Next.js (App Router)
- Styling: TailwindCSS
- Purpose: Input → call backend `/tutor` → display hint, proposed_next_step, verified
- Works with backend at http://127.0.0.1:8000 (FastAPI)

FEATURES

- Minimal responsive form (problem input + submit)
- Loading + error states
- Clean result panel (hint / next step / verified)
- Optional dev proxy to avoid CORS and hardcoded URLs

API CONFIG

Direct (default dev):
- Fetch URL: http://127.0.0.1:8000/tutor

DEV PROXY (RECOMMENDED): add to next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/api/:path*', destination: 'http://127.0.0.1:8000/:path*' }];
  },
};
export default nextConfig;

Then fetch with fetch('/api/tutor', { ... }).

Production:
- Deploy backend (Render/Railway/Fly.io) → e.g. https://your-backend.onrender.com
- Set env: NEXT_PUBLIC_API_BASE=https://your-backend.onrender.com
- Use: fetch(`${process.env.NEXT_PUBLIC_API_BASE}/tutor`, { ... })
  or keep the proxy and point it to your prod URL.

EXAMPLE UI CALL

const res = await fetch('/api/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ problem: '2x + 3 = 7' }),
});
const data = await res.json();
// data = { verified: true, hint: 'Subtract 3...', proposed_next_step: '2x = 4' }

TECH STACK

Node 18+
Next.js (App Router)
TailwindCSS
Fetch API

PROJECT STRUCTURE

math-tutor-frontend/
├─ app/                 # pages/components (App Router)
├─ public/
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.js (or .mjs)
└─ README.md

SETUP

1. Install
   npm install

2. Run dev server
   npm run dev
   # http://localhost:3000

3. Backend must be running (default http://127.0.0.1:8000).

SCRIPTS

- npm run dev    → start dev server (Turbopack)
- npm run build  → production build
- npm start      → run production build locally

GITIGNORE

node_modules
.next
.env

PURPOSE

Frontend client for the AI Math Tutor.
Displays real-time, adaptive feedback returned by the backend.

CONTACT

Maintainer: Srivath Kumaran  
Repository: https://github.com/srivathk/math-tutor-frontend

LICENSE
MIT License
