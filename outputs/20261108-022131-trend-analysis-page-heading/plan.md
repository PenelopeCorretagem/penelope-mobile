# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/trend-analysis`, na View
`pages/TrendAnalysis/TrendAnalysisView.tsx`. A tela já renderiza o título e o
botão dentro de `contextHeader`; o overlay é filho de `marketSection` e usa
posicionamento absoluto para permanecer sobre o conteúdo. A alteração não
envolve rota, Model, ViewModel ou Service.

## Código reutilizável avaliado

Serão reutilizados `styles.pageTitle`, `styles.filterButton`,
`styles.contextCopy` e o estado/ações atuais (`filtersExpanded`,
`setFiltersExpanded`, `clearFilters`). Não há necessidade de novo componente,
alias, dependência ou API do Expo.

## Plano de implementação

1. Criar um cabeçalho de página dentro de `marketSection`, antes de
   `contextHeader`, contendo o título e o Pressable de filtros.
2. Remover título e Pressable de `contextHeader`, deixando nele apenas
   `eyebrow` e `contextText` dentro do contexto de mercado.
3. Preservar a posição do overlay relativo a `marketSection`, seus controles e
   todas as ações/acessibilidade existentes.
4. Registrar execução, revisar contra os critérios e checklist MVVM, e validar
   com typecheck e `validate-run.ps1`.

## Validação, riscos e decisões

- Validação principal: `npm run typecheck`.
- Fallback somente se TS5101 ocorrer: `npx tsc --noEmit --ignoreDeprecations 6.0`.
- Risco: o overlay pode ficar desalinhado se a âncora relativa mudar; manter
  `marketSection` como contêiner relativo e não alterar `filtersOverlay`.
- Não há navegação nem decisão pendente; branch permanece `main`.
