# Entrada

- Run ID: 20260831-223705-sync-workflow-navigation-routes
- Criado em: 2026-08-31T22:37:05-03:00
- Status: concluido

## Tarefa recebida

Atualizar workflow e agentes para refletir a arquitetura atual, centralizar rotas constantes e documentar TabNavigator e busca no Header

## Objetivo e escopo

Alinhar as instrucoes do projeto com a arvore atual do Expo Router e dos modulos:
`APP_ROUTES` em `src/constants/routes.ts`, shell em `src/app/app/_layout.tsx`,
`HeaderView`/`SearchModalView` e `TabNavigator` inferior.

## CritÃ©rios de aceite

- A fonte unica de destinos (`src/constants/routes.ts`) e a regra de uso de `APP_ROUTES` ficam documentadas.
- A navegacao principal documentada e Home, Imoveis, Favoritos e Perfil.
- A estrutura documentada usa os modulos `auth`, `home`, `properties` e `profile`.
- Header com busca, TabNavigator e ausencia de menu hamburguer/footer no shell ficam explicitos.
- Agentes planner, implementer e reviewer recebem as mesmas regras.
- TOML dos agentes e TypeScript passam nas validacoes disponiveis.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alteracoes preexistentes do worktree.
- Nao reescrever outputs historicos.
- Nao remover imports legados de `Footer` encontrados em telas de conteudo;
	registrar como pendencia para tarefa de limpeza separada.
