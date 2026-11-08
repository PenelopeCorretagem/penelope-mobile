# Entrada

- Run ID: 20261025-173600-dashboard-filter-select
- Status: concluído

## Tarefa

Transformar os filtros de bairro e faixa de área construída em selects
expansíveis que exibam e permitam escolher qualquer opção disponível.

## Critérios de aceite

- Tocar em um filtro expande suas opções abaixo do campo.
- Cada opção pode ser selecionada diretamente.
- A opção escolhida aparece no campo e o select fecha.
- Abrir outro filtro fecha o anterior.
- “Limpar filtros” restaura os valores iniciais e fecha qualquer select aberto.
- `npm run typecheck` e `git diff --check` são executados e registrados.

## Restrições

- Preservar a arquitetura MVVM e os dados existentes.
- Não alterar navegação, serviços, indicadores ou gráfico.
- Usar componentes e estilos React Native já disponíveis, sem nova dependência.
