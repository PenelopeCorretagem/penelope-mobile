# Entrada

- Run ID: 20260831-225844-profile-settings-navigation
- Criado em: 2026-08-31T22:58:44-03:00
- Status: planejado

## Tarefa recebida

Refatorar navegacao inferior, header do perfil, tela de configuracoes e perfil somente leitura

## Objetivo e escopo

Refatorar a navegacao para que Dashboard seja uma aba principal, Perfil seja
somente leitura e Configuracoes concentre as acoes, acessada pela engrenagem.

## CritÃ©rios de aceite

- Dashboard aparece no TabNavigator com icone de grafico.
- Perfil nao exibe mais os botoes de acao.
- Header mostra engrenagem em Perfil e abre Configuracoes.
- Configuracoes possui header customizado com voltar e nao exibe TabNavigator.
- Configuracoes lista Ajustar conta, Trocar senha, Sobre o aplicativo, Entre em contato e Sair.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- O projeto usa Expo Router sobre React Navigation; serao mantidos os navegadores existentes.
- Destinos serao centralizados em `src/constants/routes.ts`.
- Nao serao adicionadas dependencias ou navegadores paralelos.
