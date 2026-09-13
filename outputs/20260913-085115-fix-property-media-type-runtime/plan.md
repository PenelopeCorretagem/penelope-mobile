# Planejamento

- Status: aprovado

## Contexto e módulo

O Service fazia cast direto do JSON e assumia `rawType.descricao` e arrays válidos.

## Plano de implementação

Validar registros e descrições, aceitar as duas variantes e proteger respostas não-array.

## Validação e riscos

Executar `npm run typecheck`, `git diff --check` e diagnósticos dos arquivos alterados.
