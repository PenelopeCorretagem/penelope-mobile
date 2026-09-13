# Entrada

- Run ID: 20260913-085115-fix-property-media-type-runtime
- Criado em: 2026-09-13T08:51:15-03:00
- Status: recebido

## Tarefa recebida

Corrigir crash na normalizacao de tipos de midia do PropertyDetails

## Objetivo e escopo

Corrigir o crash em `propertyMediaService.ts` durante a conversão de tipos de mídia.

## Critérios de aceite

- Tipos inválidos não derrubam a tela.
- O Service aceita `descricao` e `description`.
- Respostas não-array não causam erro em `map` ou `flatMap`.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Manter `PropertyMediaDto` e não alterar a UI.
- Branch atual: `detalhes-imovel`.
