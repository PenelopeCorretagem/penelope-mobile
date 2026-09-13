# Planejamento

- Status: aprovado

## Contexto e modulo

O type `advertisement.ts` concentrava sete declarations. O dominio era chamado
de `Estate` em Models, Cards, Views e no normalizador.

## Plano de implementacao

1. Distribuir os types em arquivos `property-type`, `address`, `property-image`,
	`amenity`, `property`, e `advertisement`.
2. Renomear `EstateType`, `EstateImage` e `Estate` para os equivalentes
	`PropertyType`, `PropertyImage` e `Property`.
3. Alterar o modelo de anuncio para `property` e atualizar consumidores.
4. Manter a adaptacao do campo externo `estate` isolada no normalizador.

## Validacao e riscos

- `npm run typecheck` e `git diff --check`.
- Busca por aliases e acessos legados.
- Risco: quebrar consumidores ao renomear `estate`; mitigacao: migracao global
	dos Models, Cards, Views e normalizador antes da validacao.
