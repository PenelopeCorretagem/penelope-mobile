# Planejamento

- Status: aprovado

## Módulo e evidências

O módulo responsável é `src/modules/dashboard/pages/Trend`. `DashboardModel.ts`
possui atualmente `localDashboardData` com valores fixos e o ViewModel apenas
expõe esses valores; os selects não alteram os indicadores nem o gráfico.

## Implementação

1. Definir no Model um tipo e uma coleção pequena de transações mockadas,
   cobrindo os bairros, faixas de área e anos exibidos.
2. Adicionar transformações puras para filtrar registros e derivar medianas
   anuais, variação anual e texto de análise.
3. Atualizar o ViewModel para derivar `indicators` e `points` com os filtros
   atuais, mantendo as definições de filtro e o estado de expansão.
4. Preservar a View como camada de apresentação e manter seus contratos atuais.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Verificar que filtros sem registros não causam divisão por zero, arrays vazios
  ou valores inválidos no gráfico.
- Evitar alterar navegação, services e layout fora do necessário.
