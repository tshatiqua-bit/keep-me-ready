"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface JournalEntry {
  id: string;
  category: string;
  conceptId: string;
  topicTitle: string;
  prompt: string;
  text: string;
  date: string;
  savedAt: string;
}

async function mergeLocalJournalToDb(): Promise<void> {
  let entries: JournalEntry[];
  try {
    entries = JSON.parse(localStorage.getItem("kmr-journal") ?? "[]");
    if (!entries.length) return;
  } catch {
    return;
  }

  const res = await fetch("/api/journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entries }),
  });

  if (res.ok) {
    localStorage.removeItem("kmr-journal");
  }
}

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const next = params.get("next") ?? "/dashboard";
    const supabase = createClient();

    if (code) {
      // PKCE flow: Supabase sent ?code= — exchange it for a session.
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          router.replace("/auth/login?error=auth_failed");
          return;
        }
        mergeLocalJournalToDb().catch(() => {}).finally(() => router.replace(next));
      });
      return;
    }

    // Implicit flow: tokens arrive as URL hash fragments (#access_token=...).
    // createBrowserClient parses the hash automatically and emits SIGNED_IN.
    // We wait for that event before redirecting; give up after 4 s.
    let timeoutId: ReturnType<typeof setTimeout>;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        clearTimeout(timeoutId);
        subscription.unsubscribe();
        mergeLocalJournalToDb().catch(() => {}).finally(() => router.replace(next));
      }
    });

    timeoutId = setTimeout(() => {
      subscription.unsubscribe();
      router.replace("/auth/login?error=auth_failed");
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <div className="flex items-center justify-center py-24">
      <p className="text-sm text-slate-500">Signing you in…</p>
    </div>
  );
}
