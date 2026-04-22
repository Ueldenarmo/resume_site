# RUNBOOK

Этот документ — пошаговая инструкция, как поднять проект локально и в production так, чтобы работали:
- сайт (`/ru`, `/en`)
- Payload CMS (`/admin` и `/api/...`)
- сохранение заявок из формы (`/api/contact`)
- revalidate/preview
- загрузка медиа в Vercel Blob

## 1. Что должно быть заранее

Обязательно:
1. Node.js `20.x` (рекомендуется LTS).
2. `pnpm` (в проекте зафиксирован `pnpm@10.25.0`).
3. Аккаунт GitHub (для деплоя на Vercel).
4. Аккаунт Supabase (Postgres).
5. Аккаунт Vercel (deploy + Blob Storage).

Проверка локального окружения:
```bash
node -v
pnpm -v
```

Если `pnpm` не установлен:
```bash
corepack enable
corepack prepare pnpm@10.25.0 --activate
```

## 2. Установка проекта локально

```bash
git clone <URL_ВАШЕГО_РЕПО>
cd portfolio-kisik
pnpm install
cp .env.example .env
```

Важно:
- `.env` не коммитим (он уже в `.gitignore`).
- Дальше обязательно заполнить `.env`, иначе Payload/БД/preview/revalidate будут работать некорректно.

## 3. Внешние сервисы и где брать ключи

### 3.1 Supabase Postgres (обязательно для полноценной работы CMS)

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard).
2. Создайте проект (`New project`).
3. Дождитесь статуса `Healthy`.
4. Перейдите: `Project Settings` -> `Database`.
5. Найдите блок `Connection string` и выберите формат `URI`.
6. Возьмите строку вида:
   `postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require`

Это значение вставляется в `.env` как `SUPABASE_DATABASE_URI`.

Примечания:
- `sslmode=require` для Supabase обязателен.
- Если меняли пароль БД в Supabase, connection string нужно обновить в `.env` и в Vercel Env.

Если нужен полностью локальный сценарий без Supabase, поднимите Postgres в Docker:
```bash
docker run --name portfolio-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=portfolio_kisik \
  -p 5432:5432 \
  -d postgres:16
```

Тогда в `.env` можно использовать:
`DATABASE_URI=postgres://postgres:postgres@localhost:5432/portfolio_kisik`

### 3.2 Vercel Blob (для media upload в Payload)

