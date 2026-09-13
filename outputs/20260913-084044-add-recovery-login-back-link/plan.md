# Planejamento

- Status: aprovado

## Contexto e módulo

`PasswordRecoveryView` já usa `AuthScreen`, que aceita
`secondaryPrompt`, `secondaryActionLabel` e `secondaryActionHref`. O cadastro
usa esse mesmo padrão para retornar ao login.

## Plano de implementação

Adicionar `APP_ROUTES` à View e configurar a ação secundária com o texto
`Já lembrou sua senha?` / `Voltar para o login`.

## Validação e riscos

Executar `npm run typecheck` e revisar se a rota usada é a constante central.
