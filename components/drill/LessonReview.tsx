"use client";

import { useState } from "react";
import Link from "next/link";
import type { Question } from "@/types";
import type { Topic } from "@/lib/questions/topics";

interface LessonReviewProps {
  questions: Question[];
  answers: (number | null)[];
  score: number;
  topic: Topic;
  onRestart: () => void;
}

const TYPE_LABELS: Record<Question["type"], string> = {
  multiple_choice: "Multiple Choice",
  true_false: "True / False",
  scenario: "Scenario",
};

const CORRECT_HEADERS = [
  "Exactly right.",
  "You got it.",
  "Spot on.",
  "That's the one.",
  "Perfect — keep that in mind.",
];

const INCORRECT_HEADERS = [
  "Close — here's the key:",
  "Not quite, but this one trips people up:",
  "Good try — let's clear that up:",
  "Not this time — here's why:",
  "Almost — here's what to remember:",
];

function QuestionReviewCard({
  question,
  learnerAnswer,
  questionNumber,
}: {
  question: Question;
  learnerAnswer: number | null;
  questionNumber: number;
}) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const isCorrect = learnerAnswer === question.correctIndex;
  const headerIdx = (questionNumber - 1) % 5;
  const coachHeader = isCorrect
    ? CORRECT_HEADERS[headerIdx]
    : INCORRECT_HEADERS[headerIdx];

  function toggleExpand(idx: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-500">
            Q{questionNumber}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {TYPE_LABELS[question.type]}
          </span>
        </div>
        {isCorrect ? (
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
            ✓ Correct
          </span>
        ) : (
          <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
            ✗ Incorrect
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="text-base font-semibold text-slate-900 leading-snug mb-5">
        {question.text}
      </p>

      {/* Answer options */}
      <div className="space-y-2 mb-5">
        {question.options.map((option, idx) => {
          const isLearnerChoice = idx === learnerAnswer;
          const isCorrectChoice = idx === question.correctIndex;

          if (isLearnerChoice && isCorrectChoice) {
            return (
              <div
                key={idx}
                className="border-2 border-green-500 bg-green-50 rounded-xl px-4 py-3"
              >
                <p className="text-sm font-medium text-green-900 mb-1.5">
                  {option}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs font-semibold text-green-700">
                    ✓ Your Answer
                  </span>
                  <span className="text-xs font-semibold text-green-700">
                    ✓ Correct Answer
                  </span>
                </div>
              </div>
            );
          }

          if (isLearnerChoice) {
            return (
              <div
                key={idx}
                className="border-2 border-red-400 bg-red-50 rounded-xl px-4 py-3"
              >
                <p className="text-sm font-medium text-red-900 mb-1.5">
                  {option}
                </p>
                <span className="text-xs font-semibold text-red-700">
                  ✗ Your Answer
                </span>
              </div>
            );
          }

          if (isCorrectChoice) {
            return (
              <div
                key={idx}
                className="border-2 border-green-500 bg-green-50 rounded-xl px-4 py-3"
              >
                <p className="text-sm font-medium text-green-900 mb-1.5">
                  {option}
                </p>
                <span className="text-xs font-semibold text-green-700">
                  ✓ Correct Answer
                </span>
              </div>
            );
          }

          const optionNote = question.optionExplanations?.[idx];
          const isOpen = expanded.has(idx);
          if (optionNote) {
            return (
              <div key={idx} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors group"
                  aria-expanded={isOpen}
                >
                  <p className="text-sm text-slate-400 group-hover:text-slate-500 transition-colors">
                    {option}
                  </p>
                  <span
                    className="ml-3 shrink-0 text-slate-300 group-hover:text-slate-400 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 pt-0">
                    <p className="text-xs text-slate-500 leading-6 border-l-2 border-slate-200 pl-3">
                      {optionNote}
                    </p>
                  </div>
                )}
              </div>
            );
          }
          return (
            <div key={idx} className="px-4 py-3">
              <p className="text-sm text-slate-400">{option}</p>
            </div>
          );
        })}
      </div>

      {/* Coaching explanation */}
      <div
        className={`border-l-4 rounded-r-xl px-4 py-4 ${
          isCorrect
            ? "border-green-400 bg-green-50"
            : "border-amber-400 bg-amber-50"
        }`}
      >
        <p
          className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
            isCorrect ? "text-green-700" : "text-amber-700"
          }`}
        >
          {coachHeader}
        </p>
        <p
          className={`text-sm leading-7 ${
            isCorrect ? "text-green-800" : "text-amber-800"
          }`}
        >
          {question.explanation}
        </p>
      </div>
    </div>
  );
}

export default function LessonReview({
  questions,
  answers,
  score,
  topic,
  onRestart,
}: LessonReviewProps) {
  return (
    <div>
      {/* Page header */}
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
          Lesson Review
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-400 mb-1">
          {topic.title}
        </h2>
        <p className="text-sm text-slate-500">
          {score} of {questions.length} correct
        </p>
      </div>

      {/* Question cards */}
      <div className="space-y-4 mb-10">
        {questions.map((q, i) => (
          <QuestionReviewCard
            key={q.id}
            question={q}
            learnerAnswer={answers[i]}
            questionNumber={i + 1}
          />
        ))}
      </div>

      {/* Key Lesson Takeaways */}
      <div className="bg-slate-900 rounded-2xl p-5 sm:p-8 mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Key Lesson Takeaways
        </p>
        <h3 className="text-lg font-bold text-white mb-5">{topic.title}</h3>
        <ul className="space-y-3">
          {topic.takeaways.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-indigo-400 font-bold text-sm shrink-0 mt-0.5">
                —
              </span>
              <p className="text-sm text-slate-300 leading-7">{point}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
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
    </div>
  );
}
