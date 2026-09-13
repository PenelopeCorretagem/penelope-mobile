# Entrada

- Run ID: 20260913-083342-split-property-types-and-normalize-domain
- Criado em: 2026-09-13T08:33:42-03:00
- Status: recebido

## Tarefa recebida

Separar cada type de advertisement em arquivo proprio e substituir Estate por Property no dominio, mantendo campos externos da API no normalizador

## Objetivo e escopo

Separar cada type de `src/modules/properties/types` em seu proprio arquivo e
renomear o dominio `Estate` para `Property`, incluindo a propriedade de dominio
do anuncio. O campo `estate` recebido da API permanece apenas no normalizador.

## Criterios de aceite

- Cada type possui arquivo proprio.
- Os nomes `EstateType`, `EstateImage` e `Estate` nao existem no dominio.
- `Advertisement` usa `property` em vez de `estate`.
- O normalizador converte o payload externo sem expor `estate` ao restante do app.
- `npm run typecheck` passa.

## Restricoes, suposicoes e fora do escopo

- Preservar o payload externo da API e os textos da interface.
- Nao alterar DTOs de transporte que ja representam contratos externos.
- Branch atual: `detalhes-imovel`.
