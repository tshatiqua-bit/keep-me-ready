"use client";

import { useState, useEffect } from "react";

interface JournalEntry {
  id: string;
  category: string;
  conceptId: string;
  topicTitle: string;
  prompt: string;
  text: string;
  date: string;
  savedAt: string;
}

const TOPIC_LABELS: Record<string, string> = {
  debits_credits: "Debits & Credits",
  accounts: "Chart of Accounts",
  financial_statements: "Financial Statements",
  journal_entries: "Journal Entries",
  bank_reconciliation: "Bank Reconciliation",
  payroll: "Payroll",
};

// Milestone thresholds for future celebration moments (25, 50, 100…).
// When ready, check `entries.length` against these after a save and render
// a milestone card above the journal entries.
// const MILESTONES = [25, 50, 100, 250, 500];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
        active
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
      }`}
    >
      {label}
    </button>
  );
}

export default function LearningJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("kmr-journal") ?? "[]"
      ) as JournalEntry[];
      // Newest first
      setEntries([...stored].reverse());
    } catch {
      setEntries([]);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  if (entries.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-800 dark:text-slate-300 mb-1">
          Learning Journal
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Your saved insights from each drill
        </p>
        <p className="text-sm text-slate-400 text-center py-6 leading-6">
          No insights saved yet.
          <br />
          After a drill, tap{" "}
          <span className="text-slate-500 font-medium">Compare Perspectives</span>{" "}
          to reflect and save your first insight.
        </p>
      </div>
    );
  }

  const topicsPresent = Array.from(new Set(entries.map((e) => e.category)));
  const filtered =
    filter === "all" ? entries : entries.filter((e) => e.category === filter);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-semibold text-slate-800 dark:text-slate-300">
          Learning Journal
        </h2>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-full px-2.5 py-0.5">
          {entries.length} {entries.length === 1 ? "insight" : "insights"}
        </span>
      </div>
      <p className="text-xs text-slate-400 mb-5">
        Your saved insights from each drill
      </p>

      {/* Topic filter — only shown when entries span more than one topic */}
      {topicsPresent.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <FilterPill
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {topicsPresent.map((cat) => (
            <FilterPill
              key={cat}
              label={TOPIC_LABELS[cat] ?? cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            />
          ))}
        </div>
      )}

      {/* Entries */}
      <div className="space-y-5">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="border-l-2 border-indigo-200 pl-4"
          >
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1.5">
              <span className="text-xs text-slate-400">
                {formatDate(entry.savedAt)}
              </span>
              <span className="text-slate-200 text-xs" aria-hidden="true">
                ·
              </span>
              <span className="text-xs font-medium text-indigo-600">
                {TOPIC_LABELS[entry.category] ?? entry.topicTitle}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-6">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
