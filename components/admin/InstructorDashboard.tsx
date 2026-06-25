export interface DashboardData {
  totalUsers: number;
  activeToday: number;
  drillsCompleted: number;
  avgScore: number;
  completionRate: number;
  avgImprovement: number | null;
  avgCompletionSec: number | null;
  weeklyTrend: { label: string; avgPct: number; sessions: number }[];
  topicDifficulty: { category: string; label: string; avgPct: number; attempts: number }[];
  missedQuestions: { questionId: string; text: string; missRate: number; attempts: number }[];
  hasAnswerData: boolean;
  generatedAt: string;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatTs(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
        {label}
      </p>
      <p
        className={`text-4xl font-bold tracking-tight mb-1 ${
          accent ? "text-indigo-600" : "text-slate-900"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

function SectionHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {note && <p className="text-xs text-slate-400 mt-0.5">{note}</p>}
    </div>
  );
}

function NoData({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center py-10 text-center">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}

function TopicRow({
  label,
  avgPct,
  attempts,
  rank,
}: {
  label: string;
  avgPct: number;
  attempts: number;
  rank: number;
}) {
  const color =
    avgPct < 60
      ? "bg-red-400"
      : avgPct < 75
      ? "bg-amber-400"
      : "bg-green-500";

  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-slate-50 last:border-0">
      <span className="text-xs font-bold text-slate-300 w-4 shrink-0">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">{label}</p>
        <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${color} transition-all`}
            style={{ width: `${avgPct}%` }}
          />
        </div>
      </div>
      <div className="text-right shrink-0">
        <p
          className={`text-sm font-semibold ${
            avgPct < 60
              ? "text-red-600"
              : avgPct < 75
              ? "text-amber-600"
              : "text-green-600"
          }`}
        >
          {avgPct}%
        </p>
        <p className="text-xs text-slate-400">{attempts.toLocaleString()} attempts</p>
      </div>
    </div>
  );
}

function MissedQuestionRow({
  rank,
  text,
  missRate,
  attempts,
}: {
  rank: number;
  text: string;
  missRate: number;
  attempts: number;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
      <span className="text-xs font-bold text-slate-300 w-4 shrink-0 pt-0.5">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700 leading-snug line-clamp-2">{text}</p>
        <p className="text-xs text-slate-400 mt-1">{attempts} attempts</p>
      </div>
      <div className="shrink-0 text-right">
        <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-md">
          {missRate}% miss
        </span>
      </div>
    </div>
  );
}

