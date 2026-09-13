# Penelope Mobile

Leia [AGENTS.md](../AGENTS.md), [docs/development-workflow.md](../docs/development-workflow.md) e `tsconfig.json` antes de planejar ou alterar código.

Use o agente `penelope-development-agent` para features, correções e refatorações. Siga `input -> planejamento -> execução -> revisão -> saída` e registre cada execução em `outputs/<run-id>/`.

Respeite Expo SDK 54, Expo Router, TypeScript e MVVM modular. Use os aliases reais do `tsconfig.json`; mantenha Models puros, ViewModels responsáveis por estado e efeitos, Views sem chamadas diretas à API, services em `src/services` e rotas somente em `src/app`.

Use `src/constants/routes.ts` como fonte única de destinos: importe `APP_ROUTES`
de `@constant/routes` e não escreva strings de rota diretamente em componentes,
Views ou ViewModels. Mantenha os valores sincronizados com a árvore de `src/app`.
A shell principal está em `src/app/app/_layout.tsx`, com `HeaderView` e busca
`SearchModalView` no topo e `TabNavigator` inferior com Home, Imóveis, Dashboard,
Favoritos e Perfil. Configurações é uma rota fora da barra inferior, acessada pela
engrenagem do Perfil. Não reintroduza menu hamburguer ou footer no shell principal.

Após alterações TypeScript/TSX, execute `npm run typecheck`. Não crie Issue, Pull Request, merge ou publicação externa sem solicitação explícita.
