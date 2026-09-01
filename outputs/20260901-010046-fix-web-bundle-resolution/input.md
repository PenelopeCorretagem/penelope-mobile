# Entrada

- Run ID: 20260901-010046-fix-web-bundle-resolution
- Criado em: 2026-09-01T01:00:47-03:00
- Status: concluido

## Tarefa recebida

Corrigir erro 500 do bundle web causado por import de AdvertisementCard inexistente

## Objetivo e escopo

Corrigir o HTTP 500 do Metro web e o MIME application/json causado pela falha de
resolucao do bundle.

## CritÃ©rios de aceite

- O bundle web compila com sucesso.
- O barrel de AdvertisementCard aponta para arquivo existente.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Preservar as alteracoes preexistentes de rotas e autenticacao.
