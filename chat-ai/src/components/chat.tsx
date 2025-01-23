"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");

  // Recuperar mensagens do localStorage ao carregar a página
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  //Salvar mensagens no localStorage sempre que o state mudar
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Função para enviar mensagem
  const sendMessage = () => {
    if (!inputText.trim()) return; // Não enviar mensagem vazia

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputText,
    };

    // Simulando resposta do assistente
    const botResponse: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: "Esta é uma resposta automática!",
    };

    setMessages([...messages, newMessage, botResponse]);
    setInputText(""); // Limpar o campo de texto após envio
  };

  return (
    <main>
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

        <div className="grid w-full gap-2 mt-4">
          <Textarea
            placeholder="Digite sua mensagem aqui..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // Atualizar o estado com o valor do textarea
          />
          <Button onClick={sendMessage}>Enviar Mensagem</Button>
        </div>
      </div>
    </main>
  );
}

export default Chat;
