import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface JournalEntryInput {
  id: string;
  category: string;
  conceptId: string;
  topicTitle: string;
  prompt: string;
  text: string;
  date: string;
  savedAt: string;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("learning_journal")
    .select("id, category, concept_id, topic_title, prompt, text, date, saved_at")
    .eq("user_id", user.id)
    .order("saved_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return in the same camelCase shape the client components expect
  const entries = (data ?? []).map((row) => ({
    id: row.id,
    category: row.category,
    conceptId: row.concept_id,
    topicTitle: row.topic_title,
    prompt: row.prompt,
    text: row.text,
    date: row.date,
    savedAt: row.saved_at,
  }));

  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { entries: JournalEntryInput[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const entries = body?.entries;
  if (!Array.isArray(entries) || entries.length === 0) {
    return NextResponse.json({ error: "entries array required" }, { status: 400 });
  }

  const rows = entries.map((e) => ({
    id: e.id,
    user_id: user.id,
    category: e.category,
    concept_id: e.conceptId,
    topic_title: e.topicTitle,
    prompt: e.prompt,
    text: e.text,
    date: e.date,
    saved_at: e.savedAt,
  }));

  // upsert so re-runs after a partial merge are idempotent
  const { error } = await supabase
    .from("learning_journal")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, saved: rows.length });
}
