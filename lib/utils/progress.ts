import type { UserProgress, DrillSession } from "@/types";

const STORAGE_KEY = "kmr_progress";

const DEFAULT_PROGRESS: UserProgress = {
  totalAnswered: 0,
  totalCorrect: 0,
  currentStreak: 0,
  lastDrillDate: null,
  sessions: [],
};

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return JSON.parse(raw) as UserProgress;
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function persistProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function saveSession(score: number, total: number): void {
  const progress = loadProgress();
  const today = toDateString(new Date());

  const yesterday = toDateString(new Date(Date.now() - 86_400_000));

  let newStreak: number;
  if (progress.lastDrillDate === today) {
    newStreak = progress.currentStreak;
  } else if (progress.lastDrillDate === yesterday) {
    newStreak = progress.currentStreak + 1;
  } else {
    newStreak = 1;
  }

  const session: DrillSession = {
    id: `${today}-${Date.now()}`,
    date: today,
    questions: [],
    answers: [],
    score,
    total,
    completedAt: new Date().toISOString(),
  };

  const updated: UserProgress = {
    totalAnswered: progress.totalAnswered + total,
    totalCorrect: progress.totalCorrect + score,
    currentStreak: newStreak,
    lastDrillDate: today,
    sessions: [session, ...progress.sessions].slice(0, 30),
  };

  persistProgress(updated);
}

export function getAccuracyPct(progress: UserProgress): number | null {
  if (progress.totalAnswered === 0) return null;
  return Math.round((progress.totalCorrect / progress.totalAnswered) * 100);
}
