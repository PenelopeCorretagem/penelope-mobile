# Entrada

- Run ID: 20260906-013333-settings-account-password-auth-forms
- Criado em: 2026-09-06T01:33:33-03:00
- Status: concluída

## Tarefa recebida

Ajustar Conta e Senha ao AuthScreen, remover telefone e avatar editável e criar recuperação de senha

## Objetivo e escopo

Remover telefone e avatar editável da Conta, adicionar data de nascimento, criar alteração de senha e recuperação por e-mail usando AuthScreen.

## CritÃ©rios de aceite

Conta e Senha usam a mesma estrutura de Login/Cadastro; recuperação aponta para `APP_ROUTES.auth.recuperar_senha`; typecheck e export web passam.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Não criar API real de alteração/recuperação; manter feedback local existente.
