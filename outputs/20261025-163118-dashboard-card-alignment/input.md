# Entrada

- Run ID: 20261025-163118-dashboard-card-alignment
- Status: concluído

## Tarefa recebida

Alinhar início e fim dos cards lado a lado no dashboard.

## Objetivo e escopo

Nivelar verticalmente os cards que aparecem lado a lado no grid de indicadores,
fazendo com que tenham o mesmo início e fim visual. Preservar o conteúdo, o
card amplo da IA e o comportamento responsivo.

## Critérios de aceite

- Cards compactos na mesma linha têm alturas iguais e bordas inferiores alinhadas.
- O conteúdo de cada card permanece iniciado no topo.
- O card da IA continua ocupando duas colunas.
- `npm run typecheck` é executado e registrado.

## Restrições, suposições e fora do escopo

- Alterar somente o layout dos cards em `DashboardView.tsx`.
- Não alterar Model, ViewModel, dados, navegação, serviços ou gráfico.
- Usar estilos flexíveis do React Native, sem altura fixa dependente de conteúdo.
