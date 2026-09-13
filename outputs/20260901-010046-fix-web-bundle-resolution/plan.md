# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O Metro falhava ao resolver `./AdvertisementCard` no barrel de propriedades,
retornando JSON de erro e provocando o MIME incorreto no navegador.

## Plano de implementaÃ§Ã£o

1. Apontar o barrel para `AdvertisementCardView`.
2. Validar export web e typecheck.

## ValidaÃ§Ã£o e riscos

- Risco baixo; somente import local corrigido.
