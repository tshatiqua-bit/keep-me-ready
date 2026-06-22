interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  const label = streak === 1 ? "day streak" : "day streak";

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center gap-4">
        <div className="text-5xl font-black">{streak}</div>
        <div>
          <p className="text-lg font-semibold leading-tight">{label}</p>
          <p className="text-indigo-200 text-sm mt-0.5">
            {streak === 0
              ? "Complete a drill today to start your streak"
              : streak === 1
              ? "Great start — come back tomorrow!"
              : "Keep the chain going!"}
          </p>
        </div>
      </div>
    </div>
  );
}
