# CLAUDE.md - Next.js 15 + SQLite SaaS Project Blueprint

This file provides context and strict guidelines for Claude Code operating on a Next.js 15 (App Router) + SQLite SaaS codebase.

---

## 🛠️ Stack & Recommended Versions

- **Framework**: Next.js `^15.1.0` (App Router)
- **Language**: TypeScript `^5.7.0` (Strict mode enabled)
- **UI & Styling**: React `^19.0.0`, Tailwind CSS `^4.0.0`
- **Database & ORM**: SQLite (`better-sqlite3` for local dev / `@libsql/client` for Turso edge), Drizzle ORM `^0.38.0`
- **Validation**: Zod `^3.24.0`
- **Auth**: NextAuth.js (Auth.js v5) or Clerk

---

## 📁 Repository Structure

```text
├── app/                  # Next.js App Router routes & layouts
│   ├── (auth)/           # Authentication route group (login, register)
│   ├── (dashboard)/      # Protected SaaS application pages
│   ├── api/              # Route handlers for webhooks & public APIs
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── db/                   # Database configuration & schemas
│   ├── index.ts          # Database client connection (WAL mode enabled)
│   ├── schema/           # Drizzle table definitions
│   └── migrations/       # SQL migration files
├── components/           # UI components
│   ├── ui/               # Primitive UI components (buttons, inputs)
│   └── dashboard/        # Feature-specific components
├── lib/                  # Utility functions & shared helpers
├── types/                # Project-wide TypeScript types
├── drizzle.config.ts     # Drizzle ORM CLI configuration
└── package.json
```

---

## ⚡ Essential Dev Commands

```bash
# Development
npm run dev               # Start local dev server at http://localhost:3000
npm run lint              # Run Next.js & ESLint linter
npm run typecheck         # Execute tsc --noEmit type check

# Database Management
npx drizzle-kit generate  # Generate migration SQL files from schema changes
npx drizzle-kit migrate   # Apply pending migrations to SQLite database
npx drizzle-kit studio    # Launch Drizzle Studio UI to inspect SQLite data
```

---

## 💾 Database & SQL Migration Rules

1. **Pragma Setup**: Always enable `PRAGMA journal_mode = WAL;` and `PRAGMA foreign_keys = ON;` in SQLite connection initialization to ensure fast concurrent reads and data integrity.
2. **Schema Organization**: Define each domain table in `db/schema/` (e.g. `users.ts`, `subscriptions.ts`, `organizations.ts`) and export all from `db/schema/index.ts`.
3. **Primary Keys & Timestamps**:
   - Use text UUIDs (`crypto.randomUUID()`) or ULIDs for primary keys.
   - Store timestamps as UTC ISO string integers/text using `integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)`.
4. **Never Alter DB Schemas Manually**: Always update Drizzle schema files in `db/schema/` and run `npx drizzle-kit generate` to produce reproducible SQL migrations.

---

## 🧱 Component & Architecture Patterns

1. **Server Components First**: Make components React Server Components (RSC) by default. Only add `"use client"` at the top of files that require browser hooks (`useState`, `useEffect`, `useFormStatus`).
2. **Mutations via Server Actions**: Put data mutations in dedicated server action files inside `app/actions/` or co-located with route groups, using `"use server"`.
3. **Strict Zod Input Validation**: Validate all Server Action inputs and API parameters using Zod schemas before querying the database.
4. **Structured Error Envelopes**: Return `{ success: true, data }` or `{ success: false, error: string }` from Server Actions—never throw raw unhandled errors to the UI.

---

## 🛑 What We Don't Do (and Why)

- ❌ **No Raw String Concatenation in SQL**: NEVER construct SQL queries with string templates. Always use Drizzle query builder or parameterized prepared statements (`db.prepare(...)`) to prevent SQL injection vulnerabilities.
- ❌ **No Heavy ORMs (Prisma / TypeORM)**: Heavy ORMs add multi-megabyte bundle overhead and query generation latency. We use light, typed SQLite query builders (Drizzle/Kysely).
- ❌ **No Database Access in Client Components**: Never import `db` in any file marked `"use client"`. Database operations must remain strictly on the server layer.
- ❌ **No Default Export Spam**: Use named exports for utility functions and UI components to improve IDE auto-imports and tree-shaking (except page/layout entrypoints required by Next.js App Router).
