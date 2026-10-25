# Plano

- Status: aprovado

## Contexto e módulo

`src/modules/auth/pages/Cadastro/useCadastroViewModel.ts` simula conclusão usando `setTimeout` e mostra `Alert` de sucesso; não chama service. `CadastroView.tsx` não repassa o estado `error` para `AuthScreenView`. A porta 8080 responde no OpenAPI, cujas rotas publicadas não incluem registro de usuário.

## Plano de implementação

1. Remover simulação e mensagem de sucesso do ViewModel.
2. Após validação local, exibir erro claro informando que o cadastro não foi enviado porque falta endpoint disponível na API.
3. Repassar `error` como `statusMessage` até `Form`, para o usuário ver o motivo.
4. Não criar `API_ROUTES.auth.register` nem um service baseado em rota presumida.

## Validação e riscos

Executar `npm run typecheck` e, em caso de TS5101 preexistente por `baseUrl`, `npx tsc --noEmit --ignoreDeprecations 6.0`. Revisar o fluxo para confirmar que nenhum sucesso é anunciado sem resposta real. A integração de cadastro permanece bloqueada até o backend documentar o endpoint e payload.
