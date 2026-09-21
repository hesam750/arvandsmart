# ArvandSmartControl - AI Handoff

This document is the working context for the next AI coding agent. Read it before changing code.

## 1. Project Identity

- Product: ArvandSmartControl
- Domain: intelligent chiller monitoring, HVAC control, IoT connectivity, energy optimization, anomaly detection, and predictive maintenance
- Framework: Next.js 16.2.4 with App Router and Turbopack
- Runtime: React 19, TypeScript 5.7, Tailwind CSS 4
- Deployment target: Vercel
- Languages: Persian (`fa`, default), English (`en`), Arabic (`ar`)
- Direction: Persian and Arabic are RTL; English is LTR
- Current production metadata URL: `https://arvandsmartcontrol.ir`

## 2. Runbook

Install dependencies:

```bash
pnpm install
```

Development:

```bash
pnpm dev
```

Type check:

```bash
pnpm exec tsc --noEmit
```

Production build:

```bash
pnpm build
pnpm start
```

Lint:

```bash
pnpm lint
```

At handoff time, `pnpm exec tsc --noEmit` and `pnpm build` passed. The build generated the blog article pages as static routes. A warning remains that the `middleware` file convention is deprecated in this Next.js version and should eventually migrate to `proxy`; do not mix that migration into unrelated work.

## 3. Main Structure

- `app/page.tsx`: landing page composition
- `app/layout.tsx`: global metadata, fonts, providers, JSON-LD, theme initialization
- `app/globals.css`: global design tokens, Tailwind theme mapping, shared utility classes
- `app/blog/page.tsx`: server-rendered blog list seed from JSON
- `app/blog/blog-list-client.tsx`: client-side search/category filtering only
- `app/blog/[slug]/page.tsx`: server-rendered article page, metadata, JSON-LD, related articles, static params
- `app/blog/[slug]/blog-detail-client.tsx`: client-side article presentation and sharing interaction
- `app/admin/*`: authenticated admin dashboard and CRUD screens
- `app/admin/settings/page.tsx`: browser-local Server URL setting and connection test
- `app/api/auth/[...nextauth]/route.ts`: NextAuth handlers
- `auth.ts`: credentials authentication configuration
- `middleware.ts`: protects `/admin/*` and redirects authenticated users away from `/login`
- `lib/data-service.ts`: current in-memory data access layer
- `lib/types.ts`: Article, Product, ContactMessage, and API response types
- `lib/validation.ts`: Zod schemas for input validation
- `lib/i18n/language-context.tsx`: language state, persistence, translations, and direction
- `lib/i18n/translations.ts`: all UI translations
- `data/articles.json`: source articles
- `data/products.json`: source products
- `data/discounts.json`, `data/processes.json`: legacy/unused or compatibility data
- `components/ui/*`: Radix/Tailwind shared UI primitives
- `components/landing/*`: landing page sections and animations
- `components/3d/*`: Three.js/React Three Fiber visual components

## 4. Current Data Contract

The source of truth for public articles and products is the repository JSON:

- `data/articles.json`
- `data/products.json`

`lib/data-service.ts` imports those JSON files and seeds in-memory arrays at module load. It no longer uses `localStorage` for articles, products, contacts, or activity. This is intentional because Vercel runtime/file-system writes are not durable.

Important behavior:

- Public articles/products are available from source JSON at build/runtime.
- Admin create/update/delete operations mutate only the current process/session memory and are not written back to JSON.
- A refresh, new server instance, or new deployment restores JSON data.
- Contact messages begin as an empty in-memory array and are not durable.
- `getRecentActivity()` is also in-memory only.
- To make a permanent content change, edit the relevant JSON file in the repository and deploy.
- Do not reintroduce `localStorage` as a database substitute.

The `SERVER_URL_STORAGE_KEY` in `lib/data-service.ts` is an exception: it stores only the selected backend URL for the current browser and is used by the admin settings screen. It does not change Next.js server configuration or make CRUD persistent.

## 5. Authentication and Environment

`auth.ts` uses NextAuth Credentials with JWT sessions and a custom `/login` page.

Required Vercel environment variables:

```env
ADMIN_USERNAME=replace-with-a-secure-username
ADMIN_PASSWORD=replace-with-a-secure-password
AUTH_SECRET=replace-with-a-long-random-secret
```

Rules:

- Never use `NEXT_PUBLIC_ADMIN_USERNAME` or `NEXT_PUBLIC_ADMIN_PASSWORD`.
- Never add fallback credentials or commit real secrets.
- The application rejects login when `ADMIN_USERNAME` or `ADMIN_PASSWORD` is missing.
- This is currently a single static admin credential, not a multi-user RBAC system.
- CRUD endpoints/server actions are not yet protected because CRUD is currently invoked through the client-side in-memory service. If a real backend is added, enforce authorization inside every server endpoint, not only middleware.

## 6. Completed Work

### Data handling

- Hardened the old browser persistence parser before removing it.
- Removed content `localStorage` persistence and merge/override logic.
- Switched articles and products to deploy-time JSON source data.
- Kept the existing `ApiResponse<T>` service API so UI migration remains contained.

### Contact form

- Added `contactMessageInputSchema` in `lib/validation.ts`.
- Validates trimmed name, email, phone, subject, and message lengths.
- Aligned client input constraints with the schema.
- Contact submissions still exist only in memory; they are not production-persistent.

