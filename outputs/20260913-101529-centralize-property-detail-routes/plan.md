# Planejamento

- Status: aprovado

## Contexto e módulo

`usePropertyDetailsViewModel` já usa `APP_ROUTES.detalhes`, mas concatena
`galeria` e `planta` diretamente. `routes.ts` é a fonte única de destinos.

## Plano de implementação

Adicionar `detalhesGaleria` e `detalhesPlanta` a `APP_ROUTES` e utilizá-los na
composição dos dois destinos do ViewModel.

## Validação e riscos

Executar `npm run typecheck` e confirmar que os caminhos compostos permanecem
`imoveis/detalhes-imovel/{id}/galeria` e `/planta`.
