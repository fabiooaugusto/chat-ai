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

/*export function getBotResponse(): string {
  const randomIndex = Math.floor(Math.random() * botResponses.length);
  return botResponses[randomIndex];
}*/
let botResponseIndex = 0;
export function getBotResponse(): string {
  if (botResponseIndex < botResponses.length) {
    const response = botResponses[botResponseIndex];
    botResponseIndex += 1; // Incrementa o índice para a próxima resposta
    return response;
  } else {
    // Resetar o índice ou retornar uma mensagem padrão
    botResponseIndex = 0; // Reseta o índice para começar de novo
    return "Incrivel, você está indo bem!";
  }
}
