# Entrada

- Run ID: 20260913-084630-add-private-password-recovery
- Criado em: 2026-09-13T08:46:30-03:00
- Status: recebido

## Tarefa recebida

Criar tela privada PasswordRecovery para usuarios logados e corrigir o link da tela Password

## Objetivo e escopo

Criar uma tela privada `PasswordRecovery` para usuários autenticados e corrigir
o link da tela `Password`, que estava apontando para a recuperação pública de
usuários deslogados.

## Critérios de aceite

- Existe uma tela privada `PasswordRecovery` com o mesmo padrão visual de
	`Password`.
- Existe a rota privada `configuracoes/recuperar-senha`.
- `PasswordView` aponta para a rota privada.
- `LoginView` continua apontando para a recuperação pública.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Preservar a recuperação pública existente.
- Usar `APP_ROUTES` como fonte única de destinos.
- Não implementar ainda a chamada real de envio de e-mail.
- Branch atual: `detalhes-imovel`.
