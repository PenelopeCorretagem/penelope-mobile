# Entrada

- Run ID: 20260901-020037-restore-bundle-imports
- Criado em: 2026-09-01T02:00:37-03:00
- Status: concluido

## Tarefa recebida

Corrigir imports quebrados que causavam HTTP 500 no bundle web

## Objetivo e escopo

Corrigir o erro HTTP 500 do bundle web causado por imports para módulos que não
existem mais após a reorganização do projeto.

## CritÃ©rios de aceite

- O export web compila sem erro.
- O typecheck passa.
- Os imports usam os caminhos atuais.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Preservar as mudanças recentes de autenticação, rotas e LoadingView.
