import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

// Temporary route — verifies Sentry is capturing events in production.
// Delete after confirming the event appears in the Sentry dashboard.
export async function GET() {
  Sentry.captureMessage("Sentry integration test — Keep Me Ready", "info");
  return NextResponse.json({ ok: true, message: "Test event sent to Sentry" });
}
