-- Create a user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  settings JSONB NOT NULL DEFAULT '{
    "notifications": true,
    "darkMode": false,
    "language": "en",
    "timezone": "UTC",
    "marketingEmails": false,
    "productUpdates": true,
    "fontSize": "medium",
    "colorTheme": "default",
    "dateFormat": "MM/DD/YYYY",
    "currency": "USD"
  }'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS user_settings_user_id_idx ON user_settings(user_id);

-- Add RLS policies to restrict access to own data
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy for users to select only their own settings
CREATE POLICY "Users can view their own settings"
  ON user_settings
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Policy for users to insert their own settings
CREATE POLICY "Users can insert their own settings"
  ON user_settings
  FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Policy for users to update their own settings
CREATE POLICY "Users can update their own settings"
  ON user_settings
  FOR UPDATE
  USING (auth.uid()::text = user_id); 