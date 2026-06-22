interface DrillProgressProps {
  current: number;
  total: number;
  score: number;
  answered: number;
}

export default function DrillProgress({ current, total, score, answered }: DrillProgressProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="mb-6" role="status" aria-label={`Question ${current} of ${total}, score ${score} out of ${answered} answered`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-500">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-slate-500">
          {answered > 0 ? `Score: ${score}/${answered}` : "Score: —"}
        </span>
      </div>
      <div
        className="w-full bg-slate-200 rounded-full h-1.5"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Drill progress"
      >
        <div
          className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
