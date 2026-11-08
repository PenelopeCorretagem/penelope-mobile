# Entrada

- Run ID: 20261025-163858-dashboard-lower-cards-spacing
- Status: concluído

## Tarefa recebida

Manter o card “Analise da IA” em uma linha própria e fazer os dois cards
inferiores ocuparem, em conjunto, a mesma largura do card amplo.

## Critérios de aceite

- A IA permanece sozinha na primeira linha.
- “Preço mediano m²” e “Variação anual” ficam na linha abaixo.
- Os cards inferiores têm larguras iguais e suas bordas externas coincidem
  com as margens esquerda e direita do card da IA.
- `npm run typecheck` e `git diff --check` são executados e registrados.

## Restrições

- Alterar somente estilos do grid em `DashboardView.tsx`.
- Preservar conteúdo, Model, ViewModel, navegação, serviços e gráfico.
