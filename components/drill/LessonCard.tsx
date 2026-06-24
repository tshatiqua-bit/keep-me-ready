import type { Topic } from "@/lib/questions/topics";
import { TOTAL_TOPICS } from "@/lib/questions/topics";

interface LessonCardProps {
  topic: Topic;
  topicIndex: number;
  dayOfYear: number;
  encouragement: string;
  onStart: () => void;
}

function BalanceScaleMotif() {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute bottom-0 right-0 w-48 sm:w-56 opacity-[0.04] pointer-events-none select-none"
      aria-hidden="true"
    >
      <line x1="80" y1="28" x2="80" y2="162" />
      <line x1="52" y1="162" x2="108" y2="162" />
      <line x1="18" y1="54" x2="142" y2="54" />
      <circle cx="80" cy="54" r="4" fill="white" />
      <line x1="18" y1="54" x2="18" y2="112" />
      <line x1="142" y1="54" x2="142" y2="112" />
      <path d="M 3 112 Q 18 124 33 112" />
      <path d="M 127 112 Q 142 124 157 112" />
    </svg>
  );
}

export default function LessonCard({
  topic,
  topicIndex,
  dayOfYear,
  encouragement,
  onStart,
}: LessonCardProps) {
  return (
    <div className="relative overflow-hidden bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-8 lg:p-10">
      <BalanceScaleMotif />

      <div className="relative">
        {/* Encouragement + journey indicator */}
        <div className="mb-5 sm:mb-8">
          <p className="text-sm text-slate-500 italic mb-2">{encouragement}</p>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Day {dayOfYear} &middot; Topic {topicIndex + 1} of {TOTAL_TOPICS}
          </p>
        </div>

        {/* Topic header */}
        <div className="mb-5 sm:mb-7">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-900 px-2.5 py-1 rounded-md mb-3 sm:mb-4">
            Today&apos;s Topic
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {topic.title}
          </h2>
        </div>

        {/* Lesson */}
        <p className="text-base text-slate-300 leading-7 sm:leading-8 mb-5 sm:mb-8">
          {topic.lesson}
        </p>

        {/* Why it matters */}
        <div className="border-l-4 border-green-500 bg-green-950 rounded-r-xl px-4 py-4 sm:px-5 sm:py-5 mb-4 sm:mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-400 mb-2">
            Why this matters<span className="hidden sm:inline"> in real bookkeeping</span>
          </p>
          <p className="text-sm text-green-200 leading-7">{topic.whyItMatters}</p>
        </div>

        {/* Common confusion */}
        <div className="border-l-4 border-amber-500 bg-amber-950 rounded-r-xl px-4 py-4 sm:px-5 sm:py-5 mb-7 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-2">
            Common confusion to watch for
          </p>
          <p className="text-sm text-amber-200 leading-7">{topic.commonConfusion}</p>
        </div>

        <button
          onClick={onStart}
          className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-indigo-400"
        >
          I Understand. Let&apos;s Practice. →
        </button>
      </div>
    </div>
  );
}
