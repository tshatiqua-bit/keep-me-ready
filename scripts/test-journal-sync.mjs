/**
 * End-to-end test for the learning_journal table and API logic.
 * Uses the service role key to bypass RLS so we can run without a real user session.
 *
 * Run with:
 *   node scripts/test-journal-sync.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

// Node 20 lacks native WebSocket. We don't use Realtime in this script, so a
// stub is enough to get past the Supabase client constructor check.
if (!globalThis.WebSocket) {
  globalThis.WebSocket = class StubWebSocket {
    constructor() {}
    close() {}
  };
}

// ── load .env.local ──────────────────────────────────────────────────────────
const env = {};
try {
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .forEach((line) => {
      const [k, ...rest] = line.split("=");
      if (k && !k.startsWith("#")) env[k.trim()] = rest.join("=").trim();
    });
} catch {
  console.error("Could not read .env.local");
  process.exit(1);
}

const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_ROLE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || SUPABASE_URL.includes("placeholder")) {
  console.error("❌  NEXT_PUBLIC_SUPABASE_URL is not set — update .env.local with your real Supabase URL");
  process.exit(1);
}
if (!SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.includes("placeholder")) {
  console.error("❌  SUPABASE_SERVICE_ROLE_KEY is not set — add it to .env.local (server-side only, never committed)");
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Notify PostgREST to reload its schema cache so newly created tables are visible
async function reloadSchemaCache() {
  const projectRef = new URL(SUPABASE_URL).hostname.split(".")[0];
  try {
    await fetch(
      `https://api.supabase.com/v1/projects/${projectRef}/database/pgrst/reload-schema`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${SERVICE_ROLE_KEY}` },
      }
    );
    // Give PostgREST a moment to reload
    await new Promise((r) => setTimeout(r, 2000));
  } catch {
    // Management API unavailable — fall through, cache may already be current
  }
}

// ── helpers ──────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function ok(label) {
  console.log(`  ✓  ${label}`);
  passed++;
}

function fail(label, detail) {
  console.error(`  ✗  ${label}`);
  if (detail) console.error(`     ${detail}`);
  failed++;
}

// ── tests ────────────────────────────────────────────────────────────────────
async function run() {
  console.log("\nKeep Me Ready — Learning Journal sync test\n");

  console.log("0. Reloading PostgREST schema cache…");
  await reloadSchemaCache();

  // 1. Table exists and has correct columns
  console.log("1. Schema check");
  const { data: cols, error: colErr } = await admin
    .from("learning_journal")
    .select("id, user_id, category, concept_id, topic_title, prompt, text, date, saved_at")
    .limit(0);
  if (colErr) { fail("Table exists with expected columns", colErr.message); process.exit(1); }
  ok("Table exists with all expected columns");

  // Create a real auth user so the FK constraint is satisfied
  console.log("\n2. Create ephemeral test user");
  const testEmail = `test-journal-${Date.now()}@keep-me-ready.test`;
  const { data: newUser, error: createErr } = await admin.auth.admin.createUser({
    email: testEmail,
    password: "Test-password-123!",
    email_confirm: true,
  });
  if (createErr || !newUser?.user) {
    fail("Create test user", createErr?.message ?? "no user returned");
    process.exit(1);
  }
  ok(`Test user created (${newUser.user.id})`);
  const TEST_USER_ID = newUser.user.id;

  const TEST_ENTRY = {
    id: `debits_credits-${Date.now()}`,
    user_id: TEST_USER_ID,
    category: "debits_credits",
    concept_id: "debits_credits",
    topic_title: "Debits & Credits",
    prompt: "What is the normal balance of an asset account?",
    text: "Asset accounts have a debit normal balance — they increase with debits and decrease with credits.",
    date: new Date().toISOString().slice(0, 10),
    saved_at: new Date().toISOString(),
  };

  // 3. INSERT via upsert (mirrors what /api/journal POST does)
  console.log("\n3. Insert test entry");
  const { error: insertErr } = await admin
    .from("learning_journal")
    .upsert([TEST_ENTRY], { onConflict: "id" });
  if (insertErr) fail("Upsert insert succeeded", insertErr.message);
  else ok("Upsert insert succeeded");

  // 4. SELECT — row comes back with correct field values
  console.log("\n4. Read it back");
  const { data: rows, error: selectErr } = await admin
    .from("learning_journal")
    .select("*")
    .eq("id", TEST_ENTRY.id);
  if (selectErr) {
    fail("SELECT returned the row", selectErr.message);
  } else if (!rows || rows.length === 0) {
    fail("SELECT returned the row", "no rows found");
  } else {
    const row = rows[0];
    ok("Row returned");
    if (row.category === TEST_ENTRY.category) ok("category matches");
    else fail("category matches", `got '${row.category}'`);
    if (row.concept_id === TEST_ENTRY.concept_id) ok("concept_id matches");
    else fail("concept_id matches", `got '${row.concept_id}'`);
    if (row.topic_title === TEST_ENTRY.topic_title) ok("topic_title matches");
    else fail("topic_title matches", `got '${row.topic_title}'`);
    if (row.text === TEST_ENTRY.text) ok("text matches");
    else fail("text matches", `got '${row.text}'`);
  }

  // 5. Upsert idempotency — same id, no duplicate row
  console.log("\n5. Upsert idempotency (re-insert same id)");
  const { error: upsertErr } = await admin
    .from("learning_journal")
    .upsert([TEST_ENTRY], { onConflict: "id" });
  if (upsertErr) fail("Re-upsert same id is idempotent", upsertErr.message);
  else ok("Re-upsert same id is idempotent");

  const { data: afterUpsert } = await admin
    .from("learning_journal")
    .select("id")
    .eq("id", TEST_ENTRY.id);
  if (afterUpsert?.length === 1) ok("Still exactly one row after re-upsert");
  else fail("Still exactly one row after re-upsert", `got ${afterUpsert?.length} rows`);

  // 6. RLS — anonymous client gets 0 rows (cannot see other users' entries)
  console.log("\n6. RLS policies");
  const ANON_KEY = env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
  if (ANON_KEY && !ANON_KEY.includes("placeholder")) {
    const anon = createClient(SUPABASE_URL, ANON_KEY);
    const { data: anonRows, error: anonErr } = await anon
      .from("learning_journal")
      .select("id");
    if (anonErr && anonErr.code === "42501") {
      ok("Anonymous query correctly blocked by RLS");
    } else if (!anonRows || anonRows.length === 0) {
      ok("Anonymous query returns 0 rows (RLS working)");
    } else {
      fail("RLS blocks anonymous reads", `returned ${anonRows.length} rows`);
    }
  } else {
    console.log("  -  Skipped anon RLS check (anon key is placeholder)");
  }

  // 7. Cleanup — delete test row then test user
  console.log("\n7. Cleanup");
  const { error: delRowErr } = await admin
    .from("learning_journal")
    .delete()
    .eq("id", TEST_ENTRY.id);
  if (delRowErr) fail("Test row deleted", delRowErr.message);
  else ok("Test row deleted");

  const { error: delUserErr } = await admin.auth.admin.deleteUser(TEST_USER_ID);
  if (delUserErr) fail("Test user deleted", delUserErr.message);
  else ok("Test user deleted");

  // ── summary ──────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(40)}`);
  console.log(`  ${passed} passed   ${failed} failed`);
  if (failed === 0) console.log("\n  All checks passed — journal sync is ready.\n");
  else console.log("\n  Some checks failed — see above.\n");

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error("Unexpected error:", e);
  process.exit(1);
});
