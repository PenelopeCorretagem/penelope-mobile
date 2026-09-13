# Entrada: fix-duplicate-root-route

Status: concluída

## Objetivo

Fazer o logout retornar ao root correto, deixando `src/app/index.tsx` decidir entre Imóveis e login com base em `isAuthenticated`.

## Evidência

`src/app/index.tsx` e `src/app/(private)/index.tsx` resolviam para `/`. A rota privada sempre redirecionava para Imóveis e podia impedir a decisão de autenticação do root público.

## Critérios

- Existe somente uma rota física para `/`.
- Logout retorna ao root e usuário deslogado chega ao login.
- `npm run typecheck` passa.
