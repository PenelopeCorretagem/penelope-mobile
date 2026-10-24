# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O backend expõe `POST /v1/property-search/interpret` com transcript e catálogos permitidos. Retorna termo, cidade, região, tipo, dormitórios mínimos, preço máximo e ordenação. O SearchModal atual aplicava filtros locais sem interpretação IA; o feed não filtrava dormitórios/preço.

## Plano de implementaÃ§Ã£o

1. Criar rota/service tipados para interpretar a pesquisa no backend.
2. Integrar submit de texto/voz, loading/erro e precedência dos filtros manuais; toda busca textual/voz deve passar pela IA.
3. Propagar filtros numéricos por URL/histórico e aplicar no modelo do feed.
4. Validar TypeScript, diagnósticos e artefatos.

## ValidaÃ§Ã£o e riscos

O backend aceita no máximo 500 caracteres no transcript e 100 itens por catálogo. Gemini precisa estar configurado para validar em runtime. O transcript original deve ser mantido no histórico, enquanto o termo interpretado serve apenas para a filtragem.
