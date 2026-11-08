# Planejamento

- Status: aprovado

## Contexto e módulo

- Módulo `trend-analysis`, na View `TrendAnalysisView`.
- O painel usa posicionamento absoluto em relação a `marketSection`.
- O valor `top: 112` coloca o painel abaixo do `contextHeader`, causando a
  abertura excessivamente baixa.

## Plano de implementação

1. Reduzir o deslocamento vertical de `filtersOverlay` para posicioná-lo logo
   abaixo do `pageHeader`, sobrepondo o `contextHeader` e os indicadores.
2. Preservar posicionamento absoluto, `zIndex`, `elevation` e o estado atual dos
   filtros.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Revisar que apenas a posição do overlay foi alterada.
- O valor adotado acompanha a altura atual do `pageHeader` e o espaçamento da
  seção; nenhuma mudança de navegação, Model ou ViewModel é necessária.
