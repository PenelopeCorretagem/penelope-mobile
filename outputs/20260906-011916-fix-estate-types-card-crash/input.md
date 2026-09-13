# Entrada

- Run ID: 20260906-011916-fix-estate-types-card-crash
- Criado em: 2026-09-06T01:19:16-03:00
- Status: concluída

## Tarefa recebida

Corrigir crash do AdvertisementCard causado por import incorreto de tipos de imóvel e respostas incompletas

## Objetivo e escopo

Corrigir o crash em `AdvertisementCardView` causado pelo uso de `ESTATE_TYPES` inexistente e proteger respostas sem tipo de imóvel.

## CritÃ©rios de aceite

O card deve renderizar mesmo sem `estate.type`; todos os consumidores devem usar `PROPERTY_TYPES`; typecheck deve passar.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Preservar o modelo legado `Advertisement` usado pela UI.
