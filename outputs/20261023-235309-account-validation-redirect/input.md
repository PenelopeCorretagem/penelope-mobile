# Entrada

- Run ID: 20261023-235309-account-validation-redirect
- Criado em: 2026-10-23T23:53:09-03:00
- Status: concluido

## Tarefa recebida

Impedir redirect após salvar perfil ou senha quando houver campos incompletos ou inválidos.

## Objetivo e escopo

Impedir qualquer redirecionamento quando o perfil ou a senha tiver campos incompletos ou inválidos; navegar somente após sucesso confirmado.

## CritÃ©rios de aceite

- Perfil valida nome, e-mail e data antes de chamar a API; erro permanece na tela.
- Senha valida senha atual, mínimo de 6 caracteres e confirmação; erro permanece na tela.
- Sucesso continua exibido por 1,5 s sem botão antes do redirect.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- A alteração de senha ainda usa o submit local existente; persistência real está fora desta tarefa.
