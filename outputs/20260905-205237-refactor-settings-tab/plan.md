# Plano aprovado

Status: aprovado para execução

## Evidências

- `src/app/(private)/(tabs)/_layout.tsx` registra Imóveis, Favoritos, Dashboard oculto e Perfil.
- `src/shared/components/layout/TabNavigator/TabNavigatorView.tsx` mantém uma barra legada com Imóveis, Favoritos, Dashboard e Perfil.
- `src/constants/routes.ts` usa `perfil/configuracoes/*` e expõe `APP_ROUTES.perfil`.
- `SettingsView` já reúne as opções e usa `useAuth().logout`, mas renderiza cartões isolados.
- `AccountView` somente lê valores pessoais fixos; não existe service/store/context de usuário.
- `HeaderView` mostra engrenagem condicional na rota Perfil e trata toda rota de Configurações como tela com voltar.

## Implementação

1. Atualizar `APP_ROUTES` para `configuracoes/*`, remover destino Perfil e ajustar helpers.
2. Criar a rota `configuracoes` dentro das tabs e mover as rotas internas para esse segmento; remover as rotas antigas dentro de `perfil`.
3. Alterar os dois pontos de navegação inferior para três itens, usando engrenagem para Configurações.
4. Ajustar `HeaderView` para título próprio na raiz de Configurações, voltar somente em telas internas e remover a ação de engrenagem do Perfil.
5. Centralizar o modelo inicial de usuário no módulo de perfil; refatorar SettingsView para cabeçalho do usuário, seções e linhas reutilizáveis.
6. Refatorar AccountView para formulário editável, salvar em memória e voltar.
7. Remover a tela antiga de perfil sem rota e validar referências, typecheck e outputs.

## Arquivos esperados

- Alterar: `src/constants/routes.ts`, layouts/rotas de tabs, `HeaderView`, `TabNavigatorView`, `SettingsView`, `SettingsOptionView`, `AccountView`.
- Criar: `src/modules/profile/ProfileModel.ts` e rota/layout internos em `src/app/(private)/(tabs)/configuracoes`.
- Remover: rotas antigas `src/app/(private)/(tabs)/perfil/**` e tela antiga `src/modules/profile/pages/Profile/**`.

## Validação

- Busca textual por `APP_ROUTES.perfil`, `name="perfil"` e links antigos.
- `npm run typecheck`.
- `validate-run.ps1` ao final.

## Riscos

- O projeto não tem persistência de usuário; o botão salvar atualiza o estado da sessão da tela e não uma API.
- A rota física antiga precisa ser removida junto com as constantes para evitar duplicação no Expo Router.
