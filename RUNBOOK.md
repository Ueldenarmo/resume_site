# RUNBOOK

## 1. Environment
Создайте `.env` из `.env.example` и заполните:
- `PAYLOAD_SECRET`
- `SUPABASE_DATABASE_URI` (предпочтительно для production)
- `DATABASE_URI` (опционально для локального/альтернативного Postgres)
- `REVALIDATE_SECRET`
- `BLOB_READ_WRITE_TOKEN` (для production media storage)

`NEXT_PUBLIC_SITE_URL` для локали обычно `http://localhost:3000`.

## 2. Local Launch
```bash
pnpm install
pnpm dev
```

Если ни `SUPABASE_DATABASE_URI`, ни `DATABASE_URI` не заданы (или БД недоступна), страница продолжит работать на fallback-контенте, но:
- Payload API/админка и сохранение заявок будут ограничены;
- `/api/contact` вернёт `202` в fallback-режиме.

## 3. Seed Content
```bash
pnpm seed
```

Seed создаёт:
- admin user (`admin@example.com` / `ChangeMe123!`)
- значения `siteSettings`
- базовый контент `homePage`

Смените пароль администратора после первого входа.

## 4. Quality Gates
Перед деплоем:
```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
```

## 5. Preview and Revalidation
- Preview: `GET /api/preview?secret=...&locale=ru&redirect=/ru`
- Revalidate: `POST /api/revalidate` с телом:
```json
{
  "secret": "REVALIDATE_SECRET",
  "tags": ["home-page", "site-settings", "portfolio-sections"],
  "source": "payload-hook"
}
```

Hooks для глобалов/коллекций уже отправляют запрос на revalidate endpoint.

## 6. Deployment
Рекомендуемая цель: Vercel + Supabase Postgres + Vercel Blob.

Шаги:
1. Задать production ENV переменные.
2. Выполнить build (`pnpm build`).
3. Деплой.
4. Проверить:
- `/ru` и `/en`
- `/api/contact`
- revalidate flow после изменения контента в Payload.

## 7. Troubleshooting
- `cannot connect to Postgres`:
  - проверить `SUPABASE_DATABASE_URI` (или `DATABASE_URI`), доступность БД, network allowlist;
  - для Supabase использовать строку с `sslmode=require`.
- `401` на `/api/revalidate`:
  - проверить `REVALIDATE_SECRET`.
- медиа не грузятся:
  - проверить `BLOB_READ_WRITE_TOKEN`.
