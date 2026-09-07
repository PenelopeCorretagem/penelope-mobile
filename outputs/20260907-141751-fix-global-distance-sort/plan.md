# Planejamento

- Status: concluído

## Contexto e modulo

O ViewModel concatena os grupos retornados por `getFilteredGroups` e depois pagina a lista. A ordenacao por grupo no Model nao garante ordem global.

## Plano de implementacao

1. Exportar o helper puro de ordenacao.
2. Reordenar a lista concatenada no ViewModel antes do `slice` de paginacao.
3. Trocar o fallback residual `none` do filtro por `distance`.
4. Rodar typecheck e validar os outputs.

## Validacao e riscos

Validar `npm run typecheck` e o validador da execucao. O risco principal era a paginacao cortar a lista antes da ordenacao; a correcao ordena primeiro.

