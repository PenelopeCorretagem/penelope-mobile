# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O entrypoint `src/app/index.tsx` estava renderizando diretamente uma tela de
propriedades. O login navegava para Home, mas nao registrava estado de sessao.

## Plano de implementaÃ§Ã£o

1. Criar `AuthContext` com login/logout.
2. Envolver a arvore no `AuthProvider`.
3. Redirecionar a raiz com `Redirect` e `APP_ROUTES`.
4. Ligar login e Sair ao contexto.
5. Validar typecheck e export web.

## ValidaÃ§Ã£o e riscos

- Risco: sem armazenamento persistente, recarregar o app volta a exigir login.
- Validacao: `npm run typecheck` e `npx expo export --platform web`.