function TrendBars({
  weeks,
}: {
  weeks: { label: string; avgPct: number; sessions: number }[];
}) {
  if (weeks.length === 0) {
    return <NoData message="No session data yet." />;
  }
  const max = Math.max(...weeks.map((w) => w.avgPct), 50);

  return (
    <div className="flex items-end gap-2 h-32">
      {weeks.map((w, i) => {
        const heightPct = (w.avgPct / max) * 100;
        const color =
          w.avgPct < 60
            ? "bg-red-300"
            : w.avgPct < 75
            ? "bg-amber-300"
            : "bg-indigo-400";
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end gap-1 group"
          >
            <div className="relative flex flex-col items-center">
              <span className="hidden group-hover:block absolute -top-6 text-xs font-semibold text-slate-600 whitespace-nowrap">
                {w.avgPct}%
              </span>
              <div
                className={`w-full rounded-t-md ${color} min-h-[4px]`}
                style={{ height: `${(heightPct / 100) * 112}px` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 truncate w-full text-center">
              {w.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────

export default function InstructorDashboard({ data }: { data: DashboardData }) {
  const {
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
    generatedAt,
  } = data;

  const improvementLabel =
    avgImprovement === null
      ? "—"
      : avgImprovement >= 0
      ? `+${avgImprovement}%`
      : `${avgImprovement}%`;

  const completionTimeLabel =
    avgCompletionSec === null ? "—" : formatTime(avgCompletionSec);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Admin
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            Instructor Dashboard
          </h1>
        </div>
        <p className="text-xs text-slate-400">
          Updated {formatTs(generatedAt)}
        </p>
      </div>

      {/* Schema notice */}
      {!hasAnswerData && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3 items-start">
          <span className="text-amber-500 text-sm shrink-0 mt-0.5">⚠</span>
          <p className="text-sm text-amber-800">
            <strong>Enhanced analytics not yet active.</strong> Run{" "}
            <code className="text-xs bg-amber-100 px-1 py-0.5 rounded">
              supabase/migrations/002_analytics.sql
            </code>{" "}
            in your Supabase SQL Editor to enable Most Missed Questions, Most
            Difficult Topics (per-question), and Avg Completion Time.
          </p>
        </div>
      )}

      {/* ── Row 1: Stat cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard
          label="Total Users"
          value={totalUsers.toLocaleString()}
          sub="registered accounts"
        />
        <StatCard
          label="Active Today"
          value={activeToday.toLocaleString()}
          sub="completed a drill"
          accent
        />
        <StatCard
          label="Drills Completed"
          value={drillsCompleted.toLocaleString()}
          sub="all time"
        />
        <StatCard
          label="Average Score"
          value={drillsCompleted > 0 ? `${avgScore}%` : "—"}
          sub="across all sessions"
          accent={avgScore >= 70}
        />
        <StatCard
          label="30-Day Active Rate"
          value={totalUsers > 0 ? `${completionRate}%` : "—"}
          sub="of users drilled this month"
        />
      </div>

      {/* ── Row 2: Improvement + Completion time ──────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Avg Improvement
          </p>
          <p
            className={`text-4xl font-bold tracking-tight mb-1 ${
              avgImprovement === null
                ? "text-slate-300"
                : avgImprovement >= 0
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {improvementLabel}
          </p>
          <p className="text-xs text-slate-400">
            {avgImprovement === null
              ? "Need users with 4+ sessions"
              : "first half vs. second half of sessions, per user"}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Avg Completion Time
          </p>
          <p
            className={`text-4xl font-bold tracking-tight mb-1 ${
              avgCompletionSec === null ? "text-slate-300" : "text-slate-900"
            }`}
          >
            {completionTimeLabel}
          </p>
          <p className="text-xs text-slate-400">
            {avgCompletionSec === null
              ? "Requires migration 002 (started_at column)"
              : `across ${data.avgCompletionSec !== null ? "timed " : ""}sessions`}
          </p>
        </div>
      </div>

      {/* ── Row 3: Weekly trend ───────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6 mb-6">
        <SectionHeader
          title="Average Score by Week"
          note="Weekly average across all learners — last 8 weeks"
        />
        <TrendBars weeks={weeklyTrend} />
        {weeklyTrend.length > 0 && (
          <div className="flex gap-4 mt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-red-300" />
              Below 60%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-amber-300" />
              60–74%
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm bg-indigo-400" />
              75%+
            </span>
          </div>
        )}
      </div>

      {/* ── Row 4: Topics + Missed questions ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Most difficult topics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
          <SectionHeader
            title="Most Difficult Topics"
            note={
              hasAnswerData
                ? "By avg correct rate across all answered questions"
                : "By avg session score per category"
            }
          />
          {topicDifficulty.length === 0 ? (
            <NoData message="No category data yet. Run migration 002 and complete a drill." />
          ) : (
            <div>
              {topicDifficulty.map((t, i) => (
                <TopicRow
                  key={t.category}
                  rank={i + 1}
                  label={t.label}
                  avgPct={t.avgPct}
                  attempts={t.attempts}
                />
              ))}
            </div>
          )}
        </div>

        {/* Most missed questions */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 lg:p-6">
          <SectionHeader
            title="Most Missed Questions"
            note={
              hasAnswerData
                ? "Questions with highest incorrect rate (min 3 attempts)"
                : "Requires migration 002 + at least one drill after applying it"
            }
          />
          {missedQuestions.length === 0 ? (
            <NoData
              message={
                hasAnswerData
                  ? "Not enough attempts yet to rank questions."
                  : "Per-question tracking not active. Run supabase/migrations/002_analytics.sql."
              }
            />
          ) : (
            <div>
              {missedQuestions.map((q, i) => (
                <MissedQuestionRow
                  key={q.questionId}
                  rank={i + 1}
                  text={q.text}
                  missRate={q.missRate}
                  attempts={q.attempts}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
