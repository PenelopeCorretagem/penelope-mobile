# Execução

## Arquivos alterados

- `src/modules/auth/pages/Cadastro/useCadastroViewModel.ts`

## Alterações

- `handleNext` agora calcula e grava erros somente dos dois campos da etapa 1.
- `updateField` não valida campos da etapa 2 durante a digitação antes de uma tentativa de cadastro.
- `handleSubmit` continua usando `getCadastroFieldErrors` e `validateCadastroForm` para validar o formulário completo.

## Validação

- `npm run typecheck`: passou.
