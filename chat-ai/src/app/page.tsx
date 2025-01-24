"use client";

import { useState } from "react";
import { ChatList } from "@/components/chatList";
import Chat from "@/components/chat";

export default function HomePage() {
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  return (
    <div className="flex h-screen">
      {/*Lista de conversas */}
      <ChatList
        currentConversationId={currentConversationId}
        setCurrentConversationId={setCurrentConversationId}
      />

      {/* Area de chat */}
      <div className="flex-grow">
        {currentConversationId ? (
          <Chat currentConversationId={currentConversationId} />
        ) : (
          <p className="text-center text-gray-500 p-4">
            Selecione uma conversa para começar
          </p>
        )}
      </div>
    </div>
  );
}
