-- Create enum for message categories
CREATE TYPE message_category AS ENUM ('feedback', 'complaint', 'general');

-- Create chat_categories table
CREATE TABLE chat_categories (
    id BIGSERIAL PRIMARY KEY,
    name message_category NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create message_categories table to track message categorization
CREATE TABLE message_categories (
    id BIGSERIAL PRIMARY KEY,
    message_id BIGINT REFERENCES chat_messages(id) ON DELETE CASCADE,
    category_id BIGINT REFERENCES chat_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(message_id, category_id)
);

-- Insert default categories
INSERT INTO chat_categories (name, description, icon, color) VALUES
    ('feedback', 'User feedback and suggestions', 'thumbs-up', '#22c55e'),
    ('complaint', 'User complaints and issues', 'alert-circle', '#ef4444'),
    ('general', 'General inquiries and conversations', 'message-square', '#3b82f6');

-- Add indexes for better query performance
CREATE INDEX idx_message_categories_message_id ON message_categories(message_id);
CREATE INDEX idx_message_categories_category_id ON message_categories(category_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chat_categories_updated_at
    BEFORE UPDATE ON chat_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_message_categories_updated_at
    BEFORE UPDATE ON message_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE chat_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON chat_categories
    FOR SELECT USING (true);

CREATE POLICY "Enable read access for authenticated users" ON message_categories
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON message_categories
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Function to categorize messages
CREATE OR REPLACE FUNCTION categorize_message()
RETURNS TRIGGER AS $$
DECLARE
    category_id BIGINT;
    content_text TEXT;
BEGIN
    -- Extract content text from jsonb if needed
    IF jsonb_typeof(NEW.content::jsonb) = 'object' THEN
        content_text := LOWER(NEW.content::jsonb->>'message');
    ELSE
        content_text := LOWER(NEW.content);
    END IF;

    -- Determine category based on content
    IF content_text LIKE '%feedback%' OR content_text LIKE '%suggest%' OR content_text LIKE '%improve%' THEN
        SELECT id INTO category_id FROM chat_categories WHERE name = 'feedback';
    ELSIF content_text LIKE '%complaint%' OR content_text LIKE '%issue%' OR content_text LIKE '%problem%' THEN
        SELECT id INTO category_id FROM chat_categories WHERE name = 'complaint';
    ELSE
        SELECT id INTO category_id FROM chat_categories WHERE name = 'general';
    END IF;

    -- Insert into message_categories
    INSERT INTO message_categories (message_id, category_id)
    VALUES (NEW.id, category_id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically categorize messages
CREATE TRIGGER categorize_new_message
    AFTER INSERT ON chat_messages
    FOR EACH ROW
    EXECUTE FUNCTION categorize_message(); 