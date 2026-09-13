# Checklist arquitetural

Use `docs/development-workflow.md` como fonte completa. Este arquivo concentra os
pontos que mudam decisões durante planejamento e revisão.

## Localização

- Identifique primeiro o módulo de negócio em `src/modules`.
- Mantenha código específico junto da feature ou do módulo.
- Mova algo para `shared` apenas quando houver reutilização real entre módulos.
- Centralize integrações externas em `src/services`.
- Mantenha recursos técnicos globais em `src/infrastructure`.
- Coloque em `src/app` apenas rotas e layouts do Expo Router.

## MVVM

- Model: tipos, transformações e validações puras; sem JSX, estado React ou HTTP.
- ViewModel: estado, efeitos, loading, erro, ações e chamadas a services; sem JSX
  ou estilos.
- View: interface e disparo de ações; sem chamadas diretas à API.
- Service: comunicação externa; não importa componentes.
- Infrastructure: não depende de features.

Direção esperada:

```text
View -> ViewModel -> External Service -> Infrastructure -> sistema externo
```

## Feature e rota

Quando as camadas forem necessárias, prefira:

```text
Feature/
├── FeatureModel.ts
├── FeatureView.tsx
├── useFeatureViewModel.ts
└── index.ts
```

A rota fica em `src/app` e exporta a tela da feature. Ajuste `_layout.tsx` somente
quando a configuração do navigator realmente precisar mudar.

## Qualidade

- Use os aliases existentes em `tsconfig.json`; não invente aliases no plano.
- Trate loading e erro quando houver operação assíncrona.
- Reutilize theme e componentes existentes quando forem semanticamente adequados.
- Evite dependências, estado global e abstrações novas sem problema concreto.
- Execute `npm run typecheck` após mudanças TypeScript/TSX.
- Registre testes manuais ou automatizados aplicáveis e remova código temporário.
