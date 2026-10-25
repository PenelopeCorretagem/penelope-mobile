# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

authTokenStorage chama SecureStore.deleteItemAsync, que delega ao método nativo
ausente no runtime web. O módulo responsável é shared/infrastructure.

## Plano de implementaÃ§Ã£o

1. Usar AsyncStorage quando Platform.OS for web para get/set/remove.
2. Preservar SecureStore no Android e iOS.
3. Executar typecheck e validar os outputs.

## ValidaÃ§Ã£o e riscos

- npm run typecheck é bloqueado por TS5101 preexistente em tsconfig.json.
- npx tsc --noEmit --ignoreDeprecations 6.0 passa.
- Risco conhecido: AsyncStorage web é menos seguro que SecureStore nativo.
