# Entrada

- Run ID: 20261025-163539-dashboard-card-horizontal-alignment
- Status: concluído

## Tarefa recebida

Alinhar os cards “Preço mediano m²” e “Variação anual” às mesmas margens
laterais do card amplo “Analise da IA”.

## Objetivo e escopo

Corrigir o cálculo de largura dos cards compactos no grid de indicadores. O
grid usa `gap` e os cards usam `48%`, causando sobra de espaço na lateral
direita. Os cards compactos devem dividir igualmente a largura disponível.

## Critérios de aceite

- Os dois cards compactos ocupam toda a linha entre as margens do container.
- A margem direita dos cards compactos coincide com a margem direita do card da IA.
- O card da IA continua ocupando a linha inteira.
- `npm run typecheck` e `git diff --check` são executados e registrados.

## Restrições, suposições e fora do escopo

- Alterar somente os estilos do grid em `DashboardView.tsx`.
- Preservar conteúdo, Model, ViewModel, navegação, serviços e gráfico.
- Usar layout flexível, sem largura calculada manualmente ou altura fixa.
