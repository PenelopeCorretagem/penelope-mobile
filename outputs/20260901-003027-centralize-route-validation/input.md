# Entrada

- Run ID: 20260901-003027-centralize-route-validation
- Criado em: 2026-09-01T00:30:27-03:00
- Status: concluido

## Tarefa recebida

Centralizar validacoes de pathname no arquivo de rotas

## Objetivo e escopo

Centralizar em `src/constants/routes.ts` as validacoes de pathname usadas pelo
layout raiz, Header e TabNavigator.

## CritÃ©rios de aceite

- Layout nao possui mais strings soltas para detectar Auth/Configuracoes.
- Header e TabNavigator usam helpers de `routes.ts`.
- O helper reconhece o prefixo fisico `app/` da arvore atual.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar os destinos atuais de `APP_ROUTES`.
- Corrigir apenas o tipo de rota necessario para suportar os helpers.
