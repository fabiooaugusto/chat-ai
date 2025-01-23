"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type ChatProps = {
  conversationId: string;
};

export function Chat({ conversationId }: ChatProps) {
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    {}
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  // Recuperar mensagens do localStorage ao carregar
  useEffect(() => {
    const savedChats = localStorage.getItem("chatMessages");
    if (savedChats) {
      setConversations(JSON.parse(savedChats));
    }
  }, []);

  // Atualiza as mensagens quando troca a conversa
  useEffect(() => {
    setMessages(conversations[conversationId] || []);
  }, [conversationId, conversations]);

  // Enviar mensagem
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputText,
    };

    const botResponse: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: "Esta é uma resposta automática!",
    };

    const updatedMessages = [...messages, newMessage, botResponse];

    setConversations((prev) => ({
      ...prev,
      [conversationId]: updatedMessages,
    }));

    setMessages(updatedMessages);
    setInputText("");
  };

  // Salvar no localStorage sempre que as mensagens mudarem
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(conversations));
  }, [conversations]);

  return (
    <div className="p-4">
      <div className="border p-2 h-60 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-1 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <strong>{msg.sender === "user" ? "Você" : "Bot"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <Textarea
        placeholder="Digite sua mensagem..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button onClick={sendMessage} className="mt-2">
        Enviar Mensagem
      </Button>
    </div>
  );
}

export default Chat;
