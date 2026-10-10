# Execucao

- Status: concluido

## Alteracoes

- Criado `src/shared/constants/apiRoutes.ts` para paths HTTP de auth, anuncios, usuarios e midia.
- Services de auth, anuncios, favoritos, notificacoes, perfil e midia passaram a consumir `API_ROUTES`; metodos e query params foram preservados.
- `src/shared/constants/routes.ts`: Favoritos alinhado a `/favoritos`; adicionada constante do segmento video e helper de auth alinhado aos paths Expo sem grupos.
- `useCadastroViewModel.ts` e `FormView.tsx`: navegacao de login usa `APP_ROUTES.auth.login` em vez de string literal.
- `docs/development-workflow.md`, `AGENTS.md` e `.github/copilot-instructions.md`: documentada a separacao de `APP_ROUTES`/`API_ROUTES` e a configuracao de URL-base e endpoints.

O shell e a arvore de rotas nao foram redesenhados. A diferenca entre as cinco abas descritas como alvo e as tres registradas atualmente pelo `TabLayout` foi documentada como decisao pendente.

## Comandos e resultados

- `npm run typecheck`: bloqueado por TS5101 em `tsconfig.json:5`, depreciacao preexistente de `baseUrl` no TypeScript instalado.
- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou apos a centralizacao e novamente apos os ajustes de navegação.
- `git diff --check`: sem erros de whitespace; Git emitiu aviso de conversao LF/CRLF em `.gitignore` preexistente.
- Busca de paths HTTP e destinos literais: paths de API encontrados apenas em `apiRoutes.ts`; nenhum `"/login"` restante em View/ViewModel.
- Diagnosticos do editor nos arquivos TS alterados: nenhum erro.
- `git status --short --branch`: branch `development`; alteracoes locais anteriores em `.env.example`, `.gitignore`, `apiClient.ts`, `propertyMediaService.ts`, `package.json`, `package-lock.json` e `authTokenStorage.ts` foram preservadas.

## Desvios, falhas e bloqueios

- O comando padrao de typecheck permanece bloqueado pelo TS5101 preexistente; `tsconfig.json` nao foi alterado.
- Configuracao Spring/OpenAPI fornecida nao lista todos os controllers, entao os paths existentes foram centralizados sem confirmar disponibilidade no servidor.
- `APP_ROUTES.dashboard` e o alvo de cinco abas nao correspondem ao `src/app`/`TabLayout` atual; nao foram removidos nem criadas telas sem decisao do usuario.
