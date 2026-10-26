# Plano aprovado

## Módulo e camadas

- Atualizar `DashboardModel.ts` com filtros, indicadores e pontos do gráfico.
- Atualizar `useDashboardViewModel.ts` com estado controlado dos filtros e ação
  de limpeza.
- Reescrever `DashboardView.tsx` para a composição visual do protótipo.
- Não alterar a rota ou o registro da tab.

## Implementação

1. Modelar os dados tipados do protótipo e os valores iniciais dos filtros.
2. Expor filtros, setters e `clearFilters` pelo ViewModel.
3. Compor cartões, controles, indicadores e gráfico com componentes existentes,
   `StyleSheet`, `Ionicons` e dimensões responsivas.
4. Revisar acessibilidade, overflow vertical e separação MVVM.

## Validação

- `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `npm run typecheck`, registrando o bloqueio conhecido de `TS5101` se ocorrer.
- `git diff --check` e `validate-run.ps1`.
