# Execução

## Arquivo alterado

- `src/shared/components/forms/Form/FormView.tsx`

## Alteração

A prop `onChange` do `DateTimePicker` foi substituída por `onValueChange`.
`onDismiss` e `handleDateValueChange` permanecem inalterados.

## Validação

- `npm run typecheck`: passou.
- Busca por `onChange={` em `FormView.tsx`: nenhum resultado.
