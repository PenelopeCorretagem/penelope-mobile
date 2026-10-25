# Plano

- Status: aprovado

## Módulo responsável e evidências

- Infraestrutura compartilhada: `src/shared/infrastructure/apiClient.ts` já concentra base URL, headers, erros e autenticação.
- Serviços externos: `src/services/propertyMediaService.ts` é a única exceção encontrada com `fetch` direto e mantém fallback de host próprio.
- Ambiente: `.env.example` já documenta `EXPO_PUBLIC_API_BASE_URL` com `/api`; `.gitignore` ignora `.env*.local`, mas não `.env`.
- As demais chamadas verificadas usam o cliente centralizado e os paths permanecem nos respectivos services.

## Código reutilizável e arquitetura

Reutilizar `apiRequest` sem criar nova camada. Manter os paths HTTP em seus services e separados dos destinos de navegação (`APP_ROUTES`); não alterar rotas do Expo Router, ViewModels ou Views. Não foi fornecido contrato dos controllers, então preservar os endpoints existentes.

## Arquivos e sequência

1. Remover o fallback com IP fixo de `apiClient.ts`; exigir `EXPO_PUBLIC_API_BASE_URL` e informar que a URL precisa incluir o context path `/api`, mantendo a remoção de barras finais.
2. Migrar as chamadas diretas de mídia para `apiRequest`, sem mudar paths nem normalização dos dados.
3. Ignorar `.env` local no Git e manter `.env.example` como template, esclarecendo host acessível por emulador/dispositivo e `/api`.
4. Revisar os diffs e executar `npm run typecheck`.

## Riscos e decisões

- O backend fornecido confirma o context path `/api` e `/v1/auth/**`, mas não lista controllers. Os endpoints legados de mídia podem não existir no backend; mantê-los sem inventar rotas, e registrar a confirmação do contrato como pendência.
- Variáveis `EXPO_PUBLIC_*` são embutidas no bundle; não colocar segredos nelas. A URL do servidor e a chave usada no cliente não são segredos de servidor.
- `.env` atual é preexistente e será preservado; apenas ficará coberto pelo ignore para evitar commit acidental.
- Expo SDK 54 documenta carregamento de arquivos `.env*` padrão e requer referências estáticas a `process.env.EXPO_PUBLIC_*`. Não será alterada API do Expo.

## Validação

- `npm run typecheck` após as alterações TypeScript.
- Inspeção do diff para comprovar ausência de host hardcoded, uso da mesma base e preservação dos paths.
- `validate-run.ps1` para verificar os artefatos da execução.
