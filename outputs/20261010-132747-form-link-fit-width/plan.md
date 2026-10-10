# Plano

- Status: aprovado

## Contexto e módulo

`FormView.tsx` define `.inlineLinkRow` com `width: '100%'` e centraliza seus filhos, mas também define `.linkText` com `width: '100%'`. A largura total deve continuar no container; o texto deve usar sua largura intrínseca.

## Plano de implementação

Remover apenas `width: '100%'` de `.linkText`. Não especificar largura fixa nem `fit-content`, que não é uma dimensão portátil do React Native. Validar com typecheck e diagnóstico do arquivo.

## Validação e riscos

Executar `npm run typecheck`; o repositório tem um bloqueio conhecido de TS5101 em `baseUrl`, então repetir com `npx tsc --noEmit --ignoreDeprecations 6.0` se necessário. Risco baixo: links longos podem quebrar em linhas, já permitido pelo `flexWrap` do container.
