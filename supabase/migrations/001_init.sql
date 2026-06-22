-- Run this in the Supabase SQL editor: supabase.com → your project → SQL Editor

CREATE TABLE IF NOT EXISTS public.drill_sessions (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date         DATE        NOT NULL,
  score        INTEGER     NOT NULL CHECK (score >= 0),
  total        INTEGER     NOT NULL CHECK (total > 0),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.drill_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.drill_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own" ON public.drill_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
