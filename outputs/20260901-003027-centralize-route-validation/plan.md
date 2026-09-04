# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

As validacoes estavam duplicadas em `src/app/_layout.tsx`, `HeaderView` e
`TabNavigatorView`, com prefixos inconsistentes. `AppRoutePath` tambem estava
tipado como os objetos de grupo, nao como os valores string.

## Plano de implementaÃ§Ã£o

1. Criar helpers de reconhecimento em `routes.ts`.
2. Substituir comparacoes manuais nos tres consumidores.
3. Corrigir `AppRoutePath` para os valores string dos grupos.
4. Rodar typecheck e revisar diagnosticos.

## ValidaÃ§Ã£o e riscos

- Baixo risco: apenas centraliza regras existentes.
- Validacao: `npm run typecheck`.
