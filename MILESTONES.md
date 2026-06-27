# Keep Me Ready — Milestones

This file records major architectural and product milestones.
It is written for future contributors and AI assistants: each entry explains
what was completed, what was verified, and what it means for the work ahead.

---

## foundation-v1-cloud-backed

**Tag:** `foundation-v1-cloud-backed`
**Date:** 2026-06-27
**Status:** Complete and verified in production

### What this milestone represents

This is the first fully operational version of Keep Me Ready in production.
The application is deployed, database-backed, authenticated, and monitored.
All core infrastructure that future features will build on top of is in place.

### What was completed

#### Cloud deployment
- Application deployed to Vercel at `https://keep-me-ready.vercel.app`
- Production, Preview, and Development environment configurations set
- All environment variables configured in Vercel (Supabase URL, anon key, service role key, admin email)
- Auto-deploy on push to `main` via GitHub integration

#### Supabase production database
- Three migrations applied and verified:
  - `001_init.sql` — `drill_sessions` table with RLS
  - `002_analytics.sql` — `drill_question_answers` table, category tracking, indexes
  - `003_learning_journal.sql` — `learning_journal` table with RLS and `GRANT` for authenticated role
- Row Level Security enabled on all tables — users can only access their own data
- Learned: PostgREST requires explicit `GRANT` to `authenticated` role or tables are invisible to the REST API even with RLS enabled

#### Learning Journal synchronisation (PRD v1.1 Critical Priority P1-F1)
- Anonymous users: journal entries saved to `localStorage["kmr-journal"]`
- Signed-in users: entries also written to `learning_journal` table via `/api/journal` (fire-and-forget, non-blocking)
- Dashboard reads from Supabase for signed-in users, localStorage for anonymous
- On first sign-in: all existing localStorage entries are bulk-merged to Supabase, then the localStorage key is cleared
- Merge is idempotent — safe to re-run if interrupted
- API route: `GET /api/journal` (fetch all), `POST /api/journal` (upsert, accepts array)

#### Authentication and Row Level Security
- Magic link sign-in (implicit flow via hash fragment)
- PKCE flow supported for Vercel edge compatibility
- Auth callback handles localStorage → Supabase merge before redirecting
- RLS verified: anonymous queries return zero rows, authenticated users see only their own data
- `DELETE CASCADE` on `user_id` FK — deleting a user removes all their journal entries

#### Sentry error monitoring (groundwork)
- `instrumentation.ts` — server-side init + `onRequestError` hook (Next.js 16 native API)
- `instrumentation-client.ts` — client-side init with Session Replay
- `next.config.ts` wrapped with `withSentryConfig`
- Gracefully no-ops when `SENTRY_DSN` env var is absent
- Ready to activate: add `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_DSN` to Vercel env vars

#### Documentation system
All documents live in `docs/`. Reading order for new contributors:

| # | Document | Location |
|---|---|---|
| 1 | Founder Vision v1 | `docs/founder/` |
| 2 | PRD v1 | `docs/founder/` |
| 3 | Founder Technical Blueprint v1 | `docs/founder/` |
| 4 | Developer Onboarding Guide v1 | `docs/engineering/` |
| 5 | AI Context Book v1 | `docs/engineering/` |

Each document exists as `.md`, `.html`, and `.pdf`. The AI Context Book is the
required starting point for any AI assistant working in this codebase — it documents
12 non-obvious constraints specific to this project.

#### Database validation
Integration test at `scripts/test-journal-sync.mjs`:
- 13/13 checks passed against the live Supabase project
- Tests: schema columns, FK-aware insert, field round-trip, upsert idempotency, RLS enforcement, cleanup
- Run any time with: `node scripts/test-journal-sync.mjs`
- Requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

### What is solid ground for future work

Everything above is verified in production. Future features can rely on:
- The `learning_journal` table and its API routes
- The `drill_sessions` and `drill_question_answers` tables
- The auth flow (magic link → callback → session)
- The localStorage → Supabase merge pattern (reuse for other data types)
- The Sentry instrumentation hooks (just add the DSN to activate)
- The documentation system (update docs when features change)

### What comes next

From the PRD, remaining v1.1 priorities in order:
1. **Activate Sentry** — add DSN to Vercel, verify errors surface in the dashboard
2. **Anonymous → signed-in session merge** — merge `kmr_progress` localStorage data on first sign-in (mirrors the journal merge pattern now established)
3. **Streak preservation** — recalculate streak from Supabase `drill_sessions` on sign-in
4. **Instructor dashboard improvements** — richer analytics from `drill_question_answers`

---

*Keep Me Ready — Practice makes permanent.*
