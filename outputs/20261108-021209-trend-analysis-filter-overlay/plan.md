# Planejamento

- Status: aprovado

## Arquivos e responsabilidades

- `TrendAnalysisView.tsx`: remover introdução/alerta, controlar somente a
  expansão visual do painel e posicionar o novo acionador.
- `TrendAnalysisModel.ts` e `useTrendAnalysisViewModel.ts`: preservar regras,
  filtros e derivados.
- `TrendFilterControlView.tsx`: reutilizar sem alteração funcional.

## Implementação

1. Remover `AlertView`, `useFocusEffect`, `alertKey` e o card introdutório.
2. Remover o bloco de filtros que ocupa fluxo.
3. Adicionar estado local `filtersExpanded` e botão acessível com
   `funnel-outline` no cabeçalho de indicadores.
4. Renderizar um painel absoluto relativo ao cabeçalho, contendo os controles
   de bairro/área e ação “Limpar filtros”; usar z-index/elevation para
   sobreposição.
5. Ajustar estilos para o painel e manter a tela rolável.

## Validação

- `npm run typecheck`.
- `npx tsc --noEmit --ignoreDeprecations 6.0` se necessário.
- Revisar ausência do modal/intro e presença do overlay no código.
