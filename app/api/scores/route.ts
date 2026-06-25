import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface AnswerPayload {
  questionId: string;
  category: string;
  wasCorrect: boolean;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { score, total, date, category, startedAt, answers } = body as {
    score: number;
    total: number;
    date: string;
    category?: string;
    startedAt?: string;
    answers?: AnswerPayload[];
  };

  if (
    typeof score !== "number" ||
    typeof total !== "number" ||
    !date ||
    score < 0 ||
    total <= 0
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Try extended insert (with category + started_at from migration 002).
  // Fall back to basic insert if those columns don't exist yet.
  let sessionId: string | null = null;
  let sessionData: Record<string, unknown> | null = null;

  const { data: extended, error: extErr } = await supabase
    .from("drill_sessions")
    .insert({
      user_id: user.id,
      score,
      total,
      date,
      category: category ?? null,
      started_at: startedAt ?? null,
    })
    .select("id, date, score, total, completed_at")
    .single();

  if (extErr) {
    // Columns likely don't exist yet — fall back to original schema
    const { data: basic, error: basicErr } = await supabase
      .from("drill_sessions")
      .insert({ user_id: user.id, score, total, date })
      .select("id, date, score, total, completed_at")
      .single();

    if (basicErr) {
      return NextResponse.json({ error: basicErr.message }, { status: 500 });
    }
    sessionData = basic;
    sessionId = basic?.id ?? null;
  } else {
    sessionData = extended;
    sessionId = extended?.id ?? null;
  }

  // Store per-question answers (silently skip if table doesn't exist yet)
  if (sessionId && Array.isArray(answers) && answers.length > 0) {
    const rows = answers.map((a) => ({
      session_id: sessionId,
      user_id: user.id,
      question_id: a.questionId,
      category: a.category,
      was_correct: a.wasCorrect,
    }));
    await supabase.from("drill_question_answers").insert(rows);
    // Ignore errors — table may not exist until migration 002 is applied
  }

  return NextResponse.json({ session: sessionData }, { status: 201 });
}
