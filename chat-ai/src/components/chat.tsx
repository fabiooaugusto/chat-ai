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
  currentConversationId: string | null;
};

export function Chat({ currentConversationId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  // Recuperar mensagens do localStorage ao carregar
  useEffect(() => {
    if (!currentConversationId) {
      setMessages([]); // Limpa mensagens se não houver conversa selecionada
      return;
    }

    const savedMessages = localStorage.getItem(
      `chatHistory-${currentConversationId}`
    );
    setMessages(savedMessages ? JSON.parse(savedMessages) : []);
  }, [currentConversationId]);

  // Atualiza as mensagens quando troca a conversa
  useEffect(() => {
    if (currentConversationId) {
      localStorage.setItem(
        `chatHistory-${currentConversationId}`,
        JSON.stringify(messages)
      );
    }
  }, [messages, currentConversationId]);

  // Enviar mensagem
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputText,
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      if (response.ok) {
        const botResponse: Message = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response,
        };

        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(`chatHistory-${currentConversationId}`);
  };

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
            <strong>{msg.sender === "user" ? "Você" : "Bot"}:</strong>
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
      <Button onClick={clearMessages} className="mt-2" variant="outline">
        Limpar Histórico
      </Button>
    </div>
  );
}

export default Chat;
