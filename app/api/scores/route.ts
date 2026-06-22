import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { score, total, date } = body as {
    score: number;
    total: number;
    date: string;
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

  const { data, error } = await supabase
    .from("drill_sessions")
    .insert({ user_id: user.id, score, total, date })
    .select("id, date, score, total, completed_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ session: data }, { status: 201 });
}
