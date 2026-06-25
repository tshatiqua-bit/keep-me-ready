export type QuestionType = "multiple_choice" | "true_false" | "scenario";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type QuestionCategory =
  | "debits_credits"
  | "accounts"
  | "financial_statements"
  | "journal_entries"
  | "bank_reconciliation"
  | "payroll";

export interface Question {
  id: string;
  type: QuestionType;
  level: DifficultyLevel;
  category: QuestionCategory;
  text: string;
  options: string[];        // 2 options for true/false, 4 for MC and scenario
  correctIndex: number;     // 0-based index into options[]
  explanation: string;
  optionExplanations?: (string | null)[]; // parallel to options[]; null at correctIndex
}

export interface DrillSession {
  id: string;
  date: string;             // ISO date string YYYY-MM-DD
  questions: string[];      // Question IDs
  answers: number[];        // Selected indices, parallel to questions[]
  score: number;            // number correct
  total: number;            // questions in the drill (default 10)
  completedAt: string | null;
}

export interface UserProgress {
  totalAnswered: number;
  totalCorrect: number;
  currentStreak: number;
  lastDrillDate: string | null;
  sessions: DrillSession[];
}
