# Entrada

- Run ID: 20260903-012713-tab-back-history
- Criado em: 2026-09-03T01:27:13-03:00
- Status: recebido

## Tarefa recebida

Fazer o gesto de voltar retornar à tab anterior

## Objetivo e escopo

Fazer o retorno por gesto/back, após trocar de tab, voltar para a tab visitada
imediatamente antes. O escopo fica restrito à configuração do navigator de tabs.

## CritÃ©rios de aceite

- A sequência Favoritos -> Dashboard -> voltar retorna para Favoritos.
- A tab bar continua com as mesmas telas e ordem.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Usar o comportamento nativo de histórico do `Tabs`.
- Não alterar o histórico de telas internas, autenticação ou rotas.
- Branch atual: `feat-home`.
