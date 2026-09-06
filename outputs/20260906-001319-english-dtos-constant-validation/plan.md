# Planejamento

- Status: concluído

## Contexto e mÃ³dulo

Criar contratos ingleses para usuário, favoritos, endereço, propriedade, anúncio, mídia, tipo de mídia e amenidades; remover duplicatas portuguesas.

## Plano de implementaÃ§Ã£o

Usar tipos derivados de `MEDIA_TYPES` e `ESTATE_TYPES`, guards de runtime e executar `npm run typecheck`.

## ValidaÃ§Ã£o e riscos

Os DTOs novos coexistem com `src/types/Advertisement.ts`, que ainda é o modelo legado usado pela UI.
