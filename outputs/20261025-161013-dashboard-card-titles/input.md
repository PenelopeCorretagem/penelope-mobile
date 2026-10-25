# Entrada

- Run ID: 20261025-161013-dashboard-card-titles
- Criado em: 2026-10-25T16:10:13-03:00
- Status: concluído

## Tarefa recebida

Alinhar os títulos dos cards do dashboard na mesma linha dos ícones

## Objetivo e escopo

Fazer com que o título de cada indicador apareça na mesma linha horizontal do
ícone dentro do card. Preservar o card amplo da IA, os valores, legendas e o
layout dos demais cards.

## CritÃ©rios de aceite

- O título e o ícone de cada card ficam alinhados na mesma linha.
- Os cards continuam responsivos, incluindo o card da IA ocupando duas colunas.
- `npm run typecheck` é executado e seu resultado é registrado.

## RestriÃ§Ãµes, suposiÃ§µes e fora do escopo

- Respeitar Expo SDK 54, TypeScript e a separação MVVM existente.
- Alterar somente a composição visual dos cards do dashboard.
- Não alterar navegação, dados, filtros, gráfico ou serviços.
