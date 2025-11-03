-- Create the newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'blog',
  unsubscribe_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policy for public insert access (anyone can subscribe)
CREATE POLICY "Anyone can subscribe to newsletter." ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (TRUE);

-- Policy for public read access (only for unsubscribe verification)
CREATE POLICY "Public can read for unsubscribe." ON public.newsletter_subscribers
  FOR SELECT USING (TRUE);

-- Policy for update (for unsubscribe functionality)
CREATE POLICY "Anyone can unsubscribe." ON public.newsletter_subscribers
  FOR UPDATE USING (TRUE);

-- Create index for faster email lookups
CREATE INDEX newsletter_subscribers_email_idx ON public.newsletter_subscribers(email);
CREATE INDEX newsletter_subscribers_active_idx ON public.newsletter_subscribers(is_active);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function before update
CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW EXECUTE FUNCTION public.update_newsletter_updated_at();

