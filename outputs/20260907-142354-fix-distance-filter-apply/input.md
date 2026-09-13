# Entrada

- Run ID: 20260907-142354-fix-distance-filter-apply
- Criado em: 2026-09-07T14:23:54-03:00
- Status: recebido

## Objetivo e escopo

Garantir que distância seja o padrão e que a escolha de ordenação seja aplicada à rota e à lista.

## Critérios de aceite

- Escolher distância aplica `sortOrder=distance` mesmo sendo o padrão.
- A-Z e Z-A continuam aplicáveis.
- Existe ação explícita para aplicar filtros.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Preservar alterações preexistentes e o cálculo global de distância.

