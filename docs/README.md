# Keep Me Ready Documentation

## Purpose

This folder is the institutional memory of the Keep Me Ready project.

It exists so that any developer, collaborator, or AI assistant can open this repository, read through these documents in order, and arrive at a complete understanding of what the product is, why it was built, what has been shipped, and how every part of it works — without needing to ask anyone.

Documentation here is treated as a first-class artifact. It is written before features are built, kept synchronized with the application as it evolves, and structured so that a new contributor can go from zero context to productive in a single reading session.

---

## Reading Order

Work through these documents in sequence. Each one builds on the last.

| # | Document | Location | Purpose |
|---|---|---|---|
| 1 | **Founder Vision v1** | `founder/` | Why this product exists, who it is for, and what it will become. Read this first — it is the lens through which every other decision should be understood. |
| 2 | **Product Requirements Document (PRD) v1** | `founder/` | What gets built, when, and why. Personas, feature specs with acceptance criteria, user flows, success metrics, release plan, and risks. |
| 3 | **Founder Technical Blueprint v1** | `founder/` | How the current application is built. Architecture, file structure, component responsibilities, database schema, auth flow, deployment process, and known limitations. |
| 4 | **Developer Onboarding Guide v1** | `engineering/Keep Me Ready Developer Onboarding Guide v1.md` | Prerequisites, cloning, Supabase setup, running migrations, smoke-test checklist, project orientation, Next.js 16 breaking changes, and 7 common issues with fixes. |
| 5 | **AI Context Book v1** | `engineering/Keep Me Ready AI Context Book v1.md` | Dense reference for AI coding assistants: 12 non-obvious constraints, full file inventory, exact TypeScript types, data model, component props, API routes, 8 code patterns to copy, product rules, and copy/tone guidelines. |
| 6 | **Architecture** | `architecture/` | *(Coming soon)* Diagrams and written explanations of system architecture, data flow, component boundaries, and integration points. |
| 7 | **Engineering** | `engineering/` | *(Coming soon)* Coding standards, testing strategy, PR process, deployment checklist, and patterns used across the codebase. |
| 8 | **Database** | `database/` | *(Coming soon)* Schema reference, migration history, RLS policy explanations, and query patterns. |
| 9 | **Brand** | `brand/` | *(Coming soon)* Voice and tone guidelines, copy principles, and visual identity rules. |
| 10 | **Roadmap** | `roadmap/` | *(Coming soon)* Living document tracking what is planned, in progress, and recently shipped across all product phases. |

---

## Folder Structure

```
docs/
│
├── README.md                          ← You are here
│
├── founder/                           ← Strategy and product definition
│   ├── Keep Me Ready Founder Vision v1.md
│   ├── Keep Me Ready Founder Vision v1.html
│   ├── Keep Me Ready Founder Vision v1.pdf
│   ├── Keep Me Ready PRD v1.md
│   ├── Keep Me Ready PRD v1.html
│   ├── Keep Me Ready PRD v1.pdf
│   ├── Keep Me Ready Founder Technical Blueprint v1.md
│   ├── Keep Me Ready Founder Technical Blueprint v1.html
│   └── Keep Me Ready Founder Technical Blueprint v1.pdf
│
├── engineering/                       ← Developer guides and standards
│   ├── Keep Me Ready Developer Onboarding Guide v1.md
│   ├── Keep Me Ready Developer Onboarding Guide v1.html
│   ├── Keep Me Ready Developer Onboarding Guide v1.pdf
│   ├── Keep Me Ready AI Context Book v1.md
│   ├── Keep Me Ready AI Context Book v1.html
│   ├── Keep Me Ready AI Context Book v1.pdf
│   └── (Engineering Standards — coming soon)
│
├── architecture/                      ← System design and diagrams
│   └── (Architecture Decision Records, system diagrams — coming soon)
│
├── database/                          ← Schema, migrations, query patterns
│   └── (Schema reference, migration history — coming soon)
│
├── brand/                             ← Voice, tone, and visual identity
│   └── (Copy guidelines, brand rules — coming soon)
│
└── roadmap/                           ← Living product roadmap
    └── (Phase tracking, release notes — coming soon)
```

---

## How New Contributors Should Start

**Before writing a single line of code**, every new contributor — human or AI — should read the three documents in `founder/` in this order:

1. **Founder Vision v1** — understand the problem, the people it serves, the product philosophy, and the things the product will never do. This takes approximately 15 minutes and will prevent dozens of wrong decisions later.

2. **Product Requirements Document v1** — understand exactly what has been built (v1.0), what is planned and why (v1.1–v1.3), the acceptance criteria for each feature, the success metrics, and the known risks. This is the source of truth for prioritisation.

3. **Founder Technical Blueprint v1** — understand the current codebase: every file, every component, the database schema, the auth flow, the deployment process, and the known limitations. This is the source of truth for how things work today.

Only after reading all three should you open a code file.

**AI assistants** should also read the AI Context Book (`engineering/`) before making any changes — it documents 12 non-obvious constraints specific to this codebase (Next.js 16 breaking changes, localStorage key formats, Supabase client rules, and more) that are not derivable from the code alone.

This is not bureaucracy. These documents exist precisely so that contributors can move faster and with more confidence, because the context that usually lives only in someone's head has been written down.

---

## Documentation Philosophy

**Document before building.**
When a new feature or change is significant, update or create the relevant document before writing the code. This forces clarity of intent and makes the implementation faster, not slower.

**Preserve institutional knowledge.**
Decisions, trade-offs, and the reasoning behind them should be written down here, not left in Slack threads, commit messages, or someone's memory. When a contributor asks "why does it work this way?", the answer should be findable in this folder.

**Keep documents synchronized with the application.**
A document that describes how the app worked six months ago is worse than no document — it misleads. When code changes, the relevant document must change with it. Treat documentation drift the same way you treat a failing test: as a problem that needs to be fixed before the work is done.

---

*Keep Me Ready — Practice makes permanent.*
