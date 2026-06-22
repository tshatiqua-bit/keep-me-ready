# Keep Me Ready — Product Plan

---

## 1. Product Vision

Keep Me Ready is a web-based bookkeeping drill app that turns daily practice into a habit.
Users answer short, focused questions — multiple choice, true/false, and scenario-based —
and get instant plain-English feedback on every answer. Over time, the app tracks their
scores, builds streaks, and shows them real progress.

The core promise: 10 minutes a day makes bookkeeping click.

---

## 2. Target User

**Primary:** Job seekers transitioning into bookkeeping or accounting roles who need to
demonstrate competency in interviews or on the job, without a formal degree.

**Secondary:** Students preparing for certifications (QuickBooks ProAdvisor, NACPB,
Bookkeeper Launch, etc.) who benefit from active recall over passive reading.

**Also serves:** Career changers and small business owners who handle their own books and
want to stay current on foundational concepts.

**What they share:**
- Limited study time (need short, focused sessions)
- Variable background knowledge (need clear explanations, not just answer keys)
- Motivation tied to visible progress (streaks, scores, and dashboards matter)
- No guaranteed desktop access (must work well on mobile)

---

## 3. MVP Feature List

### Core Drill Engine
- [ ] Daily drill mode — 10 questions per session, drawn from the question bank
- [ ] Three question types: multiple choice, true/false, scenario-based
- [ ] Instant answer feedback (correct/incorrect highlighted immediately)
- [ ] Plain-English explanation shown after every answer
- [ ] Session score displayed at the end of each drill

### Progress Tracking
- [ ] Anonymous play with local storage — no login required to use the app
- [ ] Optional account creation to persist data across devices
- [ ] Streak tracking (consecutive days with at least one completed drill)
- [ ] Basic dashboard: total questions answered, overall accuracy %, current streak

### Content
- [ ] Seed question bank: 60–80 questions across beginner level
- [ ] Question categories: debits/credits, accounts, financial statements,
      journal entries, bank reconciliation, payroll basics
- [ ] Each question includes: question text, options, correct answer, explanation

### Access & Auth
- [ ] Works fully without an account (local storage)
- [ ] Optional login via Google OAuth or email magic link (Supabase Auth)
- [ ] On login, local progress merges with account data

### Design
- [ ] Mobile-first responsive layout
- [ ] Clean, low-distraction interface — focus stays on the question
- [ ] Accessible color contrast and tap targets

---

## 4. Recommended Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | React-based, built-in API routes, first-class Vercel support, handles both static and server rendering |
| Language | **TypeScript** | Catches bugs early, especially useful when question data has strict shapes |
| Styling | **Tailwind CSS** | Mobile-first by default, fast to build responsive UIs, no stylesheet bloat |
| Auth | **Supabase Auth** | Built-in optional login (Google + email magic link), integrates directly with the database |
| Database | **Supabase (PostgreSQL)** | Free tier covers MVP easily, real-time capable, pairs naturally with Supabase Auth |
| Local persistence | **localStorage** | Zero-config anonymous tracking for users who skip login |
| Deployment | **Vercel** | Native Next.js integration, free tier, auto-deploys from GitHub on every push |

**Why not a simpler stack?** Pure HTML/CSS/JS would require reinventing routing, state,
and component composition by hand. Next.js gives all of that with near-zero overhead and
the same deployment simplicity.

---

## 5. Folder Structure

```
keep-me-ready/
├── app/
│   ├── layout.tsx                  # Root layout, nav, font, theme
│   ├── page.tsx                    # Landing / home page
│   ├── drill/
│   │   └── page.tsx                # Main drill interface
│   ├── dashboard/
│   │   └── page.tsx                # Progress dashboard (streak, stats)
│   ├── auth/
│   │   ├── login/page.tsx          # Login / signup page
│   │   └── callback/route.ts       # Supabase OAuth callback handler
│   └── api/
│       ├── scores/route.ts         # Save and retrieve session scores
│       └── progress/route.ts       # Aggregate user progress data
│
├── components/
│   ├── drill/
│   │   ├── QuestionCard.tsx        # Renders question text and type label
│   │   ├── AnswerOption.tsx        # Single answer choice (highlights on select)
│   │   ├── Explanation.tsx         # Post-answer plain-English feedback
│   │   ├── ScoreDisplay.tsx        # End-of-session score summary
│   │   └── DrillProgress.tsx       # Question X of Y progress bar
│   ├── dashboard/
│   │   ├── StreakBadge.tsx         # Current streak display
│   │   └── ProgressStats.tsx       # Accuracy, total answered, etc.
│   └── ui/
│       ├── Button.tsx              # Reusable button with variants
│       └── Card.tsx                # Wrapper card component
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser-side Supabase client
│   │   └── server.ts               # Server-side Supabase client
│   ├── questions/
│   │   └── selector.ts             # Logic to sample questions for a drill
│   └── utils/
│       ├── scoring.ts              # Score calculation helpers
│       └── streaks.ts              # Streak logic (check/update)
│
├── data/
│   └── questions/
│       ├── beginner.json           # Seed question bank (60–80 questions)
│       ├── intermediate.json       # Placeholder for future content
│       └── advanced.json           # Placeholder for future content
│
├── types/
│   └── index.ts                    # Shared TypeScript types (Question, Score, User)
│
└── public/
    └── favicon.ico
```

