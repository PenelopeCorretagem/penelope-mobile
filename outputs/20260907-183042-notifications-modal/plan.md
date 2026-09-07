# Planejamento

- Status: aprovado

## Contexto e modulo

O ponto de integracao e `src/shared/components/layout/Header/HeaderView.tsx`, que ja renderiza o sino e o `SearchModalView`. O novo componente reutilizara a mesma estrutura de modal fullscreen em `src/shared/components/layout/NotificationsModal`. A integracao externa ficara em `src/services/notificationService.ts`; os contratos ficam em `src/shared/dtos/notification.ts`; os dados de desenvolvimento ficam em `mocks/db.json`.

## Plano de implementacao

1. Criar DTOs para `NotificationDto`, `UserNotificationDto` e o item associado exibido pela UI.
2. Criar service com listagem das duas colecoes, associacao no cliente, PATCH para `readAt` e PATCH para `deletedAt`.
3. Criar `NotificationsModalModel.ts`, `useNotificationsModalViewModel.ts`, `NotificationsModalView.tsx` e `index.tsx`, com lista, detalhe, loading/erro, voltar/fechar e acoes de leitura/soft-delete.
4. Alterar `HeaderView` para carregar o contador de nao lidas, abrir o modal e atualizar o contador apos fechamento ou mudancas.
5. Adicionar ao mock duas notificacoes e duas associacoes para userId 1, uma lida e uma nao lida, mantendo apenas o usuario atual.

## Validacao e riscos

- Rodar `npm run typecheck` apos as alteracoes TypeScript/TSX.
- Revisar a direcao `View -> ViewModel -> Service` e a ausencia de strings de rota novas.
- Rodar `validate-run.ps1` no diretorio desta execucao.
- Risco: a API mock pode retornar IDs numericos ou strings; os DTOs devem normalizar comparacoes sem depender de query relacional do json-server.
