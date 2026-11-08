# Entrada

- Run ID: 20261108-021209-trend-analysis-filter-overlay
- Data: 2026-11-08
- Status: concluído
- Branch atual: main

## Tarefa recebida

Remover a introdução e o alerta modal da tela de tendências e adicionar um
ícone de filtro ao lado de “Indicadores do mercado”, abrindo os filtros em um
painel sobreposto aos componentes da tela.

## Critérios de aceite

1. A introdução e o `AlertView` não são mais renderizados na tela.
2. O ícone de filtro fica ao lado do cabeçalho de indicadores.
3. O toque no ícone expande/fecha um painel sobreposto, sem ocupar o fluxo
   vertical principal.
4. O painel mantém os filtros de bairro e área, ações de seleção e limpeza.
5. O estado de expansão permanece na ViewModel ou é coordenado pela View sem
   alterar regras de negócio; controles continuam acessíveis.
6. A compilação TypeScript alternativa passa.

## Restrições

- Não alterar rotas, shell ou dados do Model.
- Não criar novo componente compartilhado desnecessário.
- Preservar o componente `TrendFilterControl`.
- Remover imports e lógica de foco/modal que se tornarem desnecessários.