---

## 6. First 7-Day Build Plan

### Day 1 — Project Setup & Skeleton
- Initialize Next.js 14 project with TypeScript and Tailwind CSS
- Connect to Supabase project (create free account + project)
- Set up environment variables (.env.local)
- Deploy blank skeleton to Vercel and confirm CI pipeline works
- Create basic folder structure and placeholder pages

### Day 2 — Question Bank & Data Model
- Define the `Question` TypeScript type (id, type, text, options, answer, explanation, category, level)
- Write 60–80 beginner questions across 6 categories into `data/questions/beginner.json`
- Build `lib/questions/selector.ts` — function that draws 10 random questions for a session
- Write unit test or manual verification for question selector

### Day 3 — Core Drill UI
- Build `DrillProgress`, `QuestionCard`, and `AnswerOption` components
- Wire up the drill page: load 10 questions, render one at a time, advance on answer
- Show correct/incorrect feedback immediately on tap/click
- Render `Explanation` component after each answer
- Build `ScoreDisplay` end-of-session summary screen

### Day 4 — Anonymous Progress (Local Storage)
- Implement `scoring.ts` — calculate session score, store in localStorage
- Implement `streaks.ts` — read last drill date from localStorage, update streak
- Show running streak and last score on the home page for anonymous users
- Verify that refreshing the page or closing the tab preserves progress

### Day 5 — Auth Integration
- Configure Supabase Auth (enable Google OAuth + email magic link in Supabase dashboard)
- Build login page and Supabase auth callback route
- Add optional "Save your progress" prompt at end of each drill session
- On login: merge localStorage data into Supabase user record

### Day 6 — Dashboard & Synced Progress
- Create Supabase tables: `users`, `drill_sessions`, `streaks`
- Build API routes for saving scores and retrieving progress
- Build dashboard page: streak badge, total questions answered, accuracy %, recent sessions
- Ensure dashboard shows localStorage data for anonymous users, DB data for logged-in users

### Day 7 — Polish & Deploy
- Responsive design audit on mobile (test at 375px and 390px widths)
- Add loading states and empty states (first-time user, no data yet)
- Accessibility pass: keyboard navigation, tap target sizes, color contrast
- Final Vercel deploy with production environment variables
- Smoke test the full user journey: land → drill → score → login → dashboard

---

*Plan created: 2026-06-22*
*Status: Day 7 complete — polished, accessible, deploy-ready*

## Build Log

### Day 7 — DONE (2026-06-22)
- app/globals.css: added skip-link style (visible on keyboard focus, off-screen otherwise)
- app/layout.tsx: skip-to-content link, aria-label on nav, focus-visible rings on logo/nav links, id="main-content" on <main>, reduced gap to gap-4 on mobile
- components/NavUser.tsx: Sign in tap target bumped to px-4 py-2 (~40px), focus ring on Sign out
- components/drill/AnswerOption.tsx: py-3.5 for 44px+ tap target on mobile
- components/drill/DrillProgress.tsx: role="status", role="progressbar" with aria values
- components/drill/DrillClient.tsx: focus-visible ring on Next/See Results button
- components/drill/ScoreDisplay.tsx: role="region" + aria-label on results section, focus rings on both CTA buttons, upgraded text-slate-400 to text-slate-500
- components/HomeStats.tsx: responsive padding p-3 sm:p-5, text-lg sm:text-2xl for 375px layout, tabular-nums
- app/page.tsx: focus-visible rings on both CTA links
- components/DashboardView.tsx: focus ring on Start Drill button
- Build: clean — 5 static + 6 dynamic routes, 0 errors

### Deploy checklist (Vercel)
1. Push repo to GitHub: git init → git add -A → git commit → gh repo create → git push
2. vercel.com → Add New Project → import the GitHub repo
3. In Vercel project → Settings → Environment Variables, add:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
4. In Supabase → Auth → URL Configuration → add your Vercel production URL to redirect URLs: https://your-app.vercel.app/auth/callback
5. Vercel re-deploys automatically on every push to main
6. Smoke test: land → drill 10 questions → see score → sign in → view dashboard → verify streak

