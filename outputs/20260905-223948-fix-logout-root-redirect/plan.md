# Plano

Status: aprovado

1. Tornar `logout` síncrono no `AuthContext`, removendo o atraso que mantém a sessão autenticada durante a navegação.
2. Manter `router.replace('/')` apenas como retorno ao root em `SettingsView`.
3. Executar typecheck e validar referências a redirecionamento direto para login.
