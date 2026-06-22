"use client";

import { useState, useEffect } from "react";
import { loadProgress, getAccuracyPct } from "@/lib/utils/progress";
import type { UserProgress } from "@/types";

export default function HomeStats() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const streak = progress?.currentStreak ?? null;
  const answered = progress?.totalAnswered ?? null;
  const accuracy = progress ? getAccuracyPct(progress) : null;

  const stats = [
    {
      label: "Questions answered",
      value: answered === null ? "—" : answered.toLocaleString(),
    },
    {
      label: "Current streak",
      value:
        streak === null
          ? "—"
          : streak === 0
          ? "0 days"
          : `${streak} ${streak === 1 ? "day" : "days"}`,
    },
    {
      label: "Overall accuracy",
      value: accuracy === null ? "—" : `${accuracy}%`,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
      {stats.map(({ label, value }) => (
        <div key={label} className="bg-white border border-slate-200 rounded-xl p-3 sm:p-5">
          <p className="text-lg sm:text-2xl font-bold text-indigo-600 tabular-nums">{value}</p>
          <p className="text-xs text-slate-500 mt-1 leading-tight">{label}</p>
        </div>
      ))}
    </div>
  );
}
