# Planejamento

- Status: aprovado

## Contexto e módulo

`PropertyDetailsView` sempre montava os três `Pressable` e apenas os desabilitava
quando suas coleções estavam vazias.

## Plano de implementação

Envolver cada botão em uma condição baseada na coleção de mídia correspondente.

## Validação e riscos

Executar `npm run typecheck` e revisar os três predicados de renderização.
