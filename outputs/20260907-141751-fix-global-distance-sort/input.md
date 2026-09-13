# Entrada

- Run ID: 20260907-141751-fix-global-distance-sort
- Criado em: 2026-09-07T14:17:51-03:00
- Status: recebido

## Objetivo e escopo

Corrigir a ordenacao global dos imoveis por distancia depois que os grupos de tipo sao concatenados.

## Criterios de aceite

- A ordenacao por distancia compara imoveis de todos os grupos em uma unica lista.
- A paginacao aplica-se somente depois da ordenacao global.
- O fallback de ordenacao nao usa mais o valor invalido `none`.
- `npm run typecheck` passa.

## Restricoes, suposicoes e fora do escopo

- Preservar o comportamento de filtros, favoritos e ordenacao alfabetica.
- Nao alterar mudancas preexistentes em `app.json` ou no servico de anuncios.

