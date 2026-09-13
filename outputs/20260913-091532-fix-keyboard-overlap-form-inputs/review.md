# RevisÃ£o

- Status: concluído
- Veredito: aprovado

## Achados

Os formulários agora usam comportamento de resize no Android e ajuste de insets
no iOS. O conteúdo tem área inferior para que o ScrollView revele o campo focado.

## Checklist e validaÃ§Ãµes

`npm run typecheck`, `get_errors` e `git diff --check` aprovados. Falta apenas
confirmação manual em Android/iOS reais.
