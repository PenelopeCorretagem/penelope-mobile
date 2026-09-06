## Execução

Status: concluída

- `AuthContext.logout` agora define `isAuthenticated` como falso imediatamente.
- Configurações retorna para `/`; o root decide o redirecionamento para login.
- Imports quebrados revelados pelo typecheck foram corrigidos.
- `npm run typecheck`: aprovado.
