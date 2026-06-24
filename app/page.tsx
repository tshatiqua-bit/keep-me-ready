import Link from "next/link";
import HomeStats from "@/components/HomeStats";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-400 mb-4">
          Sharpen your bookkeeping skills.
          <br />
          <span className="text-3xl sm:text-5xl text-indigo-600">Ten minutes a day.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Daily drills, instant feedback, and plain-English explanations to
          build confidence — whether you&apos;re prepping for a job or staying sharp.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
        <Link
          href="/drill"
          className="bg-indigo-600 text-white text-center font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
        >
          Start Today&apos;s Drill
        </Link>
        <Link
          href="/dashboard"
          className="bg-white text-slate-700 text-center font-semibold px-8 py-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          View Dashboard
        </Link>
      </div>

      <HomeStats />

      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        {[
          {
            title: "Multiple choice",
            body: "Pick the right account, entry, or concept from four options.",
          },
          {
            title: "True / False",
            body: "Quick-fire statements to test your instincts on bookkeeping rules.",
          },
          {
            title: "Scenarios",
            body: "Read a real-world situation and decide how to record it.",
          },
        ].map(({ title, body }) => (
          <div key={title} className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
