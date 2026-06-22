interface ProgressStatsProps {
  drillsCompleted: number;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number | null;
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <p className="text-xl font-bold text-indigo-600">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

export default function ProgressStats({
  drillsCompleted,
  totalAnswered,
  totalCorrect,
  accuracy,
}: ProgressStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <StatCard label="Drills completed" value={String(drillsCompleted)} />
      <StatCard label="Questions answered" value={String(totalAnswered)} />
      <StatCard label="Correct answers" value={String(totalCorrect)} />
      <StatCard
        label="Overall accuracy"
        value={accuracy !== null ? `${accuracy}%` : "—"}
      />
    </div>
  );
}
