# Entrada

- Run ID: 20261023-224109-notifications-e2e-seed
- Criado em: 2026-10-23T22:41:09-03:00
- Status: concluido

## Tarefa recebida

Validar integração existente de notificações front/back e adicionar script SQL reutilizável para semear notificação de teste.

## Objetivo e escopo

Garantir que o front consuma corretamente a caixa de notificações da API e disponibilizar um script SQL para inserir uma notificação vinculada ao usuário usado no app.

## CritÃ©rios de aceite

- Listar, marcar como lida e excluir continuam usando as rotas autenticadas existentes.
- Erros ao marcar/excluir ficam visíveis também no modal de detalhe.
- O script cria notificação e vínculo na mesma transação e informa se o e-mail não existe, sem deixar notificação órfã.
- O payload continua compatível com o DTO do front.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Não alterar o contrato da API, já alinhado ao front.
- Não executar o script no banco local sem o e-mail do usuário; ele será preenchido pelo usuário antes de executar.
