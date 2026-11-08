# Entrada

- Run ID: 20261108-021623-trend-analysis-ui-priority
- Data: 2026-11-08
- Status: concluído
- Branch atual: main

## Tarefa

Melhorar o layout da tela de tendências com visão de especialista em UI e
mercado imobiliário, priorizando informações que ajudam o cliente a entender
preço, direção do mercado e impacto dos filtros.

## Critérios de aceite

1. A hierarquia visual apresenta contexto do mercado, leitura principal,
   preço mediano, variação e gráfico em ordem de decisão.
2. O indicador de leitura do mercado não apresenta valor vazio nem o termo
   confuso “Análise da IA”.
3. O filtro continua acessível por botão sobreposto e não quebra o conteúdo.
4. O layout melhora legibilidade, agrupamento, espaçamento e acessibilidade sem
   criar dependências ou alterar rotas.
5. O gráfico e os dados existentes continuam funcionando.
6. A compilação TypeScript alternativa passa.

## Restrições

- Preservar Model, dados, regras de filtragem e navegação.
- Manter o filtro como painel sobreposto.
- Fazer mudanças proporcionais na ViewModel apenas para corrigir conteúdo
  apresentado ao cliente.
- Não reintroduzir o popup removido anteriormente.
