# Planejamento

- Status: aprovado

## Contexto e módulo

- Módulo: `src/modules/settings/pages/Settings`.
- A implementação atual monta/desmonta a lista condicionalmente e chama
  `LayoutAnimation`, mas não há garantia de animação explícita nesse fluxo.
- O projeto já possui `react-native-reanimated`, porém uma solução com
  `Animated` nativo pode ser suficiente e manter o escopo menor.

## Plano de implementação

1. Substituir a animação implícita por um contêiner animado com altura/opacidade
   controladas explicitamente.
2. Medir a altura natural da lista e animar para zero ou para essa altura,
   mantendo `overflow: hidden`.
3. Manter a lista montada durante o fechamento para que a animação seja visível,
   removendo-a apenas após terminar, se necessário.
4. Preservar a seleção, acessibilidade e comportamento atual.

## Validação e riscos

- Executar `npm run typecheck`, `git diff --check` e `validate-run.ps1`.
- Revisar o comportamento de abrir, fechar e selecionar durante a transição.
- Não adicionar dependências nem alterar rotas.
