# Entrada

- Run ID: 20261023-221606-property-details-carousel
- Criado em: 2026-10-23T22:16:06-03:00
- Status: concluido

## Tarefa recebida

Substituir a imagem hero do detalhe do imóvel por carrossel horizontal paginado com as imagens do imóvel.

## Objetivo e escopo

Substituir a imagem única do hero em PropertyDetails por um carrossel horizontal paginado com as URLs já fornecidas pelo modelo de apresentação.

## CritÃ©rios de aceite

- Todas as imagens do imóvel são navegáveis por swipe/paginação.
- A imagem ocupa a largura da tela e mantém a proporção atual.
- Quando houver mais de uma imagem, o indicador mostra posição atual e total.
- A ação existente “Ver galeria” continua disponível para abrir a galeria completa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Reutilizar React Native `FlatList` e o padrão horizontal já usado em `AdvertisementCard`.
- Não adicionar dependências nem alterar o modal/rota da galeria.
