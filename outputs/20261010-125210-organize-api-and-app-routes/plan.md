# Plano

- Status: aprovado

## Contexto e módulo

- `src/shared/constants/routes.ts` centraliza destinos Expo (`APP_ROUTES`), mas não os paths HTTP.
- Paths HTTP estão duplicados como literals em seis services. `apiClient` recebe path relativo e já acrescenta a base configurada com `/api`.
- A rota `APP_ROUTES.favoritos` não corresponde à árvore atual (`src/app/(private)/(tabs)/favoritos/index.tsx`); `useCadastroViewModel` ainda usa `"/login"` diretamente.
- A árvore atual e o `TabLayout` têm Imóveis, Favoritos e Configurações; instruções do repo descrevem uma navegação de cinco abas diferente. Este trabalho não redesenha o shell nem cria destinos ausentes.

## Reutilização e arquitetura

Criar `src/shared/constants/apiRoutes.ts` com `API_ROUTES`, separado de `APP_ROUTES`. Services continuam responsáveis por métodos, query params e chamadas HTTP; `apiClient` continua responsável por base URL, headers, token e erros. `APP_ROUTES` segue como constante de destinos Expo.

## Arquivos e sequência

1. Criar `API_ROUTES` agrupado por auth, advertisements, users e propertyMedia.
2. Migrar auth, advertisements, favorites, notifications, profile e propertyMedia para consumir os paths centralizados, preservando métodos e queries.
3. Corrigir `APP_ROUTES.favoritos`, adicionar a constante relativa `detalhesVideo`, corrigir o helper de rota auth para os caminhos Expo sem grupos e remover o literal `"/login"` do ViewModel de cadastro.
4. Documentar URL-base + `/api`, diferença entre endpoint HTTP e destino Expo, grupos `(private)`/`(tabs)` e o passo de criar o arquivo e registrar o destino.
5. Revisar busca/diff, executar typecheck e validar os outputs.

## Riscos e decisões

- O OpenAPI fornecido não lista todos os controllers. Os paths atuais serão preservados, sem alegar que os endpoints existem no servidor.
- Valores dinâmicos de ID devem continuar interpolados por funções de `API_ROUTES`; parâmetros de query permanecem montados via `URLSearchParams` no service.
- A diferença entre o shell atual e as instruções de cinco abas exige confirmação separada; não alterar abas ou criar telas sem decisão do usuário.

## Validação

- `npm run typecheck`; se TS5101 preexistente em `tsconfig.json` bloquear, repetir com `npx tsc --noEmit --ignoreDeprecations 6.0` e registrar ambos.
- Buscar paths HTTP literais fora de `apiRoutes.ts` e rotas literais de navegação em services/ViewModels.
- Executar `validate-run.ps1` para os artefatos desta execução.
