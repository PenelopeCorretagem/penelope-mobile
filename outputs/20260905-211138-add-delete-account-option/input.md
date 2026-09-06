# Entrada

- Run ID: 20260905-211138-add-delete-account-option
- Criado em: 2026-09-05T21:11:38-03:00
- Status: concluída

## Tarefa recebida

Adicionar opção de exclusão de conta na tela de Configurações com confirmação e preservação do fluxo existente

## Objetivo e escopo

Adicionar a opção destrutiva de exclusão de conta na tela de Configurações, com confirmação nativa e reutilização do fluxo de autenticação existente.

## CritÃ©rios de aceite

- A opção aparece com ícone de lixeira e cor de erro.
- A ação solicita confirmação e permite cancelar.
- A confirmação encerra a sessão mockada e retorna à entrada.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Não existe API ou persistência real de usuário; `deleteAccount` usa o AuthContext existente.
- Não foram adicionadas dependências nem alteradas outras telas.
