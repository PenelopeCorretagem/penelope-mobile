# Workflow de Desenvolvimento do Penelope Mobile

Este é o documento canônico para features, correções e refatorações no Penelope Mobile. O fluxo é `input -> planejamento -> execução -> revisão -> saída`.

## Contexto técnico

- Expo SDK 54, Expo Router e React Native com TypeScript.
- Arquitetura modular por domínio em `src/modules`.
- Rotas e layouts somente em `src/app`, seguindo a árvore do Expo Router.
- Código realmente reutilizável em `src/shared`.
- Serviços externos em `src/services`.
- Destinos de navegação centralizados em `src/constants/routes.ts`.
- Respeite os aliases reais definidos em `tsconfig.json`.

## MVVM

Cada tela complexa deve manter, quando aplicável, esta estrutura:

```text
Feature/
├── FeatureModel.ts
├── FeatureView.tsx
├── useFeatureViewModel.ts
└── index.ts
```

- **Model:** tipos, transformações e validações puras. Não usa JSX, hooks, estado React ou HTTP.
- **ViewModel:** estado, efeitos, loading, erro, ações e chamadas de service. Não renderiza JSX nem define estilos.
- **View:** interface, estados visuais e disparo de ações do ViewModel. Não chama API diretamente.
- **Service:** comunicação com APIs ou fontes externas, sem importar componentes.
- **Infrastructure:** recursos técnicos compartilhados, sem depender de features.

Direção de dependência: `View -> ViewModel -> Service -> Infrastructure -> sistema externo`.

## Rotas e organização

- Coloque em `src/app` apenas arquivos reconhecidos pelo Expo Router, como `_layout.tsx` e rotas.
- Exporte cada tela por um `index.ts` da feature e faça a rota importar esse ponto de entrada.
- Mantenha componentes e assets específicos próximos ao módulo.
- Mova algo para `shared` somente quando houver reutilização real entre módulos.
- Siga a organização atual dos módulos: `auth`, `home`, `properties` e `profile`.
- Use `src/shared/constants/routes.ts` (`APP_ROUTES`) como fonte dos destinos do
	Expo Router. Use `src/shared/constants/apiRoutes.ts` (`API_ROUTES`) para paths
	HTTP do backend. Não misture os dois tipos nem repita paths em services.
- Mantenha os valores de `APP_ROUTES` sincronizados com os caminhos reais em
	`src/app`. Ao criar ou renomear uma rota, atualize a constante e seus usos.
- A navegação principal fica no layout de `src/app/app` e usa o `TabNavigator`
	 inferior na ordem `Home`, `Imóveis`, `Dashboard`, `Favoritos`, `Perfil`.
- O `HeaderView` global fornece a busca por meio do `SearchModalView` e não deve
	reintroduzir menu hamburguer ou navegação paralela.
- O footer legado não faz parte do shell principal. Não o adicione ao layout sem
	uma decisão explícita de produto; imports existentes em telas legadas devem ser
	tratados em tarefa própria de limpeza.
- Não crie `navigation/`, navigator paralelo, estado global ou abstrações sem problema concreto.

### Como configurar uma rota

Rotas de tela e rotas HTTP são configurações diferentes:

- **Tela Expo Router:** crie o arquivo em `src/app`, por exemplo
	`src/app/(private)/(tabs)/imoveis/index.tsx`, que corresponde a `/imoveis`.
	Segmentos entre parênteses, como `(private)` e `(tabs)`, organizam layouts e
	não aparecem na URL. Um arquivo `[id].tsx` cria um segmento dinâmico.
- **Destino de tela:** adicione o path sem barra inicial em `APP_ROUTES`, em
	`src/shared/constants/routes.ts`; use `APP_ROUTES` em `router.push`, `Redirect`
	ou `router.replace`. A constante sozinha não cria uma tela: o arquivo precisa
	existir em `src/app`.
- **URL-base da API:** configure `EXPO_PUBLIC_API_BASE_URL` em `.env.local` ou no
	ambiente EAS. Inclua o context path do Spring, por exemplo
	`http://<host-acessivel>:8080/api`. No dispositivo físico, use um IP acessível
	pela rede do aparelho.
- **Endpoint HTTP:** adicione o sufixo sem `/api` em `API_ROUTES` e chame-o no
	service por `apiRequest` ou `authenticatedApiRequest`. Exemplo:
	`API_ROUTES.auth.login` vale `/v1/auth/login`; combinada com a URL-base, a
	requisição final vai para `http://<host>:8080/api/v1/auth/login`.
- Mantenha métodos e query params no service. Não coloque chaves privadas em
	`EXPO_PUBLIC_*`: seus valores são embutidos no bundle do aplicativo.

O `TabLayout` atual registra Imóveis, Favoritos e Configurações, enquanto as
instruções de produto acima descrevem cinco abas. Não altere o shell ao apenas
centralizar paths; alinhe essa diferença antes de criar ou remover abas.

## Procedimento

1. Normalize a tarefa em `outputs/<run-id>/input.md` com escopo e critérios verificáveis.
2. Leia `AGENTS.md`, este documento, `tsconfig.json` e o código diretamente relacionado.
3. Faça um plano em `plan.md`, identificando módulo, reuso, camadas, rota, riscos e validações.
4. Implemente somente o plano aprovado, preservando alterações preexistentes.
5. Registre arquivos, decisões, comandos, falhas e pendências em `execution.md`.
6. Revise o código contra o plano e o checklist MVVM em `review.md`.
7. Finalize `summary.md` com status, entregas, validações e próximo passo.

Use os scripts da skill para criar e validar os outputs:

```powershell
powershell -ExecutionPolicy Bypass -File .agents/skills/penelope-development/scripts/new-run.ps1 -Slug <slug> -Task '<tarefa>'
powershell -ExecutionPolicy Bypass -File .agents/skills/penelope-development/scripts/validate-run.ps1 -RunDirectory <run-dir>
```

## Validação mínima

- Execute `npm run typecheck` após alterações TypeScript/TSX.
- Rode testes relevantes disponíveis.
- Verifique loading, erro, acessibilidade, aliases, direção MVVM e rota quando aplicável.
- Registre comandos que não puderam ser executados; não esconda falhas.

Não crie branch, Issue, Pull Request, merge ou publicação externa sem solicitação explícita.
