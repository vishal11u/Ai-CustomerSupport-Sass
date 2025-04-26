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

-- Create policies (allowing all authenticated users to read/write)
DROP POLICY IF EXISTS "Enable read access for all users" ON message_types;
CREATE POLICY "Enable read access for all users" ON message_types
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON message_types;
CREATE POLICY "Enable insert for authenticated users" ON message_types
    FOR INSERT TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for authenticated users" ON message_types;
CREATE POLICY "Enable update for authenticated users" ON message_types
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Enable delete for authenticated users" ON message_types;
CREATE POLICY "Enable delete for authenticated users" ON message_types
    FOR DELETE TO authenticated
    USING (true);

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