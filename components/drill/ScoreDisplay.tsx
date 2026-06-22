import Link from "next/link";
import SaveProgressPrompt from "@/components/SaveProgressPrompt";

interface ScoreDisplayProps {
  score: number;
  total: number;
  onRestart: () => void;
}

function getMessage(score: number, total: number): { heading: string; body: string } {
  const pct = score / total;
  if (pct === 1)
    return {
      heading: "Perfect score!",
      body: "You nailed every question. Outstanding work.",
    };
  if (pct >= 0.8)
    return {
      heading: "Great work!",
      body: "You're building real confidence. Keep going.",
    };
  if (pct >= 0.5)
    return {
      heading: "Good effort!",
      body: "You're on the right track. Review the tricky ones and try again.",
    };
  return {
    heading: "Keep practicing.",
    body: "Every drill makes the concepts stick a little more. You've got this.",
  };
}

export default function ScoreDisplay({ score, total, onRestart }: ScoreDisplayProps) {
  const { heading, body } = getMessage(score, total);
  const pct = Math.round((score / total) * 100);

  return (
    <div className="max-w-md mx-auto text-center py-8" aria-label="Drill results" role="region">
      <div className="text-6xl font-bold text-indigo-600 mb-2" aria-label={`Score: ${score} out of ${total}`}>
        {score}<span className="text-3xl text-slate-400" aria-hidden="true">/{total}</span>
      </div>
      <div className="text-sm font-medium text-slate-500 mb-6">{pct}% correct</div>

      <h2 className="text-xl font-bold text-slate-800 mb-2">{heading}</h2>
      <p className="text-slate-500 mb-8">{body}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
        >
          Try Another Drill
        </button>
        <Link
          href="/dashboard"
          className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          View Dashboard
        </Link>
      </div>

      <SaveProgressPrompt />
    </div>
  );
}
