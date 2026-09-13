# Planejamento

- Status: concluído

## Contexto e mÃ³dulo

Preencher os DTOs vazios em `src/shared/dtos` e `src/modules/properties/dtos`, incluindo o DTO adicional de `tipo_imagem`.

## Plano de implementaÃ§Ã£o

Executar `npm run typecheck` e revisar campos sensíveis e relações opcionais.

## ValidaÃ§Ã£o e riscos

Senha e tokens permanecem representados no DTO completo da tabela, embora não devam ser expostos por uma API pública.
