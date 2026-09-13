# Entrada

- Run ID: 20260903-011631-fix-tab-bar-after-login
- Criado em: 2026-09-03T01:16:31-03:00
- Status: recebido

## Tarefa recebida

Corrigir a tab bar que não aparece após o login

## Objetivo e escopo

Fazer a tab bar ser carregada ao entrar em `APP_ROUTES.imoveis` após o login,
corrigindo o nome do layout reconhecido pelo Expo Router. O escopo fica restrito
ao layout do grupo `(tabs)` e à documentação desta execução.

## CritÃ©rios de aceite

- O arquivo do layout do grupo de tabs usa o nome reconhecido pelo Expo Router.
- O fluxo de login continua redirecionando para `APP_ROUTES.imoveis`.
- `npm run typecheck` passa sem novos erros.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar a implementação atual da `CustomTabBar`.
- Não alterar autenticação, destinos centralizados ou o desenho da barra.
- Branch atual: `feat-home`; nenhuma troca de branch será feita.
