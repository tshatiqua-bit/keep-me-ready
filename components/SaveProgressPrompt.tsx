"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SaveProgressPrompt() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user);
    });
  }, []);

  // null = still checking; true = logged in, hide prompt
  if (loggedIn !== false) return null;

  return (
    <p className="mt-6 text-sm text-slate-400">
      <Link href="/auth/login" className="text-indigo-600 hover:underline font-medium">
        Create a free account
      </Link>{" "}
      to save your streak and access your progress on any device.
    </p>
  );
}
