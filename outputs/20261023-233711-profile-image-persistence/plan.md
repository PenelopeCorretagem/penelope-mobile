# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O front mantinha `profileImage` apenas no estado local; o service retornava `profileImage: null` e não incluía a propriedade no PATCH. A API não tinha campo na entidade/migration. O picker fornece URI local.

## Plano de implementaÃ§Ã£o

1. Converter URI local para data URI/base64 com `expo-file-system` antes do PATCH.
2. Adicionar `profileImage` ao request/response/domínio/JPA e migration V5.
3. Tornar o avatar inteiro um controle que abre o modal existente.
4. Adicionar teste de serviço e validar TypeScript/diagnósticos.

## ValidaÃ§Ã£o e riscos

Risco: data URI aumenta payload/resposta; limite de 8 MB no request e `LONGTEXT` suportam a imagem comprimida pelo picker. Flyway deve rodar no próximo restart da API.
