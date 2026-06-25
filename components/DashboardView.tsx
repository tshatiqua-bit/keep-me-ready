"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { loadProgress, getAccuracyPct } from "@/lib/utils/progress";
import StreakBadge from "@/components/dashboard/StreakBadge";
import ProgressStats from "@/components/dashboard/ProgressStats";
import SessionHistory from "@/components/dashboard/SessionHistory";
import type { SessionRow } from "@/components/dashboard/SessionHistory";

export interface DbDashboardData {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number | null;
  currentStreak: number;
  drillsCompleted: number;
  sessions: SessionRow[];
}

interface Props {
  user: User | null;
  dbData: DbDashboardData | null;
}

export default function DashboardView({ user, dbData }: Props) {
  const [localData, setLocalData] = useState<DbDashboardData | null>(null);

  useEffect(() => {
    if (user) return; // logged-in path uses server data
    const p = loadProgress();
    setLocalData({
      totalAnswered: p.totalAnswered,
      totalCorrect: p.totalCorrect,
      accuracy: getAccuracyPct(p),
      currentStreak: p.currentStreak,
      drillsCompleted: p.sessions.length,
      sessions: p.sessions.map((s) => ({
        id: s.id,
        date: s.date,
        score: s.score,
        total: s.total || 10,
      })),
    });
  }, [user]);

  // Server-rendered data for logged-in users is available immediately
  const data = user ? dbData : localData;

  if (!data) {
    // Brief loading state for anonymous users
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-400 mb-8">Your Progress</h1>
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-slate-100 rounded-2xl" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-xl" />
            ))}
          </div>
          <div className="h-48 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-400">Your Progress</h1>
        {!user && (
          <Link
            href="/auth/login"
            className="text-sm text-indigo-600 hover:underline font-medium"
          >
            Sign in to sync →
          </Link>
        )}
      </div>

      <StreakBadge streak={data.currentStreak} />

      <ProgressStats
        drillsCompleted={data.drillsCompleted}
        totalAnswered={data.totalAnswered}
        totalCorrect={data.totalCorrect}
        accuracy={data.accuracy}
      />

      <SessionHistory sessions={data.sessions} />

      {data.drillsCompleted > 0 && (
        <div className="mt-6 text-center">
          <Link
            href="/drill"
            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            Start Today&apos;s Drill
          </Link>
        </div>
      )}
    </div>
  );
}
