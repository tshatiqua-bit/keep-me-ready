import type { Topic } from "@/lib/questions/topics";

interface LessonCardProps {
  topic: Topic;
  onStart: () => void;
}

export default function LessonCard({ topic, onStart }: LessonCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
      <div className="mb-5">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-3">
          Today&apos;s Topic
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
          {topic.title}
        </h2>
      </div>

      <p className="text-slate-600 leading-relaxed mb-6">{topic.lesson}</p>

      <div className="border-l-4 border-green-400 bg-green-50 rounded-r-xl px-4 py-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-1">
          Why this matters in real bookkeeping
        </p>
        <p className="text-sm text-green-900 leading-relaxed">{topic.whyItMatters}</p>
      </div>

      <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-4 py-4 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
          Common confusion to watch for
        </p>
        <p className="text-sm text-amber-900 leading-relaxed">{topic.commonConfusion}</p>
      </div>

      <button
        onClick={onStart}
        className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
      >
        Start Drill →
      </button>
    </div>
  );
}
