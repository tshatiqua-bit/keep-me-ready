import Link from "next/link";

export interface SessionRow {
  id: string;
  date: string;
  score: number;
  total: number;
}

interface SessionHistoryProps {
  sessions: SessionRow[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function AccuracyBar({ pct }: { pct: number }) {
  const color =
    pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  if (sessions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="font-semibold text-slate-800 dark:text-slate-300 mb-4">Recent Sessions</h2>
        <p className="text-sm text-slate-400 text-center py-8">
          No drills completed yet.{" "}
          <Link href="/drill" className="text-indigo-600 hover:underline">
            Start your first drill →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="font-semibold text-slate-800 dark:text-slate-300 mb-4">Recent Sessions</h2>
      <div className="space-y-1">
        {sessions.map((s) => {
          const total = s.total || 10;
          const pct = Math.round((s.score / total) * 100);
          return (
            <div
              key={s.id}
              className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
            >
              <span className="text-sm text-slate-600">{formatDate(s.date)}</span>
              <div className="flex items-center gap-4">
                <AccuracyBar pct={pct} />
                <span className="text-sm font-medium text-slate-800 w-12 text-right">
                  {s.score}/{total}
                </span>
                <span
                  className={`text-xs font-semibold w-10 text-right ${
                    pct >= 80
                      ? "text-green-600"
                      : pct >= 50
                      ? "text-amber-600"
                      : "text-red-500"
                  }`}
                >
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
