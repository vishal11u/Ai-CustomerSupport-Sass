import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ClientChatPage } from "./client";

export default async function ChatPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <ClientChatPage userId={userId} />;
}
