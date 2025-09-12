# Firebase Studio

Admin-grade dashboard for managing Firebase resources across projects. Runs locally with Firebase Emulator Suite and deploys to production.

## Quickstart

1. Install dependencies:

```bash
pnpm i # or npm i or yarn
```

2. Copy env and configure:

```bash
cp .env.example .env.local
```

3. Start dev with emulators:

```bash
pnpm dev
```

4. Seed sample data (optional, emulators running):

```bash
pnpm seed
```

See more in docs below.

## Scripts
- dev: Next.js dev server
- emu:only: start emulators only
- seed: populate emulators with sample data
- test / test:e2e: run unit/e2e tests

## Environment
See `.env.example` for variables. All server vars validated at runtime.

## Deploy
Use Firebase Hosting and optional Functions. Configure credentials via environment.
