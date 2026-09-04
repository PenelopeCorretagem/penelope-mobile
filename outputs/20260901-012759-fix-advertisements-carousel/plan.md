# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

`AdvertisementsCarouselView` usava `FlatList` horizontal com cards de largura fixa
e sem `pagingEnabled`, permitindo varios cards visiveis e sem snap por pagina.

## Plano de implementaÃ§Ã£o

1. Aceitar largura opcional no card.
2. Medir a viewport e dimensionar cada item para ela.
3. Ativar paginacao e deceleracao rapida na FlatList.
4. Validar typecheck e export web.

## ValidaÃ§Ã£o e riscos

- Risco baixo: a largura padrao do card fora do carrossel permanece 280.
