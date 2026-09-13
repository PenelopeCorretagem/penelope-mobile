# Planejamento

- Status: concluído

## Contexto e mÃ³dulo

Corrigir o card e alinhar `PropertiesModel`, `SearchModalView` e `useSearchModalViewModel` aos nomes atuais da constante.

## Plano de implementaÃ§Ã£o

Executar `npm run typecheck`.

## ValidaÃ§Ã£o e riscos

O erro em runtime vinha de `Object.values(undefined)` por import/export inconsistente.
