# Penelope Mobile

Leia [AGENTS.md](../AGENTS.md), [docs/development-workflow.md](../docs/development-workflow.md) e `tsconfig.json` antes de planejar ou alterar código.

Use o agente `penelope-development-agent` para features, correções e refatorações. Siga `input -> planejamento -> execução -> revisão -> saída` e registre cada execução em `outputs/<run-id>/`.

Respeite Expo SDK 54, Expo Router, TypeScript e MVVM modular. Use os aliases reais do `tsconfig.json`; mantenha Models puros, ViewModels responsáveis por estado e efeitos, Views sem chamadas diretas à API, services em `src/services` e rotas somente em `src/app`.

Use `src/shared/constants/routes.ts` como fonte de destinos do Expo Router:
importe `APP_ROUTES` de `@constant/routes`. Use `src/shared/constants/apiRoutes.ts`
(`API_ROUTES`, importado de `@constant/apiRoutes`) para paths HTTP. Não misture
destinos de tela com endpoints; paths API não incluem o prefixo `/api` configurado
em `EXPO_PUBLIC_API_BASE_URL`. Mantenha destinos sincronizados com `src/app`.
O alvo de produto é uma shell com `HeaderView`/`SearchModalView`, cinco abas
(Home, Imóveis, Dashboard, Favoritos e Perfil) e Configurações fora da barra.
O código atual diverge: `src/app/(private)/(tabs)/_layout.tsx` registra Imóveis,
Favoritos e Configurações, e `APP_ROUTES` tem formato plano. Não altere a shell
sem resolver explicitamente essa diferença. Não reintroduza menu hamburguer ou
footer no shell principal.

Após alterações TypeScript/TSX, execute `npm run typecheck`. Não crie Issue, Pull Request, merge ou publicação externa sem solicitação explícita.
