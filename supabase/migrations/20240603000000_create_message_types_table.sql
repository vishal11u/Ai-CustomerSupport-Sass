-- Create message_types table to store different message categories
CREATE TABLE IF NOT EXISTS message_types (
    id BIGSERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_message_types_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_message_types_updated_at ON message_types;
CREATE TRIGGER update_message_types_updated_at
    BEFORE UPDATE ON message_types
    FOR EACH ROW
    EXECUTE FUNCTION update_message_types_updated_at();

-- Enable Row Level Security
ALTER TABLE message_types ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Enable read access for all users" ON message_types;
CREATE POLICY "Enable read access for all users" ON message_types
    FOR SELECT
    USING (true);

-- Only allow administrators to modify message types
DROP POLICY IF EXISTS "Enable insert for admins" ON message_types;
CREATE POLICY "Enable insert for admins" ON message_types
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() IN (SELECT user_id FROM administrators));

DROP POLICY IF EXISTS "Enable update for admins" ON message_types;
CREATE POLICY "Enable update for admins" ON message_types
    FOR UPDATE TO authenticated
    USING (auth.uid() IN (SELECT user_id FROM administrators))
    WITH CHECK (auth.uid() IN (SELECT user_id FROM administrators));

DROP POLICY IF EXISTS "Enable delete for admins" ON message_types;
CREATE POLICY "Enable delete for admins" ON message_types
    FOR DELETE TO authenticated
    USING (auth.uid() IN (SELECT user_id FROM administrators));

-- Insert default message types
INSERT INTO message_types (code, name, description, color, icon) 
VALUES 
    ('general', 'General Inquiry', 'General questions and conversations', '#3b82f6', 'message-square'),
    ('feedback', 'Feedback', 'User feedback and suggestions', '#22c55e', 'thumbs-up'),
    ('complaint', 'Complaint', 'User complaints and issues', '#ef4444', 'alert-circle'),
    ('support', 'Technical Support', 'Technical issues and troubleshooting', '#f59e0b', 'tool'),
    ('billing', 'Billing Inquiry', 'Questions about billing and payments', '#8b5cf6', 'credit-card')
ON CONFLICT (code) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    color = EXCLUDED.color,
    icon = EXCLUDED.icon,
    updated_at = NOW();

-- Add foreign key to chat_messages table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'chat_messages') THEN
        -- Check if message_type_id column exists
        IF NOT EXISTS (SELECT FROM information_schema.columns 
                     WHERE table_name = 'chat_messages' AND column_name = 'message_type_id') THEN
            -- Add message_type_id column
            ALTER TABLE chat_messages ADD COLUMN message_type_id BIGINT REFERENCES message_types(id);
            
            -- Update existing records to link to the appropriate message type
            UPDATE chat_messages 
            SET message_type_id = (SELECT id FROM message_types WHERE code = chat_messages.type)
            WHERE type IS NOT NULL;
        END IF;
    END IF;
END $$; 