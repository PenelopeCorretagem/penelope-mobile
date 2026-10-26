# Entrada

- Run ID: 20261025-160307-dashboard-ai-card
- Criado em: 2026-10-25T16:03:07-03:00
- Status: concluído

## Tarefa recebida

Tornar o indicador “Analise da IA” um card maior, ocupando o espaço de dois cards menores.

## Objetivo e escopo

- Destacar visualmente o indicador de análise da IA no grid de indicadores do dashboard.
- Ajustar o modelo do indicador para declarar o destaque de layout.
- Aplicar no `DashboardView` uma largura equivalente a duas colunas.
- Preservar os demais indicadores como cards menores e manter o comportamento existente.

## Critérios de aceite

- “Analise da IA” ocupa uma linha completa do grid, equivalente a dois cards menores.
- Os demais indicadores continuam usando o layout compacto.
- `npm run typecheck` deve ser executado e seu resultado registrado.

## Restrições, suposições e fora do escopo

- Restrições: Expo SDK 54, TypeScript, MVVM existente; não alterar navegação, serviços ou shell.
- Suposição: “dois cards menores” significa a largura total disponível da linha, respeitando o gap atual do grid.
- Fora do escopo: alterar conteúdo, dados, filtros, gráfico ou outros indicadores.
- Alterações locais preexistentes em `DashboardModel.ts` e `DashboardView.tsx` devem ser preservadas.
- Branch atual: `feat/tendencia`.
- Branch sugerida: manter a branch atual; nenhuma troca necessária.
