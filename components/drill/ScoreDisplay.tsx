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
      heading: "Every repetition strengthens the pathway.",
      body: "Today was a perfect one. That kind of clarity comes from showing up consistently.",
    };
  if (pct >= 0.8)
    return {
      heading: "Understanding is growing.",
      body: "A score like this means the concepts are landing. Keep the daily habit going.",
    };
  if (pct >= 0.5)
    return {
      heading: "Progress comes from practice, not perfection.",
      body: "Today's effort counts. Each session makes the next one a little easier.",
    };
  return {
    heading: "Today's effort matters more than today's score.",
    body: "Understanding grows even when it doesn't feel like it. Come back tomorrow — it will click.",
  };
}

export default function ScoreDisplay({ score, total, topic, onRestart }: ScoreDisplayProps) {
  const { heading, body } = getMessage(score, total);
  const pct = Math.round((score / total) * 100);

  return (
    <div className="max-w-lg mx-auto py-10" aria-label="Drill results" role="region">
      <div className="text-center mb-10">
        <div
          className="text-6xl font-bold text-indigo-600 mb-2"
          aria-label={`Score: ${score} out of ${total}`}
        >
          {score}
          <span className="text-3xl text-slate-400" aria-hidden="true">
            /{total}
          </span>
        </div>
        <div className="text-sm font-medium text-slate-400 mb-6">{pct}% correct</div>
        <h2 className="text-xl font-semibold text-slate-800 mb-3 leading-snug">{heading}</h2>
        <p className="text-slate-500 leading-7">{body}</p>
      </div>

      <div className="border-l-4 border-indigo-400 bg-indigo-50 rounded-r-xl px-5 py-5 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700 mb-2">
          What to review next
        </p>
        <p className="text-sm text-indigo-900 leading-6">{topic.reviewNext}</p>
      </div>

      <div className="border-l-4 border-slate-300 bg-slate-50 rounded-r-xl px-5 py-5 mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
          One reflection to sit with
        </p>
        <p className="text-sm text-slate-700 leading-7">{topic.reflectionPrompt}</p>
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
