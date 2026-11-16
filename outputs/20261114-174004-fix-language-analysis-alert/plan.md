# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

- Módulo: `src/modules/trend-analysis/pages/TrendAnalysis`.
- A View usa `useFocusEffect` para incrementar `alertKey` e força a remontagem
  de `AlertView` ao receber foco.
- `AlertView` limpa o estado de dismiss ao montar ou quando a mensagem muda.
  Como a mensagem depende de `t`, a troca de idioma pode reabrir o modal.

## Plano de implementação

1. Remover a remontagem artificial por `key` e o contador de alerta da View.
2. Preservar a exibição inicial do alerta sem reabrir o modal em atualizações
   de idioma; o estado local de dismiss deve sobreviver ao rerender.
3. Executar typecheck e revisar o diff para garantir escopo mínimo.

## Validação e riscos

- Validação principal: `npm run typecheck`.
- Revisar que não há outra chamada ao alerta da análise.
- Risco: alterar o comportamento de reexibição ao voltar para a tela; manter o
  fluxo original de foco apenas se ele não conflitar com o aceite.
