# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

A documentacao ainda descrevia modulos e tabs antigos (`dashboard`, `settings`,
`/dashboard`, `/configuracoes`). O codigo atual usa `profile`, rotas aninhadas em
`src/app/app`, `HeaderView` com `SearchModalView` e `TabNavigator` com quatro links.

## Plano de implementaÃ§Ã£o

1. Atualizar documentos canonicos, skill e agentes `.codex`.
2. Formalizar `APP_ROUTES` como fonte unica e o shell atual.
3. Validar TOML, typecheck e os outputs da execucao.

## ValidaÃ§Ã£o e riscos

- TOML validado com `tomllib`.
- TypeScript validado com `npm run typecheck`.
- `git diff --check` manteve apontamentos preexistentes em `ButtonView.tsx`, fora do escopo.
- Imports legados de `Footer` permanecem documentados como pendencia de limpeza.
