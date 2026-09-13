# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/properties`. `PropertiesView` hoje renderiza três `AdvertisementsCarousel`, um por grupo. O ViewModel já produz os grupos filtrados e o normalizador preserva `estate.images`.

## Plano de implementação

1. Adicionar ao Model um helper puro que retorna URLs válidas com a capa primeiro.
2. Expor no ViewModel uma lista achatada dos grupos filtrados e uma janela progressiva para o feed.
3. Substituir as seções da View por `FlatList` vertical com lote progressivo e estados existentes.
4. Remodelar `AdvertisementCardView` para largura de feed, imagem dominante, textos compactos, label de tipo e carrossel horizontal com pontos.

## Validação e riscos

Executar `npm run typecheck`, verificar diagnósticos dos arquivos alterados e validar os artefatos com `validate-run.ps1`. O principal risco é a interação entre listas aninhadas; o carrossel será horizontal, com `nestedScrollEnabled` e sem scroll vertical próprio.
