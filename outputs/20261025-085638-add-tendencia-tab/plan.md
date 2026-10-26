# Plano aprovado

## Módulo e arquitetura

- Módulo: `src/modules/dashboard`.
- Feature: `pages/Trend`.
- Model: tipos e dados locais puros de tendência.
- ViewModel: expõe o estado/dados para a View, sem JSX ou estilos.
- View: apresenta cards e resumo com estilos locais.
- Rota: `src/app/(private)/(tabs)/dashboard/index.tsx`.

## Implementação

1. Criar `DashboardModel.ts`, `DashboardView.tsx`,
   `useDashboardViewModel.ts` e `index.ts` em
   `src/modules/dashboard/pages/Trend`.
2. Criar a rota da tab e exportar o ponto de entrada da feature.
3. Adicionar `APP_ROUTES.dashboard = 'dashboard'`.
4. Registrar `dashboard` no `Tabs` com ícone de gráfico e título Tendência.
5. Executar typecheck e revisar aliases, rota, MVVM e preservação das tabs.

## Riscos

- O typecheck pode continuar bloqueado pela configuração `baseUrl` já
  incompatível com TypeScript 6; registrar sem ampliar o escopo.
- A custom tab bar já itera as rotas do Tabs, portanto não deve exigir lógica
  específica adicional.
