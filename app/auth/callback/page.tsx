"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    // Read params client-side so the browser client has access to the
    // PKCE code_verifier stored in localStorage by signInWithOtp.
    // A server-side Route Handler can only read cookies, not localStorage,
    // so exchangeCodeForSession fails silently when the verifier is there.
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const next = params.get("next") ?? "/dashboard";

    if (!code) {
      setFailed(true);
      router.replace("/auth/login?error=auth_failed");
      return;
    }

    createClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error }) => {
        if (error) {
          setFailed(true);
          router.replace("/auth/login?error=auth_failed");
        } else {
          router.replace(next);
        }
      });
  }, [router]);

  if (failed) return null;

  return (
    <div className="flex items-center justify-center py-24">
      <p className="text-sm text-slate-500">Signing you in…</p>
    </div>
  );
}
