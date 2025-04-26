-- STEP 1: Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    type TEXT CHECK (type IN ('feedback', 'complaint', 'general')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Add trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_chat_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_chat_messages_updated_at ON chat_messages;
CREATE TRIGGER update_chat_messages_updated_at
    BEFORE UPDATE ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_chat_messages_updated_at();

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON chat_messages;
CREATE POLICY "Enable read access for authenticated users" ON chat_messages
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON chat_messages;
CREATE POLICY "Enable insert for authenticated users" ON chat_messages
    FOR INSERT TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for authenticated users" ON chat_messages;
CREATE POLICY "Enable update for authenticated users" ON chat_messages
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users" ON chat_messages;
CREATE POLICY "Enable delete for authenticated users" ON chat_messages
    FOR DELETE TO authenticated
    USING (true);

-- STEP 2: Insert sample chat messages for demonstration
INSERT INTO chat_messages (user_id, role, content, type, created_at)
VALUES 
  -- General conversation
  ('550e8400-e29b-41d4-a716-446655440000', 'user', 'Hello, I need some help with my account', 'general', NOW() - INTERVAL '3 days'),
  ('550e8400-e29b-41d4-a716-446655440000', 'assistant', 'Hi there! I''d be happy to help with your account. What specific issue are you experiencing?', 'general', NOW() - INTERVAL '3 days' + INTERVAL '1 minute'),
  ('550e8400-e29b-41d4-a716-446655440000', 'user', 'I can''t reset my password', 'general', NOW() - INTERVAL '3 days' + INTERVAL '3 minutes'),
  ('550e8400-e29b-41d4-a716-446655440000', 'assistant', 'I understand that can be frustrating. You can reset your password by clicking on the "Forgot Password" link on the login page. You''ll receive an email with instructions to set a new password. Is there anything else you need help with?', 'general', NOW() - INTERVAL '3 days' + INTERVAL '4 minutes'),
  
  -- Feedback conversation
  ('550e8400-e29b-41d4-a716-446655440000', 'user', 'I really like the new dashboard design!', 'feedback', NOW() - INTERVAL '2 days'),
  ('550e8400-e29b-41d4-a716-446655440000', 'assistant', 'Thank you for your positive feedback about our new dashboard design! We put a lot of effort into making it more intuitive and user-friendly. Is there any specific feature you find particularly helpful?', 'feedback', NOW() - INTERVAL '2 days' + INTERVAL '1 minute'),
  
  -- Complaint conversation
  ('550e8400-e29b-41d4-a716-446655440000', 'user', 'The website is loading very slowly for me today', 'complaint', NOW() - INTERVAL '1 day'),
  ('550e8400-e29b-41d4-a716-446655440000', 'assistant', 'I''m sorry to hear you''re experiencing slow loading times. We''re currently investigating some performance issues. Could you please let me know which browser you''re using and if you''re experiencing this on all pages or just specific ones?', 'complaint', NOW() - INTERVAL '1 day' + INTERVAL '2 minutes'),
  ('550e8400-e29b-41d4-a716-446655440000', 'user', 'I''m using Chrome and it''s happening on every page', 'complaint', NOW() - INTERVAL '1 day' + INTERVAL '5 minutes'),
  ('550e8400-e29b-41d4-a716-446655440000', 'assistant', 'Thank you for that information. Our technical team is working on resolving this issue. In the meantime, you might try clearing your browser cache or using an incognito window, which sometimes helps with performance. We appreciate your patience and will update you once the issue is resolved.', 'complaint', NOW() - INTERVAL '1 day' + INTERVAL '7 minutes'),
  
  -- Another user conversation
  ('660e8400-e29b-41d4-a716-446655440000', 'user', 'How do I upgrade my subscription?', 'general', NOW() - INTERVAL '4 hours'),
  ('660e8400-e29b-41d4-a716-446655440000', 'assistant', 'To upgrade your subscription, go to Account Settings > Subscription and select the plan that best suits your needs. If you have any questions about the different plans and their features, I''d be happy to explain them to you.', 'general', NOW() - INTERVAL '4 hours' + INTERVAL '1 minute'); 