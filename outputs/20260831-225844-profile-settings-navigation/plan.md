# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O `TabNavigatorView` customizado controla a barra inferior; `HeaderView` e
`src/app/app/_layout.tsx` formam o shell. `ProfileView` atualmente lista acoes,
e a rota de dashboard ja existe em `src/app/app/dashboard`.

## Plano de implementaÃ§Ã£o

1. Atualizar `APP_ROUTES` com `app.configuracoes`.
2. Adicionar Dashboard aos links do `TabNavigator`.
3. Atualizar `HeaderView` com engrenagem em Perfil e voltar em Configuracoes.
4. Ocultar TabNavigator em Configuracoes no layout do grupo `app`.
5. Criar `SettingsView`/rota e converter `ProfileView` em visualizacao.
6. Rodar typecheck e revisar a implementacao.

## ValidaÃ§Ã£o e riscos

- Risco: `HeaderView` e global; a condicao de pathname deve ser exata.
- Risco: o TabNavigator compara pathname absoluto normalizado.
- Validacao: `npm run typecheck` e diagnostico dos arquivos alterados.
