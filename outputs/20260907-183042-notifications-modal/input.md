# Entrada

- Run ID: 20260907-183042-notifications-modal
- Criado em: 2026-09-07T18:30:42-03:00
- Status: recebido

## Tarefa recebida

Implementar modal fullscreen de notificacoes no HeaderView com DTOs, mock many-to-many, service e fluxo de leitura/soft-delete.

## Objetivo e escopo

Adicionar ao sino do HeaderView um modal fullscreen de notificacoes, com lista e detalhe fullscreen, leitura ao abrir o detalhe e soft-delete. Criar DTOs em `src/shared/dtos/notification.ts`, service em `src/services`, dados many-to-many em `mocks/db.json` e integrar o estado de nao lidas ao HeaderView.

## Criterios de aceite

- O sino abre o modal de notificacoes e a bolinha rosa aparece apenas quando o userId 1 tem associacoes nao lidas.
- A lista mostra notificacoes ativas do usuario, incluindo uma nao lida e uma lida no mock.
- Tocar uma notificacao abre detalhe fullscreen e marca a associacao como lida.
- O detalhe permite soft-delete e a lista e o contador sao atualizados.
- Views nao fazem HTTP; ViewModels concentram estado e efeitos; service concentra API.
- O mock mantem um unico usuario e inclui `notifications` e `userNotifications` com os campos solicitados.
- `npm run typecheck` e `validate-run.ps1` concluem sem falhas.

## Restricoes, suposicoes e fora do escopo

- Preservar rotas e alteracoes existentes; o modal e um componente global do HeaderView, sem nova rota.
- Usar userId 1, conforme o service de perfil atual e o mock existente.
- Nao adicionar dependencias, commit, branch, PR ou publicacao externa.
- Associacao entre as colecoes sera feita no cliente para permanecer compativel com json-server.
- Branch atual: `feat-home`; nenhuma branch nova sera criada.
