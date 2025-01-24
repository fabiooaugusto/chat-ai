import type { NextApiRequest, NextApiResponse } from "next";

const botResponses = [
  "Olá! Como posso te ajudar?",
  "Isso é interessante! Me conte mais.",
  "Hmmm... Vou pensar sobre isso!",
  "Parece uma ótima ideia!",
  "Desculpe, não entendi. Pode reformular?",
  "Estou aqui para te ajudar!",
  "Que legal! Conte-me mais sobre isso.",
  "Isso é um desafio interessante!",
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message } = req.body; // Mensagem enviada pelo usuário

    if (!message) {
      return res.status(400).json({ error: "Mensagem não fornecida" });
    }

    // Selecionar uma resposta aleatória do bot
    const response =
      botResponses[Math.floor(Math.random() * botResponses.length)];

    return res.status(200).json({ response });
  }

  return res.status(405).json({ error: "Método não permitido" });
}
