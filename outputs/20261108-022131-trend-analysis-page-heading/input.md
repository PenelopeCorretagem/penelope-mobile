# Entrada

- Run ID: 20261108-022131-trend-analysis-page-heading
- Criado em: 2026-11-08T02:21:31-03:00
- Status: pronto para execução
- Branch atual: `main`
- Branch sugerida: `main` (não trocar branch)

## Tarefa recebida

Em `TrendAnalysisView.tsx`, mover o título “Tendências de mercado” e o
Pressable de filtros para fora de `styles.contextHeader`, acima do card.

## Objetivo e escopo

Reorganizar apenas a composição visual do cabeçalho da tela de análise de
tendências. O `contextHeader` deve continuar exibindo somente o contexto/mercado
e o período selecionado, enquanto título e filtro passam a formar o cabeçalho da
página acima dele.

## Critérios de aceite

- O texto `Tendências de mercado` é renderizado acima do card
  `styles.contextHeader`.
- O Pressable que abre/fecha filtros fica no mesmo cabeçalho externo, acima do
  card, mantendo acessibilidade e alternância existentes.
- `contextHeader` não contém título duplicado nem o Pressable de filtro; mantém
  apenas eyebrow e contexto/mercado.
- Overlay, controles, limpeza e comportamento dos filtros permanecem intactos.
- `npm run typecheck` passa; se bloqueado por TS5101, executar o fallback
  documentado.
- `validate-run.ps1` passa.

## Restrições, suposições e fora do escopo

- Preservar alterações preexistentes e limitar a mudança à View e aos outputs
  desta execução.
- Não alterar ViewModel, serviços, rotas, dependências ou comportamento dos
  filtros.
- Não criar commit, branch, PR ou issue.
- Supõe-se que o layout externo possa usar `styles.pageTitle` e
  `styles.filterButton` existentes, adicionando somente o estilo de composição
  necessário se a organização exigir.
