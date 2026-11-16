# Planejamento

- Status: aprovado

## Contexto e módulo

O escopo está em `src/modules/dashboard/pages/Trend`, mas a implementação é
exclusivamente de análise de tendências: tipos `Trend*`, transações locais,
filtros por bairro/área e gráfico de evolução. A rota atual apenas exporta essa
tela. O módulo `properties/pages` usa Page/Model/View/ViewModel e diretórios
dedicados para components, types, dtos e services; essa organização será
seguida sem criar services artificiais para dados locais.

## Decisões arquiteturais

- Mover o domínio para `src/modules/trend-analysis`.
- Usar `pages/TrendAnalysis` com `TrendAnalysisModel.ts`,
  `TrendAnalysisView.tsx`, `useTrendAnalysisViewModel.ts` e `index.ts`.
- Extrair o controle de filtro para
  `components/TrendFilterControl/TrendFilterControlView.tsx` e índice.
- Manter o Model puro, renomeando `DashboardData` e `localDashboardData` para
  nomes de análise de tendências.
- Renomear o segmento de rota para `trend-analysis`, atualizar
  `APP_ROUTES.trendAnalysis` e manter o título visível da aba como Tendência.
- Renderizar `AlertView` com variante `info` dentro da View, próximo da
  introdução.

## Plano de implementação

1. Mover o módulo e a rota, atualizando aliases e referências.
2. Renomear símbolos específicos da tendência.
3. Extrair o componente visual de filtros e reduzir a View à composição.
4. Adicionar introdução e alerta informativo.
5. Executar typecheck e revisar contra o checklist MVVM.

## Validação e riscos

- Executar `npm run typecheck`.
- Buscar referências residuais `@dashboard`, `DashboardView`,
  `useDashboardViewModel` e `DashboardModel` na funcionalidade.
- Revisar imports, rota e separação View/ViewModel/Model.
- O shell atual diverge do shell de produto documentado; não será redesenhado,
  apenas terá o segmento da tela sincronizado.
- A implementação atual usa dados locais; não será inventado um service/DTO sem
  integração backend existente.
