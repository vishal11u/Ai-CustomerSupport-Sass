# Supabase Migrations

This directory contains SQL migrations for your Supabase project.

## Applying Migrations

You can apply migrations through the Supabase dashboard or using the Supabase CLI.

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the migration file (e.g., `20240601000000_create_chat_messages.sql`)
4. Paste into the SQL Editor and run the query

### Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db push
```

## Chat Messages Table

The `chat_messages` table stores all conversations between users and the AI assistant. It supports three message types:

- **Feedback**: User feedback and suggestions
- **Complaint**: User complaints and issues
- **General**: General inquiries and conversations

The table schema includes:
- `id`: Unique identifier
- `user_id`: UUID of the user
- `role`: Either 'user' or 'assistant'
- `content`: Message content
- `type`: Message type ('feedback', 'complaint', or 'general')
- `created_at`: Timestamp when the message was created
- `updated_at`: Timestamp when the message was last updated 