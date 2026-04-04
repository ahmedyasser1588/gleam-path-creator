
CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('next_year_wish', 'lifelong_dream', 'letter_to_future')),
  content TEXT NOT NULL,
  sender_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert wishes" ON public.wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view wishes" ON public.wishes FOR SELECT USING (true);
