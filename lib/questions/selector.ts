import type { Question, QuestionCategory, DifficultyLevel } from "@/types";
import beginnerQuestions from "@/data/questions/beginner.json";

const ALL_QUESTIONS: Question[] = beginnerQuestions as Question[];

export interface DrillOptions {
  count?: number;
  level?: DifficultyLevel;
  category?: QuestionCategory;
}

export function selectDrillQuestions(options: DrillOptions = {}): Question[] {
  const { count = 10, level, category } = options;

  let pool = ALL_QUESTIONS;

  if (level) {
    pool = pool.filter((q) => q.level === level);
  }

  if (category) {
    pool = pool.filter((q) => q.category === category);
  }

  if (pool.length === 0) return [];

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsByCategory(category: QuestionCategory): Question[] {
  return ALL_QUESTIONS.filter((q) => q.category === category);
}

export function getTotalQuestionCount(): number {
  return ALL_QUESTIONS.length;
}
