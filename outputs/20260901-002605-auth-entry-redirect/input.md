# Entrada

- Run ID: 20260901-002605-auth-entry-redirect
- Criado em: 2026-09-01T00:26:05-03:00
- Status: concluido

## Tarefa recebida

Redirecionar a entrada inicial para Home quando autenticado e para Login quando nao autenticado

## Objetivo e escopo

Redirecionar a entrada `/` para Home quando houver sessao autenticada e para
`auth/login` quando nao houver sessao.

## CritÃ©rios de aceite

- Login marca a sessao como autenticada.
- A raiz redireciona para `APP_ROUTES.app.home` ou `APP_ROUTES.auth.login`.
- Sair limpa a sessao e vai para login.
- `npm run typecheck` e export web passam.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- O projeto nao possui persistencia de token; a sessao sera mantida em memoria
	durante a execucao do app.
