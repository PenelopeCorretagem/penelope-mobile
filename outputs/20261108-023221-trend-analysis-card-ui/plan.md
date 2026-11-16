# Planejamento

- Status: aprovado

## Diagnóstico

Os cards atuais misturam `minHeight` 108/128, padding e tamanhos de valor
distintos, além de uma largura implícita baseada em `flex` e uma hierarquia
visual que faz o card de leitura parecer incompatível com o card de preço.

## Plano

1. Usar um grid com duas colunas equivalentes e espaçamento fixo.
2. Padronizar todos os cards com altura mínima comum, padding, raio e borda
   sutil.
3. Alinhar cabeçalho, valor e legenda em slots consistentes; destacar a
   valorização apenas por cor de acento, não por dimensões conflitantes.
4. Padronizar iconBadge, fonte do título, valor e caption.
5. Ajustar o card de análise de IA para a mesma linguagem visual, com área
   textual confortável.

## Validação

- `npm run typecheck`; fallback `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `git diff --check`.
- Revisar acessibilidade, responsividade e outputs.
