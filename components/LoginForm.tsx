"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="text-center py-4">
        <p className="font-semibold text-slate-800 mb-2">Check your inbox</p>
        <p className="text-sm text-slate-500">
          We sent a magic link to <strong>{email}</strong>. Click it to sign in
          — no password needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleEmail} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
      />
      {error && <p className="text-red-600 dark:text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send magic link"}
      </button>
    </form>
  );
}