1. Откройте [Vercel Dashboard](https://vercel.com/dashboard).
2. Выберите проект (или создайте и привяжите репозиторий).
3. Перейдите `Storage` -> `Blob`.
4. Создайте Blob store (если ещё нет).
5. Откройте `Tokens` -> `Create token`.
6. Скопируйте токен вида `vercel_blob_rw_...`.

Это значение вставляется в `.env` как `BLOB_READ_WRITE_TOKEN`.

Важно:
- Без `BLOB_READ_WRITE_TOKEN` плагин Blob в `payload.config` выключается.
- Для production/serverless отсутствие токена приведёт к проблемам с постоянным хранением медиа.

### 3.3 Секреты проекта (генерируются вручную)

Нужны два отдельных секрета:
- `PAYLOAD_SECRET`
- `REVALIDATE_SECRET`

Сгенерировать можно так:
```bash
openssl rand -base64 48
openssl rand -base64 48
```

Первую строку вставьте в `PAYLOAD_SECRET`, вторую — в `REVALIDATE_SECRET`.

Требования:
- минимум 16 символов (по валидации проекта);
- секреты должны отличаться друг от друга;
- не передавать их на клиент и не хранить в репозитории.

## 4. Как заполнить `.env` (полная карта переменных)

Файл `.env` должен содержать:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PAYLOAD_SECRET=<длинный_случайный_секрет>

# хотя бы один из двух URI должен быть задан
SUPABASE_DATABASE_URI=postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres?sslmode=require
DATABASE_URI=

REVALIDATE_SECRET=<отдельный_длинный_случайный_секрет>
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx

# опционально
ENABLE_DRAFT_PREVIEW=true
```

Назначение каждой переменной:

| Переменная | Обязательна | Где взять | Куда подставлять | Для чего нужна |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Да | вручную | `.env` и Vercel Env | Базовый URL, который используют Payload hooks для вызова `/api/revalidate` |
| `PAYLOAD_SECRET` | Да | сгенерировать `openssl rand -base64 48` | `.env` и Vercel Env | Секрет Payload CMS |
| `SUPABASE_DATABASE_URI` | Да (рекомендуемый путь) | Supabase -> Project Settings -> Database -> Connection string (URI) | `.env` и Vercel Env | Подключение к production-ready Postgres |
| `DATABASE_URI` | Альтернатива | ваш локальный/внешний Postgres | `.env` и Vercel Env (если используете его вместо Supabase) | Резервный способ подключения к БД |
| `REVALIDATE_SECRET` | Да | сгенерировать `openssl rand -base64 48` | `.env` и Vercel Env | Защита `/api/revalidate` и `/api/preview` |
| `BLOB_READ_WRITE_TOKEN` | Да для production media | Vercel -> Storage -> Blob -> Tokens | `.env` и Vercel Env | Загрузка файлов из `media` в Vercel Blob |
| `ENABLE_DRAFT_PREVIEW` | Нет | вручную (`true`/`false`) | `.env` и Vercel Env | Фича-флаг для preview-поведения |

Критично:
- Для БД должен быть задан хотя бы один параметр: `SUPABASE_DATABASE_URI` или `DATABASE_URI`.
- Для локали используйте `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- Для production укажите реальный домен, например `https://resume.example.com`.
- В `payload.config` есть dev-fallback для `PAYLOAD_SECRET`, но в production всегда задавайте явное значение через ENV.
- `ENABLE_DRAFT_PREVIEW` сейчас резервный флаг: в текущем коде напрямую не используется, но его можно оставить для будущего расширения preview-логики.

## 5. Подготовка БД (миграции Payload)

После заполнения `.env` выполните:

```bash
pnpm payload migrate:status
pnpm payload migrate
```

Что это делает:
- проверяет статус миграций;
- применяет схемы коллекций/глобалов Payload в Postgres.

Если миграции не применить, админка и API не смогут нормально работать с данными.

## 6. Первичный seed контента и администратора

```bash
pnpm seed
```

Seed создаёт:
- пользователя-админа: `admin@example.com` / `ChangeMe123!`
- базовые `siteSettings`
- базовый `homePage`

После первого входа в `/admin` обязательно смените пароль администратора.

## 7. Локальный запуск

```bash
pnpm dev
```

Проверить:
1. Сайт: [http://localhost:3000/ru](http://localhost:3000/ru) и [http://localhost:3000/en](http://localhost:3000/en)
2. Админка Payload: [http://localhost:3000/admin](http://localhost:3000/admin)
3. API Payload: [http://localhost:3000/api](http://localhost:3000/api)
4. Contact API: `POST /api/contact`

Важно по `contact`:
- если БД не настроена/недоступна, endpoint вернёт `202 { ok: true, stored: false }` (мягкий fallback);
- для реального сохранения заявок БД должна быть доступна.

## 8. Revalidate и Preview

### 8.1 Ручной revalidate

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H 'content-type: application/json' \
  -d '{
    "secret": "<REVALIDATE_SECRET>",
    "tags": ["home-page", "site-settings", "portfolio-sections"],
    "source": "manual"
  }'
```

Ожидаемый ответ: `{"revalidated":true,...}`

### 8.2 Preview mode

Откройте:
`http://localhost:3000/api/preview?secret=<REVALIDATE_SECRET>&locale=ru&redirect=/ru`

Если секрет корректен, включится draft mode и произойдёт редирект на нужную страницу.

## 9. Деплой на Vercel (production)

1. Импортируйте репозиторий в Vercel (`Add New Project`).
2. В `Settings` -> `Environment Variables` добавьте все ключи из раздела 4.
3. Обязательно задайте переменные минимум для `Production` и `Preview`.
4. Для production укажите:
   - `NEXT_PUBLIC_SITE_URL=https://<ваш-домен>`
   - актуальные значения `SUPABASE_DATABASE_URI`, `PAYLOAD_SECRET`, `REVALIDATE_SECRET`, `BLOB_READ_WRITE_TOKEN`
5. Запустите первый deploy.

После деплоя:
1. Откройте `https://<ваш-домен>/admin`.
2. Проверьте загрузку изображения в `media`.
3. Измените контент в `homePage` или `siteSettings` и убедитесь, что фронт обновляется (через revalidate hooks).

## 10. Рекомендуемый pre-deploy чек

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm build
pnpm test:e2e
```

## 11. Частые проблемы и точечные проверки

### `Сервер не может корректно работать с ENV`
Проверить:
- все обязательные переменные заданы;
- `PAYLOAD_SECRET` и `REVALIDATE_SECRET` длиной 16+ символов;
- хотя бы один из `SUPABASE_DATABASE_URI`/`DATABASE_URI` заполнен.

### `cannot connect to Postgres`
Проверить:
- правильность строки подключения (особенно пароль);
- что в Supabase используется URI с `sslmode=require`;
- доступность инстанса БД.

### `401 Unauthorized` на `/api/revalidate` или `/api/preview`
Проверить:
- `REVALIDATE_SECRET` в запросе;
- что сервер запущен с актуальным значением этой переменной.

### Медиа не загружается в админке
Проверить:
- `BLOB_READ_WRITE_TOKEN`;
- что токен добавлен в нужное окружение Vercel (Production/Preview);
- что Blob store существует и токен активен.

### Хуки меняют контент в CMS, но фронт не обновляется
Проверить:
- `NEXT_PUBLIC_SITE_URL` указывает на реальный адрес текущего окружения;
- endpoint `<NEXT_PUBLIC_SITE_URL>/api/revalidate` доступен;
- `REVALIDATE_SECRET` совпадает в проекте и запросах.

## 12. Короткий onboarding-чеклист (можно дать новому разработчику)

1. Создать Supabase project и получить `SUPABASE_DATABASE_URI`.
2. Создать Vercel Blob token и получить `BLOB_READ_WRITE_TOKEN`.
3. Сгенерировать `PAYLOAD_SECRET` и `REVALIDATE_SECRET`.
4. Заполнить `.env`.
5. Выполнить `pnpm install`.
6. Применить `pnpm payload migrate`.
7. Выполнить `pnpm seed`.
8. Запустить `pnpm dev`.
9. Проверить `/admin`, `/ru`, `/en`, `/api/revalidate`, загрузку media.
