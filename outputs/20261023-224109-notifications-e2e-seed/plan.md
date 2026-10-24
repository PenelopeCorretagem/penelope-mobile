# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O app usa `authenticatedApiRequest` nos paths `/v1/users/me/notifications`, PATCH `/{id}/read` e DELETE `/{id}`; o controller usa o e-mail do principal autenticado. O response fornece `userNotificationId`, `id`, `title`, `message`, `createdAt`, `readAt`, compatível com o DTO mobile. A migration define `notificacao` e `usuario_notificacao` com FK e vínculo único.

## Plano de implementaÃ§Ã£o

1. Exibir erros de update também no modal de detalhe e limpar erro ao iniciar nova operação.
2. Criar script SQL parametrizado por e-mail, transacional e protegido contra usuário ausente.
3. Rodar typecheck e revisar o diff; não executar inserção de dados reais sem destinatário explícito.

## ValidaÃ§Ã£o e riscos

Risco baixo. O script cria registros reais no banco e por isso será entregue sem execução automática. A autenticação depende de uma sessão válida do app.
