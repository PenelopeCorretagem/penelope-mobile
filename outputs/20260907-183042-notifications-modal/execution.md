# Execucao

- Status: concluido

## Arquivos modificados

- Criado `src/shared/dtos/notification.ts` com DTOs da notificacao e da associacao many-to-many.
- Criado `src/services/notificationService.ts` com listagem, marcacao como lida, soft-delete e contador.
- Criado `src/shared/components/layout/NotificationsModal/` com Model, ViewModel, View e barrel export.
- Alterado `src/shared/components/layout/Header/HeaderView.tsx` para abrir o modal e controlar a bolinha de nao lidas.
- Alterado `mocks/db.json` com `notifications` e `userNotifications`, preservando um unico usuario.

## Decisoes e desvios

- O modal foi integrado diretamente ao HeaderView, sem criar rota, preservando a arvore Expo Router.
- O service busca as duas colecoes em paralelo e associa no cliente, sem depender de recursos relacionais do json-server.
- O contador e atualizado tanto no Header quanto pelo ViewModel apos leitura ou exclusao.
- Nenhum desvio funcional do plano.

## Comandos e resultados

- `npm run typecheck`: aprovado.
- Smoke test via Node contra `http://localhost:3001`: aprovado; 2 notificacoes, 2 associacoes e 1 nao lida para userId 1.
- `npm run mock:api`: a porta 3001 ja estava em uso (`EADDRINUSE`); a instancia existente respondeu ao smoke test.
- `git diff --check`: executado; apenas warnings de conversao de fim de linha em arquivos preexistentes foram reportados pelo Git.
- `validate-run.ps1 -RunDirectory outputs/20260907-183042-notifications-modal`: aprovado.

## Falhas e pendencias

- Nao foram identificadas falhas funcionais. Nao foram adicionados testes automatizados, pois o repositorio nao expoe suite relevante para este componente.
