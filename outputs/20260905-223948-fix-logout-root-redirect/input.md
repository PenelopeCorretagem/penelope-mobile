# Entrada: fix-logout-root-redirect

Status: concluída

## Objetivo

Corrigir o logout da tela de Configurações para voltar ao root, permitindo que a rota raiz redirecione usuários não autenticados para login.

## Evidência

`SettingsView` já chama `router.replace('/')`, mas `AuthContext.logout` só altera `isAuthenticated` após um timeout de 1,5s. O root (`src/app/index.tsx`) é quem decide entre Imóveis e login.

## Critérios

- Logout atualiza o estado de autenticação antes da navegação.
- Settings não navega diretamente para login.
- Root redireciona para login quando `isAuthenticated` é falso.
- `npm run typecheck` passa.

## Restrição

Preservar o fluxo de exclusão de conta e as alterações preexistentes do usuário.
