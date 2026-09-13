# Entrada

- Run ID: 20260831-232035-remove-duplicate-router-screens
- Criado em: 2026-08-31T23:20:35-03:00
- Status: concluido

## Tarefa recebida

Remover telas duplicadas da arvore Expo Router que causam nomes aninhados iguais

## Objetivo e escopo

Remover rotas duplicadas dentro das pastas das telas principais do Expo Router,
mantendo um unico `index.tsx` por destino e preservando `APP_ROUTES`.

## CritÃ©rios de aceite

- O export web nao emite `__root > app > home > home`.
- Home, Imoveis, Dashboard e Perfil continuam acessiveis em seus destinos.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Alterar somente a arvore de rotas relacionada ao aviso.
- Nao alterar historico de outputs nem navegacao de produto.
