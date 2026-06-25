"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
        router.replace(!error ? next : "/auth/login?error=auth_failed");
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
        router.replace(next);
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
