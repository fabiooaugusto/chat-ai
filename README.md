
# PS <img src="https://cdn.prod.website-files.com/65155fabb679475d43638cde/651ea5768a91286dcad5a19b_Logo.png" width= "30"> Tech4Humans

## Visão Geral

Este é um chat interativo desenvolvido com **Next.js, TypeScript, Tailwind CSS e shadcn/ui**, utilizando o padrão **Backend for Frontend (BFF)**.

A API do servidor processa mensagens e retorna respostas aleatórias para simular uma conversa.

## Tecnologias Utilizadas

- **Next.js** (v13+)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React**
- **LocalStorage**

## 📁 Estrutura do Projeto

```
/src
├── /components
│ ├── Chat.tsx # Componente principal do chat
│ ├── ui/ # Componentes de UI do shadcn
│
├── /app
│ ├── page.tsx # Página principal do chat
│
├── /pages/api
│ ├── api/chatBot.ts # API para o Backend for Frontend (BFF)
│
│ ├── /styles
│ ├── globals.css # Estilos globais
```

## Como Rodar o Projeto

### 1️ Instale as dependências

```bash
npm install
# ou
yarn install
```

### 2️ Inicie o servidor de desenvolvimento

```
npm run dev
# ou
yarn dev
```

O projeto estará disponível em http://localhost:3000

## Funcionalidades

- **Interface de chat interativa**
- **Histórico de conversas salvo no LocalStorage**
- **Mensagens processadas pelo BFF (API do Next.js)**
- **Respostas do bot aleatórias**
- **Estilização com Tailwind CSS e shadcn/ui**

## API - Backend for Frontend (BFF)

A API do chat está em /pages/api/chatBot.ts e funciona como um intermediário entre o front-end e as respostas do bot.

### Endpoint:

```
http

POST /api/chat
```

### Parametro de entrada

```
json

{
  "message": "Olá, bot!"
}
```

### Resposta do servidor

```
json

{
  "response": "Olá! Como posso te ajudar?"
}
```

### Explicação do Backend for Frontend (BFF)

O BFF (Backend for Frontend) é um padrão arquitetural onde o front-end se comunica apenas com um backend dedicado, em vez de acessar diretamente várias APIs externas. No nosso caso:

O Next.js API (/api/chatBot.ts) age como o BFF.
O chat envia mensagens para /api/chat, que processa a mensagem e responde.
O front-end não interage diretamente com serviços externos.

### Benefícios do BFF no projeto:

Melhora a segurança, evitando exposição direta de APIs externas.
Permite manipulação e formatação de dados antes de chegar ao front-end.
Facilita testes e manutenção da aplicação.

### Histórico de Conversas

O histórico de mensagens é armazenado no LocalStorage. Para cada conversa, as mensagens são salvas com a chave:

```
chatHistory-{conversationId}
```

Isso permite recuperar mensagens antigas ao alternar entre conversas.

**Existe um bug ao recarregar a pagina**

Quando recarrrecamos a pagina, o historico da conversa selecionada é excluido, ainda não descobri o motivo, mas deixo em aberto para melhorias futuras.
