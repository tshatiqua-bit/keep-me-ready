"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export default function NavUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-slate-500 truncate max-w-[160px]">
          {user.email}
        </span>
        <a
          href="/auth/logout"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Sign out
        </a>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-400"
    >
      Sign in
    </Link>
  );
}
