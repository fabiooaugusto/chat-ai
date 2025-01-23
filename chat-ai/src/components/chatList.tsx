"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type ChatConversation = {
  id: string;
  name: string;
};

type ChatListProps = {
  currentConversationId: string | null;
  setCurrentConversationId: (id: string | null) => void;
};

export function ChatList({
  currentConversationId,
  setCurrentConversationId,
}: ChatListProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [editName, setEditName] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Recuperar conversas do localStorage ao carregar a página
  useEffect(() => {
    const savedConversations = localStorage.getItem("chatConversations");
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Salvar conversas no localStorage sempre que o state mudar
  useEffect(() => {
    localStorage.setItem("chatConversations", JSON.stringify(conversations));
  }, [conversations]);

  // Criar uma nova conversa
  const createNewConversation = () => {
    const newConversation: ChatConversation = {
      id: Date.now().toString(),
      name: "Nova Conversa",
    };

    setConversations([...conversations, newConversation]);
    setCurrentConversationId(newConversation.id);
  };

  // Atualizar nome da conversa
  const renameConversation = (id: string, newName: string) => {
    setConversations((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, name: newName } : chat))
    );
    setEditingId(null);
  };

  // Deletar conversa
  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((chat) => chat.id !== id));
    // Se a conversa deletada era a atual, resetamos para null
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  };

  return (
    <div className="border-r p-4 w-64">
      <h2 className="text-lg font-semibold mb-2">Conversas</h2>
      {conversations.map((chat) => (
        <div
          key={chat.id}
          className="flex justify-between items-center p-2 border rounded mb-2"
        >
          {editingId === chat.id ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border p-1 rounded w-40"
              autoFocus
            />
          ) : (
            <button
              className={`text-left flex-grow ${
                currentConversationId === chat.id ? "font-bold" : ""
              }`}
              onClick={() => setCurrentConversationId(chat.id)}
            >
              {chat.name}
            </button>
          )}

          {editingId === chat.id ? (
            <button
              className="text-green-500 ml-2"
              onClick={() => renameConversation(chat.id, editName)}
            >
              💾
            </button>
          ) : (
            <button
              className="text-blue-500 ml-2"
              onClick={() => setEditingId(chat.id)}
            >
              ✏️
            </button>
          )}

          <button
            className="text-red-500 ml-2"
            onClick={() => deleteConversation(chat.id)}
          >
            🗑
          </button>
        </div>
      ))}
      <Button onClick={createNewConversation} className="w-full mt-2">
        ➕ Nova Conversa
      </Button>
    </div>
  );
}
