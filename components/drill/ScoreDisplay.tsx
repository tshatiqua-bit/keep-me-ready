"use client";

import { useState } from "react";
import Link from "next/link";
import SaveProgressPrompt from "@/components/SaveProgressPrompt";
import type { Topic } from "@/lib/questions/topics";

interface ScoreDisplayProps {
  score: number;
  total: number;
  topic: Topic;
  onRestart: () => void;
  onReview: () => void;
}

interface JournalEntry {
  id: string;
  category: string;
  topicTitle: string;
  prompt: string;
  text: string;
  date: string;
  savedAt: string;
  conceptId: string;
}

function getMessage(score: number, total: number): { heading: string; body: string } {
  const pct = score / total;
  if (pct === 1)
    return {
      heading: "Every repetition strengthens the pathway.",
      body: "Today was a perfect one. That kind of clarity comes from showing up consistently.",
    };
  if (pct >= 0.8)
    return {
      heading: "Understanding is growing.",
      body: "A score like this means the concepts are landing. Keep the daily habit going.",
    };
  if (pct >= 0.5)
    return {
      heading: "Progress comes from practice, not perfection.",
      body: "Today's effort counts. Each session makes the next one a little easier.",
    };
  return {
    heading: "Today's effort matters more than today's score.",
    body: "Understanding grows even when it doesn't feel like it. Come back tomorrow — it will click.",
  };
}

export default function ScoreDisplay({ score, total, topic, onRestart, onReview }: ScoreDisplayProps) {
  const { heading, body } = getMessage(score, total);
  const pct = Math.round((score / total) * 100);
  const [expanded, setExpanded] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [saved, setSaved] = useState(false);

  function saveToJournal() {
    if (!journalText.trim() || saved) return;
    const entry: JournalEntry = {
      id: `${topic.category}-${Date.now()}`,
      category: topic.category,
      conceptId: topic.category,
      topicTitle: topic.title,
      prompt: topic.reflectionPrompt,
      text: journalText.trim(),
      date: new Date().toISOString().slice(0, 10),
      savedAt: new Date().toISOString(),
    };
    try {
      const existing: JournalEntry[] = JSON.parse(
        localStorage.getItem("kmr-journal") ?? "[]"
      );
      localStorage.setItem("kmr-journal", JSON.stringify([...existing, entry]));
      setSaved(true);
    } catch {
      // localStorage unavailable (private browsing, storage full, etc.)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-6 sm:py-10" aria-label="Drill results" role="region">
      <div className="text-center mb-7 sm:mb-10">
        <div
          className="text-6xl font-bold text-indigo-600 mb-2"
          aria-label={`Score: ${score} out of ${total}`}
        >
          {score}
          <span className="text-3xl text-slate-400" aria-hidden="true">
            /{total}
          </span>
        </div>
        <div className="text-sm font-medium text-slate-400 mb-6">{pct}% correct</div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-300 mb-3 leading-snug">{heading}</h2>
        <p className="text-slate-500 leading-7">{body}</p>
      </div>

      <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl px-4 py-4 sm:px-5 sm:py-5 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-2">
          What to review next
        </p>
        <p className="text-sm text-indigo-900 leading-6">{topic.reviewNext}</p>
      </div>

      {/* Reflection card */}
      <div className="border-l-4 border-slate-300 bg-slate-50 rounded-r-xl px-4 py-4 sm:px-5 sm:py-5 mb-7 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          One reflection to sit with
        </p>
        <p className="text-sm text-slate-700 leading-7 mb-4">{topic.reflectionPrompt}</p>

        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-600 border border-slate-300 bg-white rounded-lg px-4 py-2.5 hover:border-slate-400 hover:text-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            ▾
          </span>
          {expanded ? "Hide" : "Compare Perspectives"}
        </button>

        {expanded && (
          <div className="mt-5 space-y-5">
            {/* Key ideas */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                A strong response might include…
              </p>
              <ul className="space-y-2">
                {topic.reflectionBullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-slate-700 leading-6">
                    <span className="text-slate-400 shrink-0 mt-0.5" aria-hidden="true">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200" />

            {/* Model response */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                One way to put it
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
                <p className="text-sm text-indigo-900 leading-6">
                  {topic.reflectionModelResponse}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200" />

            {/* Learning Journal prompt */}
            <div>
              <p className="text-sm font-medium text-slate-700 mb-0.5">
                After reading this, what would you add or change about your original thinking?
              </p>
              <p className="text-xs text-slate-400 mb-3">
                Optional — saved to your Learning Journal
              </p>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Jot down your thoughts — there's no right or wrong answer…"
                rows={3}
                disabled={saved}
                className="w-full text-sm text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none disabled:opacity-60 disabled:bg-slate-50"
                aria-label="Learning Journal entry"
              />
              {journalText.trim() && !saved && (
                <button
                  onClick={saveToJournal}
                  className="mt-2 w-full text-sm font-medium text-indigo-700 border border-indigo-300 bg-white rounded-lg px-4 py-2.5 hover:bg-indigo-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  Save to Learning Journal
                </button>
              )}
              {saved && (
                <p className="mt-2 text-center text-sm text-green-700 font-medium">
                  Saved to your Learning Journal
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onReview}
          className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
        >
          Review Lesson
        </button>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRestart}
            className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 text-center"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      <SaveProgressPrompt />
    </div>
  );
}
