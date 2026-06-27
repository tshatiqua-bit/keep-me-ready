# Keep Me Ready — Product Requirements Document v1

**Prepared:** June 2026  
**Version:** 1.0  
**Status:** Active — v1.0 shipped  
**Owner:** Founder / Product  
**Reviewers:** Engineering, Design  
**Related documents:** [Founder Vision v1](Keep%20Me%20Ready%20Founder%20Vision%20v1.md) · [Technical Blueprint v1](Keep%20Me%20Ready%20Founder%20Technical%20Blueprint%20v1.md)

---

## Table of Contents

1. [Document Purpose](#1-document-purpose)
2. [Problem Statement](#2-problem-statement)
3. [User Personas](#3-user-personas)
4. [Goals and Non-Goals](#4-goals-and-non-goals)
5. [MVP Features](#5-mvp-features)
6. [Future Features](#6-future-features)
7. [User Flows](#7-user-flows)
8. [Success Metrics](#8-success-metrics)
9. [Technical Assumptions](#9-technical-assumptions)
10. [Release Plan](#10-release-plan)
11. [Risks](#11-risks)

---

## 1. Document Purpose

This PRD defines the product requirements for Keep Me Ready — a daily bookkeeping practice platform for job seekers, early-career professionals, and small business owners. It captures what has been built (v1.0 shipped), what must be built next (v1.1–v1.3), and what is planned for future phases.

This document is the source of truth for prioritization decisions. The [Founder Vision v1](Keep%20Me%20Ready%20Founder%20Vision%20v1.md) covers strategic intent. The [Technical Blueprint v1](Keep%20Me%20Ready%20Founder%20Technical%20Blueprint%20v1.md) covers implementation detail. This PRD bridges them.

### Scope

This document covers:

- The learner-facing drill and dashboard experience
- The instructor-facing analytics dashboard
- Authentication, data persistence, and cross-device sync
- Question bank content and structure
- Habit and retention mechanics

This document does not cover:

- Infrastructure configuration (see Technical Blueprint)
- Founding rationale and market context (see Founder Vision)
- Visual design specifications (to be defined in a separate design spec)

---

## 2. Problem Statement

### The gap

Bookkeeping professionals — job seekers, freelancers, early-career employees, and self-taught business owners — acquire foundational skills through certification programs, online courses, and on-the-job experience. Those skills decay without regular practice. There is no low-friction, daily-habit tool designed specifically for maintaining professional bookkeeping competence.

Existing alternatives fail in specific ways:

| Alternative | Why it fails this need |
|---|---|
| Certification prep courses | Optimized for passing a one-time exam, not daily maintenance. Expensive and time-intensive to return to. |
| Flashcard apps (e.g. Anki) | No coaching layer, no contextual explanations, no professional framing. Requires users to build their own deck. |
| YouTube videos | Passive, non-retrievable, no structured repetition, no progress tracking. |
| Textbooks and workbooks | High friction, no interactivity, no feedback mechanism. |
| Practice tests from certification programs | Framed as assessments with pass/fail stakes. Discourages regular re-use. |

### The core need

Users need a tool that is:

1. **Fast to start** — no friction between arriving and practicing (≤2 taps to first question)
2. **Coaching-oriented** — explains concepts without making users feel judged
3. **Habit-forming** — provides daily structure and visible progress over time
4. **Professionally framed** — speaks to professionals maintaining a skill, not students acquiring one

### The specific moment of need

The user's highest-need moments are:
- During a job search (weeks to months between employment)
- During a gap between freelance client engagements
- While enrolled in a certification program and needing supplemental daily practice
- Any time a professional suspects their fundamentals are drifting

---

## 3. User Personas

### Persona 1 — Sarah: The Job Seeker in Transition

| Attribute | Detail |
|---|---|
| Role | Completed bookkeeping certification, actively job searching |
| Time available | 10–20 minutes per day, usually mornings |
| Technical comfort | Moderate — uses apps daily, not technical |
| Primary device | Mobile (phone) |
| Key goal | Maintain confidence and fluency while searching, feel ready for interviews |
| Key frustration | Certification prep felt like cramming; she passed but isn't sure the knowledge stuck |
| Trigger | Upcoming interview or a question she couldn't answer confidently |
| Success state | Walks into an interview and can explain any foundational concept without hesitation |

**Design implications:** Mobile-first layout, fast session start, encouraging score framing, interview-relevant question wording.

---

### Persona 2 — Marcus: The Freelancer Between Engagements

| Attribute | Detail |
|---|---|
| Role | Freelance bookkeeper, 1–3 active clients at a time |
| Time available | 15 minutes over morning coffee, on weekdays |
| Technical comfort | High — uses multiple SaaS tools for client work |
| Primary device | Laptop, occasionally tablet |
| Key goal | Maintain sharpness and professional confidence during client gaps |
| Key frustration | Nothing exists between "take another course" and "do nothing" |
| Trigger | A client engagement ending, leaving a skill-maintenance gap |
| Success state | Enters a new client engagement feeling as sharp as when the last one ended |

**Design implications:** Streak and session history visibility (shows consistency), topic rotation (keeps practice varied), efficiency (no unnecessary UI friction for an experienced user).

---

### Persona 3 — Priya: The Career Changer Building Credibility

| Attribute | Detail |
|---|---|
| Role | Mid-career pivot from retail management into accounting services |
| Time available | 20–30 minutes daily, evenings |
| Technical comfort | Moderate — comfortable with apps but not power user |
| Primary device | Laptop at home |
| Key goal | Reinforce what she's learning in her program, build retention and confidence |
| Key frustration | Volume of new concepts feels overwhelming; she doesn't trust her own recall |
| Trigger | Finishing a study module and wanting to solidify it before moving on |
| Success state | Can explain any concept she's studied without hesitating or second-guessing herself |

**Design implications:** Lesson cards before each drill (orient before drilling), detailed per-answer explanations, Learning Journal (externalizes evolving understanding), topic filter on dashboard.

---

### Persona 4 — David: The Self-Taught Business Owner

| Attribute | Detail |
|---|---|
| Role | Small business owner who manages his own bookkeeping |
| Time available | 10 minutes, irregular schedule |
| Technical comfort | Low to moderate — uses basic tools, not comfortable with complexity |
| Primary device | Phone |
| Key goal | Fill gaps in self-taught knowledge, reduce anxiety about his own financials |
| Key frustration | Doesn't know what he doesn't know; no one to ask |
| Trigger | Confusion during a CPA meeting, an unfamiliar term on a report, a bookkeeping error |
| Success state | Feels in control of his own books and can have a real conversation with his accountant |

**Design implications:** Plain-English explanations without jargon, true/false and scenario questions grounded in real business situations, no intimidating interface complexity.

---

### Persona 5 — Instructor/Admin: The Program Director

| Attribute | Detail |
|---|---|
| Role | Director at a bookkeeping certification program or accounting firm |
| Time available | Reviews analytics weekly or on demand |
| Technical comfort | High — uses LMS and SaaS analytics tools |
| Primary device | Desktop |
| Key goal | Understand where learners or staff are struggling, identify curriculum gaps |
| Key frustration | Existing LMS tools show completion rates but not comprehension patterns |
| Trigger | Before a cohort check-in, after a batch of learners completes a module |
| Success state | Can identify the top 3 struggling topics for any cohort and act on them |

**Design implications:** Admin dashboard with per-topic difficulty ranking, most-missed questions, weekly trend chart, eventually cohort-level filtering.

---

## 4. Goals and Non-Goals

### Product goals (v1.0 — shipped)

| # | Goal | How measured |
|---|---|---|
| G1 | Any user can complete a full drill session without creating an account | Anonymous drill completion rate |
| G2 | Signed-in users have persistent progress across sessions and devices | Session count and streak accuracy for DB-backed users |
| G3 | Every answer receives a meaningful coaching explanation, not just a correct/incorrect indicator | 100% of questions have explanation text and per-option coaching notes |
| G4 | The admin/instructor can view aggregate performance analytics | Admin dashboard renders 9 metrics without errors |
| G5 | The app is accessible and usable on mobile at 375px viewport | Tap targets ≥44px, keyboard navigable, passes contrast checks |

### Product goals (v1.1–v1.3 — next phases)

| # | Goal | How measured |
|---|---|---|
| G6 | Learning Journal entries persist across devices | Journal entries stored in Supabase, readable on any signed-in device |
| G7 | Users can practice at beginner, intermediate, and advanced levels | Three populated question banks, level selector in UI |
| G8 | The product can measurably demonstrate skill improvement | Per-user accuracy delta visible on dashboard after ≥10 sessions |
| G9 | Instructors can manage named cohorts and view group-level analytics | Cohort management UI, per-cohort analytics view |

### Non-goals (explicitly out of scope for v1.x)

- **Real-time multiplayer or competitive features** — Keep Me Ready is a personal practice tool. Leaderboards and head-to-head competition are incompatible with the coaching-not-assessment principle.
- **AI-generated question content** — All questions, explanations, and coaching notes are human-authored for quality control. Automated generation is a future research area, not a v1 requirement.
- **Native mobile app (iOS/Android)** — The web app is mobile-first and serves mobile users adequately. A native app requires separate development resources and is a future phase decision.
- **Social or community features** — No public profiles, sharing, or social feeds in v1.x.
- **Content beyond bookkeeping** — Tax prep, payroll, and adjacent domains are vision-level priorities, not v1 or v1.x requirements.
- **Offline-first architecture** — Service worker caching for offline drill play is deferred until the core web experience is proven.

---

## 5. MVP Features

The following features define the v1.0 MVP. All are shipped and live at `keep-me-ready.vercel.app`.

### F1 — Daily Drill Engine

**Summary:** The core loop. Users complete a focused 10-question drill session on a daily rotating topic.

**Requirements:**

- R1.1: Each drill session presents exactly 10 questions drawn from the day's topic category
- R1.2: Topic rotates daily based on a deterministic day-of-year formula — all users see the same topic on any given day
- R1.3: Three question types supported: multiple choice (4 options), true/false (2 options), scenario (4 options)
- R1.4: Each question is preceded by a Lesson Card explaining the topic, why it matters, and a common misconception
- R1.5: After each answer, the correct answer is revealed immediately with a plain-English coaching explanation
- R1.6: Incorrect answer choices each have a coaching note explaining the misconception they represent
- R1.7: Session score is tracked and displayed at completion

**Acceptance criteria:**
- A new anonymous user can complete a full drill from homepage in under 2 minutes without creating an account
- All 72 beginner questions have non-empty `explanation` and `optionExplanations` fields
- Topic rotation produces a consistent category for a given calendar date across all users and sessions

**Status:** Shipped

---

### F2 — Score Screen and Reflection Layer

**Summary:** After the 10th question, the learner sees their score with coaching context and reflection tools.

**Requirements:**

- R2.1: Score screen shows numeric score (e.g. "8 / 10") with a contextual coaching message that varies by score band — not a grade, but an observation
- R2.2: Score screen includes a "What to review next" recommendation card
- R2.3: "Compare Perspectives" expandable section shows 4–5 key idea bullets for the topic and a plain-English model response
- R2.4: "One Reflection to Sit With" card contains a written reflection prompt specific to the session's topic
- R2.5: Learning Journal textarea allows the learner to write a free-text insight
- R2.6: "Save This Insight" saves the entry to `localStorage["kmr-journal"]` with the shape: `{ id, category, conceptId, topicTitle, prompt, text, date, savedAt }`
- R2.7: Confirmation message on save must use coaching language ("Every reflection you save becomes part of your professional growth") — not a generic "Saved!"
- R2.8: "Review Lesson" button navigates to the full post-drill review

**Acceptance criteria:**
- Saving a journal entry shows the confirmation message without page reload
- Journal entries appear on the dashboard `LearningJournal` section on next visit
- Score of 0/10 and 10/10 produce distinct, appropriately toned coaching messages

**Status:** Shipped

---

### F3 — Post-Drill Lesson Review

**Summary:** A full per-question review that the learner can walk through after completing a session.

**Requirements:**

- R3.1: Review shows all 10 questions in order
- R3.2: Each question shows all answer options with color coding: learner's correct answer (green), learner's wrong answer (red), correct answer if different from learner's selection (green)
- R3.3: Each incorrect option has an expandable coaching note explaining the misconception
- R3.4: A "Key Lesson Takeaways" block appears at the bottom of the review
- R3.5: The review is navigable without completing another drill

**Acceptance criteria:**
- Learner who answered 10/10 correctly sees all green; no red indicators
- Coaching notes for wrong answers are expandable and do not display by default (reduces visual noise)

**Status:** Shipped

---

### F4 — Progress Dashboard

**Summary:** A personal dashboard showing the learner's history, streak, accuracy, and Learning Journal.

**Requirements:**

- R4.1: Dashboard shows current streak (consecutive days with at least one completed drill)
- R4.2: Dashboard shows 4 summary stats: total drills, total questions answered, total correct, overall accuracy %
- R4.3: Session history list shows recent drills with date, topic, score, and accuracy bar
- R4.4: Learning Journal section shows all saved entries newest-first with date, topic label, and insight text
- R4.5: When journal entries span multiple topics, topic filter pills appear automatically
- R4.6: For signed-in users, stats are loaded from Supabase (`drill_sessions` table) server-side
- R4.7: For anonymous users, stats are loaded from `localStorage["kmr-progress"]` client-side
- R4.8: The UI handles both data sources transparently — no visible difference in layout between logged-in and anonymous views

**Acceptance criteria:**
- Streak increments by 1 on the next calendar day after a completed drill
- Streak resets to 1 (not 0) if a calendar day is skipped and then a drill is completed
- Completing a second drill on the same calendar day does not increment the streak
- Dashboard renders correctly for a brand-new user with zero sessions

**Status:** Shipped

---

### F5 — Authentication (Email Magic Link)

**Summary:** Optional account creation and sign-in via email magic link.

**Requirements:**

- R5.1: Any user can use the full app without an account — account creation is never required
- R5.2: Sign-in is via email magic link only (no password)
- R5.3: Magic link redirects to `/auth/callback` and completes sign-in client-side without user action beyond clicking the link
- R5.4: On sign-in, the nav updates immediately to show the user's email and a sign-out option
- R5.5: Sign-out clears the session and redirects to the homepage
- R5.6: If a user has anonymous localStorage progress when they sign in, a "Save your progress" prompt appears — merging is not automatic in v1.0 but is prompted

**Acceptance criteria:**
- Entering a valid email and clicking the magic link signs the user in within one browser action
- Signing out immediately removes the user email from the nav
- An anonymous user who signs in still has access to their localStorage-based drill history on the same device

**Status:** Shipped

---

### F6 — Instructor Analytics Dashboard

**Summary:** A protected analytics view for the administrator showing aggregate learner performance.

**Requirements:**

- R6.1: Dashboard is protected — accessible only to the user whose email matches the `ADMIN_EMAIL` environment variable
- R6.2: Non-admin signed-in users see an "Access Denied" page with their current email shown (diagnostic aid)
- R6.3: Unauthenticated users are redirected to `/auth/login`
- R6.4: Dashboard displays 9 metrics: Total Users, Active Today, Drills Completed, Average Score, 30-Day Active Rate, Average Improvement, Average Completion Time, Most Difficult Topics, Most Missed Questions
- R6.5: Metrics requiring Migration 002 (`drill_question_answers`) display gracefully if the migration has not been applied
- R6.6: Dashboard is read-only — no admin actions in v1.0

**Acceptance criteria:**
- Admin dashboard renders without errors using only Migration 001 data (5 core metrics visible, 4 advanced metrics show a "pending migration" notice)
- Admin dashboard renders fully with both migrations applied
- A non-admin signed-in user cannot access any admin data via direct URL navigation

**Status:** Shipped

---

## 6. Future Features

Features are grouped by phase and ordered by priority within each phase. Priority is based on user impact and strategic importance, not technical complexity.

### Phase 1 — Retention and Persistence (v1.1)

**P1-F1: Learning Journal — Supabase Sync** *(Priority: Critical)*

Persist journal entries to Supabase so they survive browser clears and are accessible across devices. This is the single most important near-term feature because journal entries are irreplaceable — losing them destroys a core value proposition.

- New table: `learning_journal` with columns matching the current localStorage entry shape
- On first sign-in, merge existing `localStorage["kmr-journal"]` entries to Supabase
- Read from Supabase for signed-in users; maintain localStorage fallback for anonymous users
- `conceptId` field already present in the entry shape — enables future mastery analytics

**P1-F2: Learning Journal — Milestone Acknowledgments** *(Priority: High)*

Quiet, non-intrusive celebrations at 25, 50, 100, and 250 journal entries. Framed around accumulated understanding, not gamification. Example: "You've captured 50 insights. That's 50 moments of real professional growth."

**P1-F3: Streak Visualization Improvement** *(Priority: High)*

The streak number is displayed but not viscerally felt. Add a simple calendar heatmap (GitHub-style) to the dashboard showing drill days over the past 90 days. This makes the compounding effect of consistency visible.

**P1-F4: Daily Digest Email** *(Priority: Medium)*

An opt-in morning email for signed-in users. Shows tomorrow's topic, current streak, and one recent journal entry. Earns its open rate by being genuinely useful, not a nudge. Must not be a streak-expiry anxiety message.

---

### Phase 2 — Depth and Differentiation (v1.2)

**P2-F1: Intermediate Question Bank** *(Priority: Critical)*

72+ intermediate questions across the 6 existing categories. Intermediate questions introduce variance, edge cases, and multi-step reasoning (e.g. "Given this partial trial balance, identify the error"). Requires a level selector in the drill UI.

**P2-F2: Advanced Question Bank** *(Priority: High)*

72+ advanced questions requiring professional judgment, scenario complexity, and multi-concept integration. Targeted at professionals with 2+ years of experience who want to stay sharp on edge cases.

**P2-F3: Level Selector UI** *(Priority: High)*

A simple level picker on the homepage or drill entry point: Beginner / Intermediate / Advanced. Defaults to Beginner for new users. Remembers the last selection.

**P2-F4: Adaptive Question Selection** *(Priority: Medium)*

Weight question selection toward categories and question types where the learner has historically underperformed. Use `drill_question_answers` data (already captured) to bias the selector. Not full spaced repetition in v1.2 — a weighted random approach is sufficient.

**P2-F5: Mastery Tracking per Concept** *(Priority: Medium)*

Use `conceptId` (already stored in journal entries and question metadata) to show per-topic mastery levels on the dashboard. A simple 3-level indicator (Needs Practice / Building / Strong) is enough for v1.2.

---

### Phase 3 — Institutional Layer (v1.3)

**P3-F1: Multi-Instructor Support** *(Priority: Critical for institutional tier)*

Replace the single `ADMIN_EMAIL` gate with a `user_roles` table supporting multiple admins and instructors. Each instructor can access the full analytics dashboard.

**P3-F2: Cohort Management** *(Priority: Critical for institutional tier)*

Instructors can create named cohorts (e.g. "Spring 2026 Cohort"), add learners by email, and view aggregate analytics filtered to that cohort. Analytics views identical to the current admin dashboard but scoped to cohort members.

**P3-F3: Curriculum Assignment** *(Priority: High for institutional tier)*

Instructors can set the active topic sequence for a cohort, overriding the default daily rotation. Enables instructors to align the drill topics with their course curriculum.

**P3-F4: Learner Progress Reports** *(Priority: Medium)*

Exportable per-learner progress summary (CSV or PDF). Shows drill count, accuracy by topic, streak history, and journal entry count. Useful for instructors evaluating learner engagement.

---

### Future Phases (post-v1.3, not yet scheduled)

| Feature | Rationale |
|---|---|
| Social OAuth (Google, Apple, Microsoft) | Reduces sign-in friction; current magic link is functional but slower than OAuth |
| PWA / offline drill capability | Serves Marcus persona who may want to practice without reliable connectivity |
| Content management admin UI | Add and edit questions, coaching notes, and topics without a code deploy |
| Certification prep tracks | Curated sequences aligned to QuickBooks ProAdvisor, NACPB, and Bookkeeper Launch |
| Public API | Allow third-party accounting educators to integrate Keep Me Ready drills |
| Expansion to adjacent domains | Tax preparation, payroll, accounts receivable — same daily-practice model |

---

## 7. User Flows

### Flow 1 — Anonymous Learner: First Visit to Drill Completion

```
1. User arrives at homepage (keep-me-ready.vercel.app)
   → Sees today's topic, streak = 0, "Start Today's Drill" CTA

2. User taps "Start Today's Drill"
   → Lesson Card loads for today's topic
   → Shows: topic title, lesson text, why it matters, common misconception, encouragement

3. User taps "Start Drill"
   → Phase transitions: lesson → answering
   → Question 1 of 10 renders

4. For each question (×10):
   a. User selects an answer option
   b. Answer revealed: correct option highlighted green, incorrect option(s) shown
   c. Coaching explanation displays below the question
   d. "Next" button advances to the next question
   e. After question 10: "See Results" button appears

5. User taps "See Results"
   → Session saved to localStorage["kmr-progress"]
   → Score screen renders: score, coaching message, "What to review next"

6. User optionally expands "Compare Perspectives"
   → Reads key idea bullets and model response

7. User optionally writes a journal insight and taps "Save This Insight"
   → Entry saved to localStorage["kmr-journal"]
   → Confirmation: "Added to your Learning Journal"

8. User taps "Review Lesson"
   → Lesson Review loads all 10 questions with per-option coaching

9. User sees "Save your progress" prompt to create an account
   → Can dismiss and continue anonymously
```

**Key decision points:**
- If user skips Lesson Card: drill starts immediately from question 1 (no gate)
- If user closes the tab mid-drill: progress is lost (acceptable for MVP; session autosave is a future feature)
- If user has already drilled today: "Start Another Drill" CTA available with same topic

---

### Flow 2 — Signed-In Learner: Dashboard Visit

```
1. User navigates to /dashboard
   → Server component fetches drill_sessions for this user from Supabase
   → DashboardView receives server-fetched data as props

2. Dashboard renders:
   a. StreakBadge — current streak with contextual message
   b. ProgressStats — 4 stat cards (drills, questions, correct, accuracy)
   c. SessionHistory — recent sessions list with accuracy bars
   d. LearningJournal — entries from localStorage, newest first

3. If user has journal entries spanning 2+ topics:
   → Topic filter pills appear above the journal list
   → User can tap a topic pill to filter entries

4. User taps "Start Today's Drill"
   → Navigates to /drill
   → Full anonymous flow (Flow 1) executes
   → On completion, session synced to Supabase via POST /api/scores
   → User returns to dashboard; stats reflect the new session
```

---

### Flow 3 — New User: Magic Link Sign-In

```
1. User navigates to /auth/login
   → Sees email input and "Send Magic Link" button
   (Google OAuth button visible but not active in v1.0)

2. User enters email and submits
   → LoginForm calls supabase.auth.signInWithOtp()
   → Confirmation message: "Check your email for a sign-in link"

3. User opens email and clicks the magic link
   → Browser navigates to Supabase verification endpoint
   → Supabase verifies token, redirects to /auth/callback#access_token=...

4. /auth/callback page loads (client component)
   → createBrowserClient detects hash token
   → onAuthStateChange fires with event "SIGNED_IN"
   → router.replace("/dashboard") executes

5. Dashboard loads for the newly signed-in user
   → NavUser updates: shows email + "Sign out"
   → Dashboard stats reflect zero sessions (first-time user empty state)
   → "Save your progress" prompt shown if localStorage contains prior anonymous sessions
```

**Edge cases:**
- Expired magic link: Supabase returns an error; callback page redirects to `/auth/login` with an error param
- User opens magic link in a different browser: auth completes in that browser; original browser remains anonymous

---

### Flow 4 — Instructor: Admin Dashboard

```
1. Instructor navigates to /admin
   → Server component calls supabase.auth.getUser() via server client
   → If no session: redirect to /auth/login

2. Server compares user.email to process.env.ADMIN_EMAIL
   → If no match: render "Access Denied" page showing the current email

3. If match:
   → Service role client fetches all drill_sessions and drill_question_answers
   → TypeScript computes 9 metrics
   → InstructorDashboard renders:
      Row 1: 5 stat cards (Users, Active Today, Drills, Avg Score, 30-Day Active)
      Row 2: Improvement card + Completion Time card
      Row 3: Weekly trend bar chart (last 8 weeks of drill counts)
      Row 4: Most Difficult Topics + Most Missed Questions panels

4. If Migration 002 not yet applied:
   → Amber warning banner explains which metrics are inactive
   → Core metrics (rows 1–2) render normally
   → Rows 3–4 show "Requires migration 002" placeholder
```

---

### Flow 5 — Anonymous to Signed-In: Progress Continuity (v1.1 behavior)

```
1. Anonymous user has completed 15 drills; localStorage has:
   - kmr-progress: 15 sessions with scores and dates
   - kmr-journal: 8 Learning Journal entries

2. User creates an account and signs in for the first time
   → "Save your progress" prompt appears with CTA: "Sync my progress"

3. User taps "Sync my progress"
   → App reads all localStorage sessions and posts them to POST /api/scores in batch
   → App reads all localStorage journal entries and posts them to new /api/journal endpoint
   → localStorage data cleared (to avoid duplication on re-read)

4. Dashboard reloads with merged Supabase data
   → Streak computed from merged session dates
   → Journal entries show all 8 prior entries plus any future entries
```

*Note: Flow 5 is a v1.1 requirement. In v1.0, the "Save your progress" prompt exists but the merge step is manual — the user is directed to sign in; their anonymous progress is not automatically merged.*

---

## 8. Success Metrics

### Primary metrics (north star)

| Metric | Definition | Target (30 days post-launch) | Target (90 days) |
|---|---|---|---|
| **Day-2 retention** | % of new signed-in users who return the next day | > 40% | > 45% |
| **30-day daily active rate** | % of signed-in users active on any given day within their first 30 days | > 25% | > 30% |
| **Drill completion rate** | % of started drill sessions that reach the score screen | > 85% | > 88% |

### Engagement depth metrics

| Metric | Definition | Target |
|---|---|---|
| **Journal adoption rate** | % of users who have saved at least one journal entry | > 30% within first 5 sessions |
| **Avg journal entries per active user** | Mean entries among users who have written at least one | > 5 at 30 days, > 15 at 90 days |
| **Compare Perspectives open rate** | % of score screens where "Compare Perspectives" is expanded | > 50% |
| **Post-drill review rate** | % of completed sessions where "Review Lesson" is tapped | > 30% |

### Learning outcome metrics

| Metric | Definition | Target |
|---|---|---|
| **Accuracy delta (60-day)** | Avg accuracy in sessions 1–5 vs. sessions 11–15 for users with ≥15 sessions | +8 percentage points |
| **Streak consistency** | % of signed-in users with a streak ≥ 7 days at day 14 | > 20% |
| **Session cadence** | % of users who complete a drill on 4 or more days per week | > 25% among users active at day 14 |

### Instrumentation requirements

To track these metrics, the following data must be available:

- `drill_sessions.started_at` and `drill_sessions.completed_at` — captures completion time and drill start (already stored via Migration 002)
- `drill_question_answers` — enables per-question and per-topic accuracy tracking (already stored via Migration 002)
- Journal entry count per user — requires Learning Journal Supabase sync (v1.1)
- Score screen interaction events (Compare Perspectives expand, Review Lesson tap) — requires lightweight event tracking in v1.1; browser console logging is acceptable for v1.0

### Qualitative signals (not instrumented, but monitored)

- User emails or social posts referencing the product helping with an interview or client engagement
- Unsolicited feature requests in community forums (signal of active engaged users)
- Instructor or program director inquiries about the admin/cohort tier

---

## 9. Technical Assumptions

These are the constraints and decisions the product is built around. Changing any of them has architectural implications documented in the [Technical Blueprint v1](Keep%20Me%20Ready%20Founder%20Technical%20Blueprint%20v1.md).

### A1 — Static question bank, not dynamic

All questions are stored in JSON files in `data/questions/`. Questions are loaded at build time. There is no CMS or database-backed question management in v1.0.

**Implication for product:** Adding or editing questions requires a code deploy. Question IDs must be stable (`question_id` in `drill_question_answers` references these IDs). Deleting a question that has been answered by users will leave orphaned `question_id` references.

**Future change required:** A content management admin UI (post-v1.3) will need to migrate questions to a database table while preserving the existing `question_id` references.

---

### A2 — LocalStorage for anonymous users, Supabase for signed-in users

Anonymous progress is stored client-side in `localStorage`. Signed-in progress is stored in Supabase. There is no automatic merge in v1.0.

**Implication for product:** Anonymous users who clear their browser data or switch devices lose all progress. The "Save your progress" merge flow (v1.1) is a mitigation, not a solution — users must actively choose to merge before clearing data.

**Future change required:** Batch upload of localStorage data to Supabase on first sign-in (v1.1, detailed in Flow 5).

---

### A3 — Single admin via environment variable

Admin access is controlled by the `ADMIN_EMAIL` environment variable. There is no roles table. Only one admin email is supported per deployment.

**Implication for product:** Adding a second administrator requires a new deployment with a different env var. Sharing admin access requires sharing credentials, which is a security risk.

**Future change required:** `user_roles` table with admin/instructor roles (Phase 3, P3-F1).

---

### A4 — Magic link auth only (no OAuth in v1.0)

Authentication uses Supabase email magic links with implicit flow. Google, Apple, and Microsoft OAuth are wired in the UI (`LoginForm.tsx`) but inactive — the OAuth buttons are present but non-functional in v1.0.

**Implication for product:** Users who lose access to their email cannot recover their account. Users who dislike magic links (they can land in spam) may abandon sign-in. The friction is slightly higher than OAuth.

**Future change required:** Enable OAuth providers in Supabase Auth settings and activate the existing UI buttons (medium-term, no structural changes needed).

---

### A5 — Daily topic rotation is deterministic and global

All users see the same topic on any given calendar date. The rotation formula is `dayOfYear % 6` mapping to one of 6 topic categories.

**Implication for product:** Topic personalization (user selects their own category) is not possible without overriding this formula. The determinism is also a feature — it creates a shared daily experience and simplifies the question selection logic.

**Future change required:** Level selector (v1.2) will introduce a per-user preference that may interact with the daily rotation. Implementation must preserve determinism within a given level.

---

### A6 — No test suite

The v1.0 codebase has no automated tests. All testing is manual.

**Implication for product:** Regressions are possible on any deploy. Confidence in releases depends on the discipline of manual smoke testing (defined in the deployment checklist in the Technical Blueprint).

**Future change required:** Vitest unit tests for critical logic (question selector, streak computation, score calculation) and Playwright end-to-end tests for the full drill flow are recommended before the v1.2 deploy.

---

### A7 — No error monitoring

There is no Sentry, Datadog, or equivalent. Server errors surface only in Vercel function logs.

**Implication for product:** Silent failures (failed Supabase writes, broken API routes) will not alert anyone. Users experiencing errors may churn without the team knowing.

**Future change required:** Add Sentry (or equivalent) before the v1.1 release, which introduces new database writes that must be reliable.

---

## 10. Release Plan

### v1.0 — MVP (Shipped: June 2026)

**Theme:** Prove the drill loop.

| Feature | Status |
|---|---|
| Daily drill engine (10 questions, 3 types, 6 topics, lesson card) | Shipped |
| Per-answer coaching explanations with per-option coaching notes | Shipped |
| Post-drill lesson review (all 10 questions with coaching) | Shipped |
| Score screen with Compare Perspectives and reflection prompt | Shipped |
| Learning Journal (localStorage) | Shipped |
| Dashboard: streak, stats, session history, journal view | Shipped |
| Anonymous play (localStorage-backed, no account required) | Shipped |
| Magic link authentication | Shipped |
| Signed-in progress sync to Supabase | Shipped |
| Instructor analytics dashboard (9 metrics) | Shipped |
| Mobile-first responsive layout, accessible tap targets | Shipped |
| Dark mode heading and input contrast | Shipped |

**Known gaps going into v1.1:**
- Learning Journal is localStorage-only (cross-device risk)
- Anonymous → signed-in progress merge not automatic
- No error monitoring
- No test suite

---

### v1.1 — Retention and Persistence (Target: Q3 2026)

**Theme:** Make what exists trustworthy and sticky.

| Feature | Priority | Notes |
|---|---|---|
| Learning Journal — Supabase sync | Critical | New `learning_journal` table + merge-on-first-sign-in flow |
| Learning Journal — milestone acknowledgments | High | At 25, 50, 100, 250 entries |
| Streak calendar heatmap | High | 90-day grid on dashboard |
| Opt-in daily digest email | Medium | Triggered via Supabase Edge Functions or external email provider |
| Anonymous → signed-in progress merge (batch) | High | Executes once on first sign-in |
| Sentry error monitoring | High | Add before v1.1 deploy |
| Vitest unit tests for selector, streak, score logic | Medium | Reduces regression risk for v1.2+ |

**Exit criteria for v1.1:**
- Journal entries survive a browser data clear for signed-in users
- Day-2 retention ≥ 35% for signed-in users

---

### v1.2 — Depth and Differentiation (Target: Q4 2026)

**Theme:** Serve the full range of bookkeeping professionals.

| Feature | Priority | Notes |
|---|---|---|
| Intermediate question bank (72+ questions) | Critical | All 6 categories, per-option coaching notes required |
| Level selector UI | Critical | Defaults to Beginner; persists preference |
| Advanced question bank (72+ questions) | High | Professional judgment and multi-concept scenarios |
| Adaptive question selection (weighted random) | Medium | Based on `drill_question_answers` accuracy data |
| Mastery tracking per concept (3-level indicator) | Medium | Uses `conceptId` already stored in entry shape |
| Playwright end-to-end tests for drill flow | Medium | Reduces manual testing burden |

**Exit criteria for v1.2:**
- All three question banks populated with ≥72 questions each, all questions reviewed for coaching quality
- Level selector works without breaking deterministic topic rotation
- Accuracy delta (60-day) metric measurable from real user data

---

### v1.3 — Institutional Layer (Target: Q1 2027)

**Theme:** Enable the instructor/program director use case.

| Feature | Priority | Notes |
|---|---|---|
| Multi-instructor support (`user_roles` table) | Critical | Replace `ADMIN_EMAIL` env var |
| Cohort management UI | Critical | Create/manage cohorts, add learners |
| Cohort-scoped analytics | Critical | Existing admin dashboard filtered by cohort |
| Curriculum assignment | High | Override daily topic rotation per cohort |
| Learner progress report export (CSV) | Medium | Per-learner summary exportable by instructor |

**Exit criteria for v1.3:**
- At least one pilot institution (certification program or accounting firm) running an active cohort
- Cohort analytics shows data for ≥10 learners with ≥30 drills each

---

## 11. Risks

### R1 — Learning Journal data loss (Likelihood: High | Impact: Critical)

**Description:** Journal entries currently live in `localStorage`. If a signed-in user clears browser data, switches devices, or switches browsers, all journal entries are permanently lost. This is the most likely cause of serious user disappointment in v1.0.

**Current mitigation:** "Save your progress" prompt at the end of each drill reminds users to create an account — but account creation does not currently sync journal entries.

**Required mitigation (v1.1):** Supabase sync for journal entries. This is the top v1.1 priority.

**Monitoring:** Add a "journal entries lost" user report category to any feedback mechanism. Track journal entry counts per user in admin analytics.

---

### R2 — Magic link deliverability (Likelihood: Medium | Impact: High)

**Description:** Magic link emails can land in spam, especially for users on strict corporate email filters. A failed magic link is a complete sign-in blocker — the user has no password fallback. This creates a conversion bottleneck at the highest-intent moment (when a user has decided to create an account).

**Current mitigation:** Supabase's email deliverability infrastructure is reliable for most consumer email providers. The sign-in page sets expectations ("Check your email — it may take a moment").

**Required mitigation (medium-term):** Enable Google OAuth and Apple Sign-In as alternative paths. The UI already has the buttons; they need to be activated in Supabase Auth settings.

**Monitoring:** Track sign-in initiation vs. sign-in completion conversion. A ratio below 60% suggests deliverability issues.

---

### R3 — Question quality decay (Likelihood: Medium | Impact: High)

**Description:** The coaching layer (per-answer explanations and per-option coaching notes) is the primary differentiator from flashcard apps. If questions are added without the same level of coaching depth — in intermediate and advanced banks, or in future content additions — the product's educational value degrades silently.

**Current mitigation:** All 72 beginner questions have been written with this standard. The question shape (`explanation`, `optionExplanations`) enforces the structure at the type level.

**Required mitigation (v1.2):** A content review checklist for all new questions before they are added to the bank. At minimum: is the explanation coaching-toned? Does every incorrect option have a non-empty coaching note? Does the scenario feel professionally realistic?

**Monitoring:** Admin "Most Missed Questions" panel can surface questions with anomalously high miss rates — a signal that a question may be ambiguously worded.

---

### R4 — Streak anxiety (Likelihood: Medium | Impact: Medium)

**Description:** Streak mechanics, if not carefully designed, can flip from motivating to anxiety-producing. A user who misses one day and loses a 45-day streak may stop using the product entirely. This is a well-documented failure mode in habit-forming apps.

**Current mitigation:** Streaks reset to 1 (not 0) on return after a missed day, softening the loss. Score screen and coaching language explicitly does not shame low scores or breaks.

**Required mitigation (v1.1):** Streak protection feature (1 free "grace day" per 30-day period) before the streak calendar heatmap ships — the heatmap makes gaps visible, which increases the risk of discouragement.

**Monitoring:** Track session frequency distribution. If weekly session counts show a spike on day 1 after a gap (users restarting) and a high churn rate following that, streak anxiety is likely.

---

### R5 — Admin dashboard performance at scale (Likelihood: Low | Impact: Medium)

**Description:** The admin dashboard fetches all `drill_sessions` and `drill_question_answers` rows via the service role client on every page load, with no caching or pagination. At low user volumes this is fine. At tens of thousands of users with daily drill completions, this query will become slow or fail.

**Current mitigation:** Acceptable at current scale. The dashboard is accessed infrequently (by a single admin user).

**Required mitigation (pre-scale):** Introduce materialized views or Supabase Edge Functions that pre-aggregate analytics on a schedule (e.g. hourly). Alternatively, add pagination and date-range filtering to the dashboard queries. This should be addressed before the v1.3 institutional launch, which will significantly increase data volume.

**Monitoring:** Track admin dashboard page load time in Vercel function logs. Alert if it exceeds 5 seconds.

---

### R6 — Scope creep diluting the core experience (Likelihood: Medium | Impact: High)

**Description:** The product's strength is its focused simplicity. As feature requests accumulate — social features, leaderboards, AI-generated questions, gamification mechanics — each individually reasonable addition can collectively erode the coaching-not-assessment identity of the product.

**Current mitigation:** The "What We Will Not Do" section of the Founder Vision defines explicit constraints. This PRD's non-goals section reinforces them.

**Required mitigation (ongoing):** Every new feature proposal must be evaluated against the product principles in Section 4 of the Founder Vision. The default answer to new feature requests is "no, unless it demonstrably serves the existing personas without compromising the coaching identity."

---

*Keep Me Ready — Practice makes permanent.*
