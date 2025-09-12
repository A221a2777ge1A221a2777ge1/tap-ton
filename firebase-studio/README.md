# Firebase Studio

Admin-grade dashboard to manage Firebase resources with multi-tenant RBAC.

## Quick Start (Emulators)

1. Copy `.env.example` to `.env.local` and adjust if needed.
2. Install deps:

```bash
npm i
```

3. Start dev (Next.js + Emulators):

```bash
npm run dev
```

4. Open `http://localhost:3000` and sign in (seed creates `admin@example.com` / `password123`).

## Scripts
- dev: Next.js dev + Firebase Emulators
- emu:only: Emulators only
- seed: Populate emulator with sample data
- test: Unit tests (Vitest)
- test:e2e: E2E tests (Playwright)

## Deploy

Provide `FIREBASE_ADMIN_CREDENTIALS_B64` and production `NEXT_PUBLIC_FIREBASE_*` vars, then deploy Hosting/Functions via CI.