### Day 6 — DONE (2026-06-22)
- types/index.ts: added total field to DrillSession (required for session history display)
- lib/utils/progress.ts: saveSession() now persists total in the stored session
- lib/utils/streak.ts: computeStreakFromDates() shared utility for DB-side streak calculation
- supabase/migrations/001_init.sql: drill_sessions table + RLS policies (select_own + insert_own)
- app/api/scores/route.ts: POST — saves a drill session for the authenticated user
- app/api/progress/route.ts: GET — returns aggregated stats for authenticated user
- components/dashboard/StreakBadge.tsx: streak display with contextual message
- components/dashboard/ProgressStats.tsx: 4-card stat grid (drills, answered, correct, accuracy)
- components/dashboard/SessionHistory.tsx: recent session list with accuracy bar + color coding
- components/DashboardView.tsx: client component — logged-in users get server-fetched DB data immediately, anonymous users read localStorage on mount
- app/dashboard/page.tsx: async server component — queries Supabase if logged in, passes data to DashboardView
- components/drill/DrillClient.tsx: fire-and-forget syncToDb() after each drill completion
- Build: clean — 5 static + 6 dynamic routes, 0 errors
- PREREQUISITE: Run supabase/migrations/001_init.sql in Supabase SQL Editor before testing logged-in dashboard

### Day 5 — DONE (2026-06-22)
- Installed @supabase/supabase-js + @supabase/ssr
- lib/supabase/client.ts: createBrowserClient wrapper (lazy — only call inside handlers/effects)
- lib/supabase/server.ts: createServerClient using await cookies() (Next.js 16 async cookies API)
- proxy.ts: session refresh on every request (Next.js 16 uses proxy.ts, not middleware.ts)
- app/auth/callback/route.ts: exchanges OAuth code for session, redirects to /dashboard
- app/auth/logout/route.ts: signs out, redirects to /
- components/LoginForm.tsx: Google OAuth + email magic link (client component, lazy client init)
- components/NavUser.tsx: shows email + Sign out when logged in, Sign in when not
- components/SaveProgressPrompt.tsx: shown after drill if not logged in
- app/layout.tsx: uses NavUser in header
- app/auth/login/page.tsx: thin server wrapper around LoginForm
- Build: clean — 5 static pages + 2 dynamic route handlers + proxy registered
- BLOCKER: .env.local missing — auth won't work until Supabase credentials are added

### Day 4 — DONE (2026-06-22)
- lib/utils/progress.ts: loadProgress(), saveSession(), getAccuracyPct()
- Streak logic: first drill→1, consecutive day→streak+1, drill again same day→unchanged, missed day→reset to 1
- All progress stored in localStorage under key "kmr_progress"
- DrillClient saves session on "See Results" click (before phase→completed)
- components/HomeStats.tsx: client component reads localStorage on mount, shows live streak/accuracy/answered
- Home page stats section now shows real data (server renders "—", client hydrates to real values)
- Streak logic verified for all 4 edge cases

### Day 3 — DONE (2026-06-22)
- DrillClient.tsx: client-side state machine (answering → revealed → completed)
- DrillProgress.tsx: progress bar + question counter + live score
- QuestionCard.tsx: question text with type and category badges
- AnswerOption.tsx: green/red/dimmed states on reveal
- Explanation.tsx: plain-English feedback after every answer
- ScoreDisplay.tsx: end-of-session summary with performance message + Try Again / Dashboard
- app/drill/page.tsx wired to DrillClient — drill is fully playable
- Production build: clean, 0 errors

### Day 2 — DONE (2026-06-22)
- 72 beginner questions written across 6 categories (12 per category)
- 38 multiple choice, 24 true/false, 10 scenario questions
- All correctIndex values validated (all in-bounds)
- lib/questions/selector.ts: selectDrillQuestions(), getQuestionById(), getQuestionsByCategory(), getTotalQuestionCount()
- Production build: still clean, 0 errors

### Day 1 — DONE (2026-06-22)
- Next.js 16.2.9 + React 19 + Tailwind v4 + TypeScript scaffolded
- Folder structure created: app/, components/, lib/, types/, data/
- Pages: / (home), /drill (placeholder), /dashboard (placeholder), /auth/login (placeholder)
- Types defined in types/index.ts: Question, DrillSession, UserProgress
- .env.local.example created with Supabase variable names
- Production build: 5 routes, 0 errors, all static
- Stack notes: Next.js 16 — params is now async (Promise<{...}>). Tailwind v4 uses @import "tailwindcss".
