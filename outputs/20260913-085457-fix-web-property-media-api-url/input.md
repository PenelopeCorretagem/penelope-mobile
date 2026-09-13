# Entrada

- Run ID: 20260913-085457-fix-web-property-media-api-url
- Criado em: 2026-09-13T08:54:57-03:00
- Status: recebido

## Tarefa recebida

Corrigir URL base do Service de mídia no Web

## Objetivo e escopo

Corrigir o `Failed to fetch` do PropertyDetails no Web, alinhando o fallback da
API de mídia ao restante do app.

## Critérios de aceite

- Web usa `http://localhost:3001` quando não há variável de ambiente.
- Dispositivos continuam usando `http://192.168.0.104:3001`.
- O mock responde aos endpoints de tipos e mídia.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Respeitar `EXPO_PUBLIC_API_BASE_URL` quando configurada.
- Não alterar o payload ou a normalização de mídia.
