# Flexflix

A client-side TV show & movie watchlist manager built on the TMDB API. See `PLAN.md` for the full implementation plan.

## Stack

React (Vite) + shadcn/ui + TanStack Router + TanStack Query + Zustand + TMDB API v3 + localStorage, structured with Feature-Sliced Design.

## Getting started

```bash
npm install
cp .env.example .env   # fill in VITE_TMDB_API_KEY
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck + production build
- `npm run lint` — oxlint
- `npm run lint:fsd` — Steiger FSD structure linter
