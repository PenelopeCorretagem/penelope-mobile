# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O hero atual renderiza apenas `presentation.imageUrl` dentro de um `Pressable`. `PropertyDetailsModel` já fornece `imageUrls`; `AdvertisementCardView` e `ImageCarouselModal` usam `FlatList` horizontal com paginação.

## Plano de implementaÃ§Ã£o

1. Substituir o hero por FlatList horizontal paginada usando `imageUrls` e resetar o índice quando o imóvel mudar.
2. Mostrar posição atual/total e manter o botão separado para abrir a galeria completa.
3. Executar typecheck, diagnósticos e validar os artefatos da execução.

## ValidaÃ§Ã£o e riscos

Risco baixo: usar `useWindowDimensions` para largura dos itens e desabilitar o scroll quando só houver uma imagem. A galeria existente não será modificada.
