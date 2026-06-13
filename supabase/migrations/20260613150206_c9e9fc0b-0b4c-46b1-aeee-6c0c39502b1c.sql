
-- Places wishlist (shared between you and Eso)
CREATE TABLE public.places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  visited boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  visited_at timestamptz
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.places TO anon, authenticated;
GRANT ALL ON public.places TO service_role;

ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view places" ON public.places FOR SELECT USING (true);
CREATE POLICY "Anyone can add places" ON public.places FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update places" ON public.places FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete places" ON public.places FOR DELETE USING (true);

-- Visit counter (single global row) for flower garden streak
CREATE TABLE public.visit_stats (
  id text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.visit_stats TO anon, authenticated;
GRANT ALL ON public.visit_stats TO service_role;

ALTER TABLE public.visit_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view stats" ON public.visit_stats FOR SELECT USING (true);
CREATE POLICY "Anyone can upsert stats" ON public.visit_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update stats" ON public.visit_stats FOR UPDATE USING (true);

INSERT INTO public.visit_stats (id, count) VALUES ('flower_garden', 0);

-- Atomic increment function so concurrent visits don't lose counts
CREATE OR REPLACE FUNCTION public.increment_visit(stat_id text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count integer;
BEGIN
  INSERT INTO public.visit_stats (id, count) VALUES (stat_id, 1)
  ON CONFLICT (id) DO UPDATE
    SET count = public.visit_stats.count + 1,
        updated_at = now()
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_visit(text) TO anon, authenticated;
