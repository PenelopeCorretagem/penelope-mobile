# Entrada

- Run ID: 20261108-022539-trend-analysis-ai-explanation
- Data: 2026-11-08
- Status: concluído
- Branch atual: main

## Tarefa

Mover o título e o filtro para fora do card de contexto, adicionar abaixo do
gráfico uma área textual de análise feita pela IA e manter apenas um card de
valorização/variação.

## Critérios de aceite

1. `Tendências de mercado` e o botão de filtro ficam acima de `contextHeader`.
2. O contexto do mercado permanece no card sem título duplicado.
3. Existe abaixo do gráfico uma seção textual intitulada análise de IA, baseada
   nos filtros e indicadores atuais, com linguagem de estimativa.
4. A tela contém somente um card numérico de valorização/variação, além do card
   de preço mediano.
5. Filtros, gráfico, cálculos e acessibilidade permanecem funcionais.
6. A validação TypeScript alternativa passa.

## Restrições

- Preservar dados, regras de filtragem e rotas.
- Não reintroduzir popup.
- Não criar dependências novas.
