# Entrada

- Run ID: 20261025-180901-dashboard-mock-data
- Status: concluído

## Tarefa

Ajustar a dashboard para funcionar com base em dados mockados.

## Objetivo

Substituir os valores analíticos fixos por uma fonte local de registros de
transações mockadas. Os filtros de bairro e faixa de área devem recalcular os
indicadores e os pontos do gráfico a partir desses registros.

## Critérios de aceite

- Existe uma coleção tipada de registros mockados no Model.
- O ViewModel filtra os registros pelos filtros selecionados.
- O preço mediano, a variação anual e os pontos do gráfico são derivados dos
  registros filtrados.
- A dashboard continua renderizando com os valores iniciais e quando os filtros
  mudam.
- Nenhuma View chama API ou contém regra de agregação.
- `npm run typecheck` e `git diff --check` são executados e registrados.

## Restrições

- Preservar a arquitetura MVVM e os selects existentes.
- Não adicionar dependências, endpoints ou mutações externas.
- Preservar o layout, navegação e shell atuais.
