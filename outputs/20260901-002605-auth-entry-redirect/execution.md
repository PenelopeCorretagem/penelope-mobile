# ExecuÃ§Ã£o

- Status: concluido

## AlteraÃ§Ãµes

- Criado `src/shared/context/AuthContext.tsx`.
- Root layout passou a fornecer `AuthProvider`.
- `src/app/index.tsx` passou a usar `Redirect` condicional.
- Login chama `login()`; Sair chama `logout()` e substitui pela rota de login.

## Comandos e resultados

- `npm run typecheck`: passou.
- `npx expo export --platform web`: passou.

## Desvios, falhas e bloqueios

Nenhum bloqueio. Persistencia de sessao nao foi implementada por ausencia de storage/token no projeto.
