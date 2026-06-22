import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { computeStreakFromDates } from "@/lib/utils/streak";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: sessions, error } = await supabase
    .from("drill_sessions")
    .select("id, date, score, total, completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = sessions ?? [];
  const totalAnswered = rows.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = rows.reduce((sum, s) => sum + s.score, 0);
  const accuracy =
    totalAnswered > 0
      ? Math.round((totalCorrect / totalAnswered) * 100)
      : null;
  const currentStreak = computeStreakFromDates(rows.map((s) => s.date));

  return NextResponse.json({
    totalAnswered,
    totalCorrect,
    accuracy,
    currentStreak,
    drillsCompleted: rows.length,
    sessions: rows,
  });
}
