import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import InstructorDashboard from "@/components/admin/InstructorDashboard";
import type { DashboardData } from "@/components/admin/InstructorDashboard";
import questionBank from "@/data/questions/beginner.json";

const CATEGORY_LABELS: Record<string, string> = {
  debits_credits: "Debits & Credits",
  accounts: "Accounts",
  financial_statements: "Financial Statements",
  journal_entries: "Journal Entries",
  bank_reconciliation: "Bank Reconciliation",
  payroll: "Payroll",
};

type SessionRow = {
  user_id: string;
  date: string;
  score: number;
  total: number;
  completed_at: string;
  category?: string | null;
  started_at?: string | null;
};

type AnswerRow = {
  question_id: string;
  category: string;
  was_correct: boolean;
};

function getWeekStart(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function formatWeekLabel(isoDate: string): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function AdminPage() {
  // Auth: verify session user
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in → send to login page
  if (!user) {
    redirect("/auth/login");
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  // Env var missing or email mismatch → show a clear error (never leak adminEmail value)
  if (!adminEmail || user.email !== adminEmail) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Access Denied
        </p>
        <h1 className="text-xl font-bold text-slate-900 mb-3">
          Not an administrator
        </h1>
        <p className="text-sm text-slate-500 mb-2">
          You are signed in as{" "}
          <strong className="text-slate-700">{user.email}</strong>.
        </p>
        <p className="text-sm text-slate-500">
          {!adminEmail
            ? "The ADMIN_EMAIL environment variable is not set on this deployment."
            : "This account does not match the configured admin email."}
        </p>
      </div>
    );
  }

  // Admin client bypasses RLS for cross-user analytics
  const admin = createAdminClient();

  // ── Total users ──────────────────────────────────────────────────────────
  let totalUsers = 0;
  try {
    const { data: authData } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    totalUsers = authData?.users?.length ?? 0;
  } catch {
    // Fallback: count distinct user_ids from sessions
  }

  // ── All sessions ─────────────────────────────────────────────────────────
  const { data: rawSessions } = await admin
    .from("drill_sessions")
    .select("user_id, date, score, total, completed_at, category, started_at")
    .order("completed_at", { ascending: true });

  const sessions: SessionRow[] = rawSessions ?? [];
  const today = new Date().toISOString().slice(0, 10);

  // Fallback totalUsers from sessions if auth list failed
  if (totalUsers === 0 && sessions.length > 0) {
    totalUsers = new Set(sessions.map((s) => s.user_id)).size;
  }

  // Active today
  const activeTodayUsers = new Set(
    sessions.filter((s) => s.date === today).map((s) => s.user_id)
  );
  const activeToday = activeTodayUsers.size;

  // Drills completed
  const drillsCompleted = sessions.length;

  // Average score
  const avgScore =
    sessions.length > 0
      ? Math.round(
          (sessions.reduce((sum, s) => sum + s.score / s.total, 0) /
            sessions.length) *
            100
        )
      : 0;

  // 30-day completion rate: users active in last 30 days / total users
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10);
  const activeInLast30 = new Set(
    sessions
      .filter((s) => s.date >= thirtyDaysAgoStr)
      .map((s) => s.user_id)
  ).size;
  const completionRate =
    totalUsers > 0 ? Math.round((activeInLast30 / totalUsers) * 100) : 0;

  // ── Average improvement over time ────────────────────────────────────────
  const byUser: Record<string, SessionRow[]> = {};
  for (const s of sessions) {
    (byUser[s.user_id] ??= []).push(s);
  }

  const improvements: number[] = [];
  for (const userSessions of Object.values(byUser)) {
    if (userSessions.length < 4) continue;
    const sorted = userSessions.sort((a, b) =>
      a.completed_at.localeCompare(b.completed_at)
    );
    const half = Math.floor(sorted.length / 2);
    const firstAvg =
      sorted.slice(0, half).reduce((s, r) => s + r.score / r.total, 0) / half;
    const secondAvg =
      sorted.slice(-half).reduce((s, r) => s + r.score / r.total, 0) / half;
    improvements.push((secondAvg - firstAvg) * 100);
  }
  const avgImprovement =
    improvements.length > 0
      ? Math.round(
          (improvements.reduce((a, b) => a + b, 0) / improvements.length) * 10
        ) / 10
      : null;

  // ── Weekly trend (last 8 weeks) ──────────────────────────────────────────
  const weekMap: Record<string, { score: number; total: number; sessions: number }> = {};
  for (const s of sessions) {
    const wk = getWeekStart(s.date);
    (weekMap[wk] ??= { score: 0, total: 0, sessions: 0 });
    weekMap[wk].score += s.score;
    weekMap[wk].total += s.total;
    weekMap[wk].sessions += 1;
  }
  const weeklyTrend = Object.entries(weekMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-8)
    .map(([wk, d]) => ({
      label: formatWeekLabel(wk),
      avgPct: Math.round((d.score / d.total) * 100),
      sessions: d.sessions,
    }));

  // ── Average completion time ───────────────────────────────────────────────
  const timedSessions = sessions.filter(
    (s) => s.started_at && s.completed_at
  );
  let avgCompletionSec: number | null = null;
  if (timedSessions.length > 0) {
    const totalSec = timedSessions.reduce((sum, s) => {
      return (
        sum +
        (new Date(s.completed_at).getTime() -
          new Date(s.started_at!).getTime()) /
          1000
      );
    }, 0);
    avgCompletionSec = Math.round(totalSec / timedSessions.length);
  }

  // ── Per-question answers ──────────────────────────────────────────────────
  const { data: rawAnswers } = await admin
    .from("drill_question_answers")
    .select("question_id, category, was_correct")
    .limit(100000);

  const answers: AnswerRow[] = rawAnswers ?? [];
  const hasAnswerData = answers.length > 0;

  // Most difficult topics
  const topicMap: Record<string, { correct: number; total: number }> = {};
  if (hasAnswerData) {
    for (const a of answers) {
      (topicMap[a.category] ??= { correct: 0, total: 0 });
      topicMap[a.category].total++;
      if (a.was_correct) topicMap[a.category].correct++;
    }
  } else {
    // Fall back to session-level category data
    for (const s of sessions) {
      if (!s.category) continue;
      (topicMap[s.category] ??= { correct: 0, total: 0 });
      topicMap[s.category].total += s.total;
      topicMap[s.category].correct += s.score;
    }
  }
  const topicDifficulty = Object.entries(topicMap)
    .map(([cat, d]) => ({
      category: cat,
      label: CATEGORY_LABELS[cat] ?? cat,
      avgPct: Math.round((d.correct / d.total) * 100),
      attempts: d.total,
    }))
    .sort((a, b) => a.avgPct - b.avgPct);

  // Most missed questions (require answer-level data)
  const qMap: Record<string, { wrong: number; total: number }> = {};
  for (const a of answers) {
    (qMap[a.question_id] ??= { wrong: 0, total: 0 });
    qMap[a.question_id].total++;
    if (!a.was_correct) qMap[a.question_id].wrong++;
  }
  const questionLookup = new Map(questionBank.map((q) => [q.id, q.text]));
  const missedQuestions = Object.entries(qMap)
    .map(([qid, d]) => ({
      questionId: qid,
      text: questionLookup.get(qid) ?? qid,
      missRate: Math.round((d.wrong / d.total) * 100),
      attempts: d.total,
    }))
    .filter((q) => q.attempts >= 3)
    .sort((a, b) => b.missRate - a.missRate)
    .slice(0, 8);

  const dashboardData: DashboardData = {
    totalUsers,
    activeToday,
    drillsCompleted,
    avgScore,
    completionRate,
    avgImprovement,
    avgCompletionSec,
    weeklyTrend,
    topicDifficulty,
    missedQuestions,
    hasAnswerData,
    generatedAt: new Date().toISOString(),
  };

  return <InstructorDashboard data={dashboardData} />;
}
