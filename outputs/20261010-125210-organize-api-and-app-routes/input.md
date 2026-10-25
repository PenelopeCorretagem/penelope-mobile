# Entrada

- Run ID: 20261010-125210-organize-api-and-app-routes
- Criado em: 2026-10-10T12:52:10-03:00
- Status: recebido

## Tarefa recebida

Organizar rotas HTTP e explicar configuração de rotas do backend e do Expo Router

## Objetivo e escopo

Organizar os paths HTTP do backend em uma constante dedicada, mantendo separados os destinos de telas do Expo Router, e explicar com exemplos onde configurar cada tipo de rota.

Escopo: adicionar `API_ROUTES` em `src/shared/constants`, migrar os services que possuem paths HTTP literais e documentar a diferença entre URL-base, endpoint HTTP e rota de tela em `docs/development-workflow.md`.

## CritÃ©rios de aceite

- Paths HTTP usados pelos services são definidos em `API_ROUTES` e consumidos sem alterar métodos, query params ou comportamento.
- `APP_ROUTES` permanece a fonte das rotas de tela e não é misturada com API routes.
- A documentação explica a configuração da URL-base em `.env.local`, prefixo `/api`, como adicionar endpoint e como adicionar tela Expo Router.
- `npm run typecheck` ou validação equivalente não aponta erros introduzidos.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alterações locais existentes e não alterar o contrato dos endpoints.
- Não criar rotas do backend que não constem nos paths já usados pelo frontend.
- Não alterar a árvore de `src/app` nem o formato público de `APP_ROUTES`.
- Branch atual: `development`; branch sugerida: sem alteração.
- Estado inicial já contém mudanças locais da tarefa anterior em `.env.example`, `.gitignore`, `apiClient.ts` e `propertyMediaService.ts`, além de alterações do usuário em `package.json`, `package-lock.json` e `authTokenStorage.ts`.
