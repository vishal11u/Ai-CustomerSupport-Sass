export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  created_at: string;
}

export interface CategorizedMessages {
  complaints: Message[];
  feedback: Message[];
  queries: Message[];
  user: Message[];
}
