-- Add message_type_id column to chat_messages table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.columns 
                  WHERE table_name = 'chat_messages' AND column_name = 'message_type_id') THEN
        -- Add column 
        ALTER TABLE chat_messages ADD COLUMN message_type_id BIGINT;
        
        -- Add foreign key constraint
        ALTER TABLE chat_messages 
        ADD CONSTRAINT fk_message_type 
        FOREIGN KEY (message_type_id) 
        REFERENCES message_types(id);
    END IF;
END $$; 