# Penelope Mobile

## Fontes obrigatórias

- Leia `docs/development-workflow.md` antes de planejar ou alterar código.
- O projeto usa Expo SDK 54. Consulte a documentação versionada em
  https://docs.expo.dev/versions/v54.0.0/ antes de usar ou alterar APIs do Expo.
- Respeite os aliases reais definidos em `tsconfig.json`.

## Workflow de desenvolvimento

Para implementar features, correções ou refatorações, use a skill
`$penelope-development` e siga as fases:

```text
input -> planejamento -> execução -> revisão -> saída
```

- Registre cada execução em `outputs/<run-id>/`.
- O agente `penelope-development-agent` coordena planejamento, execução e revisão.
- Se subagentes estiverem disponíveis, use-os apenas para exploração ou revisão
  somente leitura; mantenha um único executor para alterações de código.
- Execute as fases em sequência. Só paralelize investigações independentes e
  somente leitura.
- Não crie Issue, Pull Request, merge ou publicação externa sem pedido explícito.
- Não esconda falhas: registre bloqueios, comandos que falharam e pendências na
  saída da execução.

## Organização atual dos módulos

- `src/modules/auth`: autenticação e fluxo de conta.
- `src/modules/home`: home e destaques.
- `src/modules/properties`: listagem, filtros e detalhes de imóveis.
- `src/modules/profile`: perfil, conta, dashboard, sobre e contatos.
- `src/app`: somente rotas do Expo Router e layouts.
- `src/shared`: componentes e utilitários realmente reutilizáveis.
- `src/shared/constants/routes.ts`: fonte dos destinos de navegação do Expo Router.
- `src/shared/constants/apiRoutes.ts`: fonte dos paths HTTP do backend, sem o
  prefixo de ambiente `/api`.

O alvo de produto para a navegação principal é um `TabNavigator` com Home,
Imóveis, Dashboard, Favoritos e Perfil; Configurações deve ficar fora da barra.
Esse alvo ainda diverge do código atual: `src/app/(private)/(tabs)/_layout.tsx`
registra Imóveis, Favoritos e Configurações, e `APP_ROUTES` ainda tem formato
plano. Não trate os dois estados como sincronizados nem redesenhe a shell sem
uma decisão explícita que resolva essa divergência.

Não use strings literais de rota de tela em Views ou ViewModels. Importe
`APP_ROUTES` de `@constant/routes` e mantenha `routes.ts` sincronizado com a
árvore de arquivos em `src/app`. Services devem usar `API_ROUTES` de
`@constant/apiRoutes` para os endpoints HTTP. O `HeaderView` fornece a busca global por meio
do `SearchModalView`; não reintroduza menu hamburguer ou footer no shell principal.

## Validação mínima

- Execute `npm run typecheck` após alterações TypeScript/TSX.
- Rode testes adicionais existentes e relevantes à mudança.
- Verifique as regras MVVM e o checklist de `docs/development-workflow.md` antes
  de concluir.
