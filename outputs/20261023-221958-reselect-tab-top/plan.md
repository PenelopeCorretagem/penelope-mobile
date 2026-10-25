# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O `CustomTabBar` emite `tabPress` mas só navega quando a rota não está ativa. Imóveis e Favoritos compartilham `PropertiesView` com `FlatList`; Configurações usa `ScrollView`; cada aba tem stack interno.

## Plano de implementaÃ§Ã£o

1. Para re-seleção da aba ativa, emitir tabPress normalmente e despachar `popToTop` no stack filho se houver rota interna; reemitir tabPress depois do pop para a tela raiz rolar.
2. Conectar a lista de imóveis/favoritos e o scroll de Configurações ao evento `tabPress` com `useScrollToTop`.
3. Rodar typecheck, diagnósticos e validar os artefatos da execução.

## ValidaÃ§Ã£o e riscos

Risco baixo: confirmar que `route.state` identifica um stack aninhado; o guard `index > 0` evita reset quando a aba já está na raiz.
