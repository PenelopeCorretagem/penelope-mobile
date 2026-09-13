# Entrada

- Run ID: 20260830-230919-nav-home-redesign
- Criado em: 2026-08-30T23:09:19-03:00
- Status: concluído

## Tarefa recebida

Redesenhar a navegação principal para Home, Imóveis, Favoritos e Perfil; atualizar a home em storefront; ajustar o header compacto e o card de imóvel com favorito; manter compatibilidade web e estrutura MVVM atual.

## Objetivo e escopo

- Substituir a navegação inferior atual por Home, Imóveis, Favoritos e Perfil.
- Redesenhar a home para uma experiência de storefront com busca, destaques e lançamentos.
- Adicionar header compacto com logo e notificações.
- Incluir ação de favorito no card de imóvel de forma leve e reutilizável.
- Ajustar o perfil/configurações para a nova estrutura do app e manter a compatibilidade com Expo Router em web.

## Critérios de aceite

- A aba inferior exibe Home, Imóveis, Favoritos e Perfil.
- A home apresenta mensagem de boas-vindas, busca, filtros rápidos, destaques e lançamentos.
- O card de imóvel permite salvar/remover favorito sem quebrar a interface.
- O header da aplicação exibe logo e botão de notificações.
- O app continua compilando com TypeScript e sem a regressão de navegação web.

## Restrições, suposições e fora do escopo

- Mantemos a estrutura MVVM existente e não criamos estado global paralelo além do contexto local de favoritos.
- Não foi necessário alterar a camada de serviços de anúncio; os dados continuam vindo da mesma fonte.
- O fluxo de autenticação e rotas sem menu continua preservado.
