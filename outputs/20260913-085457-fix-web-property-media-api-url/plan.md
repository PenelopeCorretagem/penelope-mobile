# Planejamento

- Status: aprovado

## Contexto e módulo

`propertyMediaService.ts` usava sempre o IP de rede, enquanto
`advertisementService.ts`, `notificationService.ts` e `profileService.ts` já
usavam `localhost` no Web.

## Plano de implementação

Importar `Platform` e aplicar o mesmo fallback por plataforma no Service de mídia.

## Validação e riscos

Executar `npm run typecheck` e consultar os dois endpoints no mock local.
