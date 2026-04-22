# resume-site

Portfolio landing на Next.js + Payload CMS с RU/EN локалями, CMS-управлением секциями и адаптивом по макету `bi8Au`.

## Stack
- Next.js App Router + React + TypeScript
- Tailwind CSS + shadcn-style utility primitives
- Payload CMS (embedded)
- Supabase Postgres (или любой PostgreSQL-совместимый инстанс)
- Vercel Blob adapter for Payload `media`
- Vitest + Playwright

## Quick Start
1. Установить зависимости:
```bash
pnpm install
```
2. Подготовить `.env`:
```bash
cp .env.example .env
```
3. Для production: создать Supabase project и вставить connection string в `SUPABASE_DATABASE_URI`.
4. Для локальной БД можно использовать `DATABASE_URI` из примера.
5. Запустить дев-сервер:
```bash
pnpm dev
```
6. (Опционально) засеять demo-данные:
```bash
pnpm seed
```

## Scripts
- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript check
- `pnpm test:unit` — Vitest
- `pnpm test:e2e` — Playwright E2E
- `pnpm payload:generate-types` — generate Payload types

## URLs
- Сайт: `/{locale}` (`/ru`, `/en`)
- Payload REST API: `/api/[...slug]`
- Contact API: `/api/contact`
- Revalidate API: `/api/revalidate`
- Preview API: `/api/preview`
