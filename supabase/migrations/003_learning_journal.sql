-- Migration 003: Learning Journal
-- Persists journal entries written in ScoreDisplay so they survive across
-- devices and don't live only in localStorage.

CREATE TABLE IF NOT EXISTS public.learning_journal (
  id          TEXT        PRIMARY KEY,            -- "${category}-${Date.now()}" from client
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category    TEXT        NOT NULL,
  concept_id  TEXT        NOT NULL,
  topic_title TEXT        NOT NULL,
  prompt      TEXT        NOT NULL,
  text        TEXT        NOT NULL,
  date        DATE        NOT NULL,
  saved_at    TIMESTAMPTZ NOT NULL
);

ALTER TABLE public.learning_journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_own_journal" ON public.learning_journal
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "select_own_journal" ON public.learning_journal
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "delete_own_journal" ON public.learning_journal
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_lj_user_id  ON public.learning_journal (user_id);
CREATE INDEX IF NOT EXISTS idx_lj_saved_at ON public.learning_journal (saved_at DESC);
