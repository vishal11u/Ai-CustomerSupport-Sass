-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.chat_messages;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.chat_messages;

-- Create policy for inserting messages
CREATE POLICY "Enable insert for authenticated users" 
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for reading messages
CREATE POLICY "Enable read access for authenticated users" 
ON public.chat_messages
FOR SELECT
TO authenticated
USING (true);

-- Create policy for updating messages
CREATE POLICY "Enable update for authenticated users" 
ON public.chat_messages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy for deleting messages
CREATE POLICY "Enable delete for authenticated users" 
ON public.chat_messages
FOR DELETE
TO authenticated
USING (true); 