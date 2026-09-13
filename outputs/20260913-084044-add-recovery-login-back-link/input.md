# Entrada

- Run ID: 20260913-084044-add-recovery-login-back-link
- Criado em: 2026-09-13T08:40:44-03:00
- Status: recebido

## Tarefa recebida

Adicionar link de retorno ao login na tela de recuperação de senha

## Objetivo e escopo

Adicionar uma ação clara para retornar da recuperação de senha ao login,
reutilizando o contrato de ações secundárias do `AuthScreen`.

## Critérios de aceite

- A tela exibe o texto `Voltar para o login`.
- A ação navega para `APP_ROUTES.auth.login`.
- Não há seta isolada ou rota literal adicionada.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Manter o componente `AuthScreen` e o comportamento atual do formulário.
- Usar texto explícito por acessibilidade e consistência com o cadastro.
- Branch atual: `detalhes-imovel`.
