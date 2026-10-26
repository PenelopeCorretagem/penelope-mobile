# Planejamento

- Status: aprovado

## Evidências

- `PeriodControl` e seus estilos não possuem uso na View.
- `filterGroupLabel`, `periodRow`, `periodControl`, `periodLabel`,
  `periodValueRow`, `periodValue` e `helperText` são estilos sem referências.
- `tooltip` e `tooltipText` permanecem definidos, mas o tooltip não é renderizado.
- `TrendDirection` e `TrendIndicator` não possuem referências no módulo.
- `calendar` e `neutral` não são utilizados pelos indicadores atuais.

## Implementação

1. Remover o componente `PeriodControl` e estilos de período não utilizados.
2. Remover estilos do tooltip não renderizado.
3. Remover tipos de indicador não utilizados e restringir o tipo de ícone/tom
   aos valores efetivamente usados pelo dashboard local.
4. Confirmar referências e preservar a renderização atual.

## Validação e riscos

- Executar `git diff --check` e `npm run typecheck`.
- Risco baixo: a limpeza é baseada em referências locais confirmadas por busca.
