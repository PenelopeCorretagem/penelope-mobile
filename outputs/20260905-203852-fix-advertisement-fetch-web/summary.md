# Saida

- Status final: concluido

## Entregas

- Corrigida a seleção da URL da API de anúncios para o web e mobile.
- O web agora usa `http://localhost:3001` por padrão, com override por `EXPO_PUBLIC_API_BASE_URL`.
- O mobile mantém o fallback para `http://192.168.0.172:3001`.

## ValidaÃ§Ãµes

- `npm run typecheck`: aprovado.
- Endpoint local de anúncios: HTTP 200.
- `validate-run.ps1`: aprovado.

## PendÃªncias e prÃ³ximo passo

- Para executar no web, manter `npm run mock:api` ou `npm run dev:mock` em execução.
- Em ambiente remoto, definir `EXPO_PUBLIC_API_BASE_URL` para uma API acessível pelo navegador.
