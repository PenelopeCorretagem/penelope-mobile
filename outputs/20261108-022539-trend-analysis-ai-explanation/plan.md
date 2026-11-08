# Planejamento

- Status: aprovado

## Implementação

1. Manter o cabeçalho externo à área contextual e ajustar o overlay para o novo
   posicionamento.
2. Preservar um card de leitura principal de valorização e o card de preço
   mediano, removendo o segundo card redundante de variação anual.
3. Expor no ViewModel uma análise textual derivada da mesma variação, bairro,
   área e período filtrados.
4. Renderizar abaixo do gráfico um card “Análise da IA”, deixando explícito que
   é uma estimativa orientativa.
5. Revisar layout, acessibilidade e outputs.

## Validação

- `npm run typecheck`; fallback `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `git diff --check`.
- `validate-run.ps1`.
