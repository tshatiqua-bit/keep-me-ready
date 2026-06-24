import Link from "next/link";
import SaveProgressPrompt from "@/components/SaveProgressPrompt";
import type { Topic } from "@/lib/questions/topics";

interface ScoreDisplayProps {
  score: number;
  total: number;
  topic: Topic;
  onRestart: () => void;
}

function getMessage(score: number, total: number): { heading: string; body: string } {
  const pct = score / total;
  if (pct === 1)
    return {
      heading: "Perfect score!",
      body: "You nailed every question on this topic. Outstanding work.",
    };
  if (pct >= 0.8)
    return {
      heading: "Great work!",
      body: "You've got a solid grasp of this topic. Keep the streak going.",
    };
  if (pct >= 0.5)
    return {
      heading: "Good effort!",
      body: "You're building the right instincts. A second pass will sharpen it.",
    };
  return {
    heading: "Keep going.",
    body: "This one takes practice. Review the lesson, then come back tomorrow.",
  };
}

export default function ScoreDisplay({ score, total, topic, onRestart }: ScoreDisplayProps) {
  const { heading, body } = getMessage(score, total);
  const pct = Math.round((score / total) * 100);

  return (
    <div className="max-w-lg mx-auto py-8" aria-label="Drill results" role="region">
      <div className="text-center mb-8">
        <div
          className="text-6xl font-bold text-indigo-600 mb-2"
          aria-label={`Score: ${score} out of ${total}`}
        >
          {score}
          <span className="text-3xl text-slate-400" aria-hidden="true">
            /{total}
          </span>
        </div>
        <div className="text-sm font-medium text-slate-500 mb-4">{pct}% correct</div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">{heading}</h2>
        <p className="text-slate-500">{body}</p>
      </div>

      <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl px-4 py-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-1">
          What to review next
        </p>
        <p className="text-sm text-indigo-900">{topic.reviewNext}</p>
      </div>

      <div className="border-l-4 border-slate-300 bg-slate-50 rounded-r-xl px-4 py-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
          One reflection to sit with
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">{topic.reflectionPrompt}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
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

      <SaveProgressPrompt />
    </div>
  );
}
