# Entrada

- Run ID: 20261114-174004-fix-language-analysis-alert
- Criado em: 2026-11-14T17:40:10-03:00
- Status: recebido

## Tarefa recebida

Impedir que o alerta Sobre esta análise seja exibido novamente ao alterar o idioma

## Objetivo e escopo

Corrigir o alerta modal da tela de análise de tendências para que a troca de
idioma não o reabra como efeito colateral. O escopo cobre `TrendAnalysisView`,
`AlertView` somente se necessário e testes/validação relacionados.

## CritÃ©rios de aceite

- Alterar o idioma com a tela de análise aberta não reabre o alerta.
- O alerta continua disponível no momento previsto pelo fluxo original.
- `npm run typecheck` passa após a alteração.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar shell, rotas e traduções existentes.
- Respeitar MVVM e aliases do `tsconfig.json`.
- Não alterar navegação, textos traduzidos ou publicar mudanças externas.
- Suposição: `alertKey`/remontagem do `AlertView` está ligado à reabertura
  observada na troca de idioma.
