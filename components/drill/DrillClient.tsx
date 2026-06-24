"use client";

import { useState } from "react";
import type { Question } from "@/types";
import { selectDrillQuestions } from "@/lib/questions/selector";
import { getTodaysMeta, ENCOURAGEMENTS } from "@/lib/questions/topics";
import type { Topic } from "@/lib/questions/topics";
import { saveSession } from "@/lib/utils/progress";
import DrillProgress from "./DrillProgress";
import QuestionCard from "./QuestionCard";
import AnswerOption from "./AnswerOption";
import Explanation from "./Explanation";
import ScoreDisplay from "./ScoreDisplay";
import LessonCard from "./LessonCard";

type Phase = "lesson" | "answering" | "revealed" | "completed";

const BALANCE_MOTIF_CATEGORIES = new Set([
  "debits_credits",
  "financial_statements",
  "bank_reconciliation",
]);

function freshQuestions(topic: Topic): Question[] {
  return selectDrillQuestions({ count: 10, category: topic.category });
}

export default function DrillClient() {
  const [meta] = useState(getTodaysMeta);
  const [questions, setQuestions] = useState<Question[]>(() =>
    freshQuestions(meta.topic)
  );
  const [encouragement] = useState(
    () => ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [phase, setPhase] = useState<Phase>("lesson");

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleStart() {
    setPhase("answering");
  }

  function handleSelect(index: number) {
    if (phase !== "answering") return;
    const correct = index === current.correctIndex;
    setSelectedIndex(index);
    setPhase("revealed");
    setAnswered((a) => a + 1);
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      saveSession(score, questions.length);
      setPhase("completed");
      syncToDb(score, questions.length).catch(() => {});
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedIndex(null);
    setPhase("answering");
  }

  async function syncToDb(drillScore: number, total: number): Promise<void> {
    const today = new Date().toISOString().slice(0, 10);
    await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: drillScore, total, date: today }),
    });
  }

  function handleRestart() {
    setQuestions(freshQuestions(meta.topic));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setAnswered(0);
    setPhase("lesson");
  }

  if (phase === "lesson") {
    return (
      <LessonCard
        topic={meta.topic}
        topicIndex={meta.topicIndex}
        dayOfYear={meta.dayOfYear}
        encouragement={encouragement}
        showMotif={BALANCE_MOTIF_CATEGORIES.has(meta.topic.category)}
        onStart={handleStart}
      />
    );
  }

  if (phase === "completed") {
    return (
      <ScoreDisplay
        score={score}
        total={questions.length}
        topic={meta.topic}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div>
      <DrillProgress
        current={currentIndex + 1}
        total={questions.length}
        score={score}
        answered={answered}
      />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-4">
        <QuestionCard question={current} />

        <div className="mt-6 space-y-3">
          {current.options.map((option, idx) => (
            <AnswerOption
              key={idx}
              text={option}
              index={idx}
              selectedIndex={selectedIndex}
              correctIndex={current.correctIndex}
              phase={phase}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {phase === "revealed" && (
          <Explanation
            text={current.explanation}
            isCorrect={selectedIndex === current.correctIndex}
            questionIndex={currentIndex}
          />
        )}
      </div>

      {phase === "revealed" && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          >
            {isLast ? "See Results" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}
