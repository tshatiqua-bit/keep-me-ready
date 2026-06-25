-- Run this in the Supabase SQL Editor after 001_init.sql
-- Adds topic and timing tracking to sessions, and per-question answer tracking.

-- Add category and started_at to existing drill_sessions table
ALTER TABLE public.drill_sessions ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.drill_sessions ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ;

-- Index for category analytics
CREATE INDEX IF NOT EXISTS idx_ds_category ON public.drill_sessions(category);
CREATE INDEX IF NOT EXISTS idx_ds_date     ON public.drill_sessions(date);

-- Per-question answer log
CREATE TABLE IF NOT EXISTS public.drill_question_answers (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id  UUID        REFERENCES public.drill_sessions(id) ON DELETE CASCADE NOT NULL,
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  was_correct BOOLEAN     NOT NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.drill_question_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_own_answers" ON public.drill_question_answers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "select_own_answers" ON public.drill_question_answers
  FOR SELECT USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_dqa_question_id ON public.drill_question_answers(question_id);
CREATE INDEX IF NOT EXISTS idx_dqa_category    ON public.drill_question_answers(category);
CREATE INDEX IF NOT EXISTS idx_dqa_user_id     ON public.drill_question_answers(user_id);
