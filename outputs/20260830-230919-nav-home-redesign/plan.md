# Planejamento

- Status: concluído

## Contexto e módulo

A aplicação já possuía navegação principal em tabs, home com dados vindos do view model e cards de imóveis reutilizáveis. O principal problema era a arquitetura de navegação e a base visual da home: ainda estava com Dashboard/Configuração e um layout de placeholder.

Módulos diretamente impactados:
- src/shared/components/layout/NavMenu
- src/shared/components/layout/Header
- src/modules/home/pages/Home
- src/modules/properties/components/AdvertisementCard
- src/modules/settings/pages/Settings
- src/app
- src/shared/context

## Plano de implementação

1. Ajustar a navegação inferior para o fluxo final Home, Imóveis, Favoritos e Perfil.
2. Criar um contexto local de favoritos para persistência em memória e integrar ao card de anúncio.
3. Redesenhar o header compacto com logo e botão de notificações.
4. Reestruturar a home em storefront com boas-vindas, busca, atalhos, métricas e lançamentos em destaque.
5. Atualizar a tela de perfil para refletir a jornada final de configurações e ações do usuário.
6. Criar a rota de favoritos e alinhar a navegação de destino.
7. Validar com TypeScript para confirmar que não houve regressão.

## Validação e riscos

- Risco: quebra de compatibilidade do Expo Router em web ao usar Link customizado. Mitigado mantendo navegação por Pressable + router.push.
- Risco: excesso de mudanças em sobrescrita de layouts. Mitigado mantendo os módulos atuais e alterando somente o necessário.
- Validação executada: npm run typecheck.
