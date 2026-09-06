# Entrada

- Run ID: 20260906-191222-datetimepicker-on-value-change
- Status: recebido

## Objetivo

Substituir o uso depreciado de `onChange` no `DateTimePicker` por `onValueChange`.

## Critérios de aceite

- O `FormView` usa `onValueChange`.
- O comportamento de seleção e formatação de data permanece igual.
- `onDismiss` continua fechando o seletor.
- `npm run typecheck` passa.

## Escopo

Alterar somente a API usada pelo `DateTimePicker` em `FormView`.
