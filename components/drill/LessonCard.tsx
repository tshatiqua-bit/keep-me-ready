import type { Topic } from "@/lib/questions/topics";
import { TOTAL_TOPICS } from "@/lib/questions/topics";

interface LessonCardProps {
  topic: Topic;
  topicIndex: number;
  dayOfYear: number;
  encouragement: string;
  onStart: () => void;
}

export default function LessonCard({
  topic,
  topicIndex,
  dayOfYear,
  encouragement,
  onStart,
}: LessonCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10">

      {/* Encouragement + journey indicator */}
      <div className="mb-8">
        <p className="text-sm text-slate-400 italic mb-2">{encouragement}</p>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          Day {dayOfYear} &middot; Topic {topicIndex + 1} of {TOTAL_TOPICS}
        </p>
      </div>

      {/* Topic header */}
      <div className="mb-7">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-4">
          Today&apos;s Topic
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
          {topic.title}
        </h2>
      </div>

      {/* Lesson */}
      <p className="text-base text-slate-600 leading-8 mb-8">{topic.lesson}</p>

      {/* Why it matters */}
      <div className="border-l-4 border-green-400 bg-green-50 rounded-r-xl px-5 py-5 mb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-700 mb-2">
          Why this matters in real bookkeeping
        </p>
        <p className="text-sm text-green-900 leading-7">{topic.whyItMatters}</p>
      </div>

      {/* Common confusion */}
      <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl px-5 py-5 mb-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-2">
          Common confusion to watch for
        </p>
        <p className="text-sm text-amber-900 leading-7">{topic.commonConfusion}</p>
      </div>

      <button
        onClick={onStart}
        className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
      >
        Start Drill →
      </button>
    </div>
  );
}