### Server URL setting

- Added a localized Server URL section to admin settings.
- Supports HTTP/HTTPS URL validation.
- Saves the normalized URL in the current browser.
- Tests the URL with `fetch`, `AbortController`, and a five-second timeout.
- Shows inline success/error/testing states.
- This is a frontend preference and connection probe, not a runtime rewrite of server environment variables.

### Blog SEO and performance

- Removed duplicate client fetches from blog list and article detail pages.
- Server components provide article and related-article data from JSON.
- Added `generateStaticParams()` for article slugs.
- Article routes are statically generated with `generateStaticParams`.
- Existing metadata, canonical URLs, sitemap, robots, and JSON-LD remain in place.

### Visual system

- Added shared `surface-deep` and `surface-deep-elevated` color tokens in `app/globals.css` for light/dark themes.
- Aligned Hero monitor surfaces with those tokens.
- Replaced direct testimonial blue/violet/emerald/amber utilities with project `primary` and `chart-*` tokens.
- Removed an unrelated purple/slate hover treatment from the Hero CTA.
- Keep future UI colors on the central token system; avoid new hardcoded colors in normal UI components.
- Canvas/SVG-specific colors in 3D artwork and Open Graph generation were not fully migrated and need visual review before changing.

## 7. Known Limitations and Risks

1. There is no real database. Admin edits, contacts, and activity are not durable on Vercel.
2. The admin settings cards for database/API/notifications are still mostly presentational; only Server URL is functional.
3. Server URL is not consumed by data-service CRUD yet.
4. Authentication is a single credential pair with no password hashing, user table, roles, audit log, rate limiting, or MFA.
5. The contact form has client-side and service-level validation, but no durable delivery channel such as email, database, or CRM.
6. `next-auth` is currently a beta release; evaluate upgrade compatibility before production hardening.
7. Many landing sections use client components and animation libraries; audit bundle size and hydration cost before adding more animation.
8. Some metadata and SEO URLs are hardcoded to the Vercel domain. A future pass should centralize `BASE_URL` behind a validated environment variable with a production fallback.
9. Some UI strings and visual labels are still hardcoded in components instead of translations.
10. There is no documented automated test suite for auth, data behavior, contact validation, or route metadata.
11. `pnpm lint` was not runnable in the original environment because the `eslint` executable was unavailable, although the production build and TypeScript check passed.
12. Next.js reports that `middleware` should eventually migrate to the newer `proxy` convention.

## 8. Recommended Next Steps

Work one approved stage at a time and validate after every edit.

### Priority 1: Make content workflow explicit

Choose one policy:

- Repository-managed content: edit JSON through code review/deploy only; make admin CRUD read-only or clearly preview-only.
- Durable CMS/data service: add a real service such as Supabase/Postgres/Neon, then move CRUD behind authenticated server routes/actions.

Do not pretend that a Vercel deployment can persist changes to repository JSON at runtime.

### Priority 2: Centralize deployment configuration

- Add a server-only `SITE_URL` or `NEXT_PUBLIC_SITE_URL` policy.
- Replace hardcoded `https://arvandsmartcontrol.ir` in metadata, sitemap, robots, and JSON-LD.
- Validate the URL and document Vercel configuration.

### Priority 3: Production security

- Hash credentials or move authentication to a user database/identity provider.
- Add rate limiting and brute-force protection to login.
- Add schema validation to every future server endpoint.
- Add authorization checks inside server handlers.
- Rotate secrets and verify secure cookie/session settings in production.

### Priority 4: Contact delivery

Use a durable provider compatible with Vercel, for example a database plus email provider. Keep Zod validation at the server boundary and add spam protection, rate limits, and an explicit privacy policy.

### Priority 5: Quality and UX

- Add tests for validation, auth, JSON loading, article static params, and contact behavior.
- Run `pnpm lint` after making ESLint available/configured.
- Add loading/error/empty states consistently.
- Audit accessibility: labels, keyboard navigation, focus states, alt text, reduced motion, and contrast.
- Use a browser screenshot audit for desktop/mobile before making broad visual changes.

### Priority 6: Middleware migration

Handle the `middleware` to `proxy` migration as a separate, focused task. Re-run build and verify login/admin redirects after migration.

## 9. Agent Working Rules

- Read this file before editing.
- Ask for approval before beginning the next major stage when the user requested step-by-step work.
- Preserve existing user changes and do not reset unrelated files.
- Start from the nearest controlling file and form one testable hypothesis before editing.
- Keep changes small and scoped.
- Use `apply_patch` for edits and run a focused validation immediately after the first substantive edit.
- Prefer the existing types, `data-service`, translations, and design tokens over new abstractions.
- Do not add a database or external service without explicit approval and environment requirements.
- Do not put secrets in source, JSON, `NEXT_PUBLIC_*`, or documentation.
- Keep Persian/Arabic RTL behavior intact.
- Maintain the current JSON shape unless a migration is planned and documented.
- Do not claim persistence when the implementation is in-memory or browser-local.

## 10. Validation Checklist

Before declaring a stage complete:

- `get_errors` on touched files
- `pnpm exec tsc --noEmit`
- Focused behavior check or test when available
- `pnpm build` for routing, metadata, Tailwind, and static generation changes
- Review `git diff --stat` and `git status --short`
- Report limitations and the exact next approved stage
