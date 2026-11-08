# Planejamento

- Status: aprovado

## Implementação

1. Remover o estilo de largura total aplicado ao primeiro indicador.
2. Usar o grid flexível existente para manter valorização e preço médio lado a
   lado, com larguras equivalentes e espaçamento seguro.
3. Mover o bloco `analysisCard` para imediatamente antes de `chartCard`.
4. Ajustar estilos mínimos de altura e tipografia para o novo arranjo.

## Validação

- `npm run typecheck`; fallback `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `git diff --check`.
- Revisar ordem JSX e outputs.
