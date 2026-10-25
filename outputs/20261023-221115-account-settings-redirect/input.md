# Entrada

- Run ID: 20261023-221115-account-settings-redirect
- Criado em: 2026-10-23T22:11:15-03:00
- Status: concluido

## Tarefa recebida

Redirecionar para a tela principal de Configuracoes ao concluir submissao de qualquer fluxo do submodulo account.

## Objetivo e escopo

Após submissão de qualquer fluxo nas telas de Account, retornar à tela principal de Configurações.

## CritÃ©rios de aceite

- Perfil: voltar para Configurações somente quando `saveProfile` confirmar sucesso; em falha, permanecer na tela.
- Senha e recuperação: os submits existentes navegam para `APP_ROUTES.configuracoes`.
- Não usar paths literais para navegação.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Usar `router.replace` e a rota centralizada `APP_ROUTES.configuracoes`.
- O formulário de senha e o de recuperação ainda não persistem/chamam API; implementar backend está fora do escopo.
