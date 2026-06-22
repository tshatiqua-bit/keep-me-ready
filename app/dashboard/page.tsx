import { createClient } from "@/lib/supabase/server";
import { computeStreakFromDates } from "@/lib/utils/streak";
import DashboardView from "@/components/DashboardView";
import type { DbDashboardData } from "@/components/DashboardView";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let dbData: DbDashboardData | null = null;

  if (user) {
    const { data: sessions } = await supabase
      .from("drill_sessions")
      .select("id, date, score, total, completed_at")
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(30);

    const rows = sessions ?? [];
    const totalAnswered = rows.reduce((sum, s) => sum + s.total, 0);
    const totalCorrect = rows.reduce((sum, s) => sum + s.score, 0);

    dbData = {
      totalAnswered,
      totalCorrect,
      accuracy:
        totalAnswered > 0
          ? Math.round((totalCorrect / totalAnswered) * 100)
          : null,
      currentStreak: computeStreakFromDates(rows.map((s) => s.date)),
      drillsCompleted: rows.length,
      sessions: rows.map((s) => ({
        id: s.id,
        date: s.date,
        score: s.score,
        total: s.total,
      })),
    };
  }

  return <DashboardView user={user} dbData={dbData} />;
}
