# Planejamento

- Status: aprovado

## Implementação

1. Adicionar `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`,
   `elevation` e `zIndex` ao container do Header para projetar sombra abaixo.
2. Adicionar os mesmos parâmetros ao container da TabBar, com deslocamento
   vertical negativo para projetar sombra acima da barra.
3. Evitar mudanças no conteúdo, layout funcional e navegação.

## Validação

- `npm run typecheck`; fallback `npx tsc --noEmit --ignoreDeprecations 6.0`.
- `git diff --check`.
- Revisar que apenas os dois arquivos do shell foram alterados.
