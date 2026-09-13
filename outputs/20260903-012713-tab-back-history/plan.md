# Plano

## Status

aprovado

## Evidência

O `Tabs` customizado troca entre rotas com `navigation.navigate`, mas não define
`backBehavior`. O comportamento padrão não preserva o histórico de tabs e pode
retornar à primeira rota, Imóveis.

## Implementação

Definir `backBehavior="history"` no `Tabs` de
`src/app/(private)/(tabs)/_layout.tsx`, preservando a `CustomTabBar` e as rotas.

## Validação

Executar `npm run typecheck` e, se possível, validar manualmente Favoritos ->
Dashboard -> gesto de voltar.
