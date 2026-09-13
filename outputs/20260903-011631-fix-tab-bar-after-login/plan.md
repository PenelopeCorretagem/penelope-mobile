# Plano

## Status

aprovado

## Evidência e módulo responsável

O login em `src/modules/auth/pages/Login/useLoginViewModel.ts` chama
`router.replace(APP_ROUTES.imoveis)`. A rota está dentro de
`src/app/(private)/(tabs)`, mas o layout foi salvo como `_layouts.tsx`.
O Expo Router reconhece `_layout.tsx` no singular; por isso a configuração
`Tabs` e a `CustomTabBar` não são montadas.

## Implementação

1. Renomear o layout para `src/app/(private)/(tabs)/_layout.tsx`.
2. Preservar as telas, ícones, ordem e estilos existentes da tab bar.

## Validação e riscos

Executar `npm run typecheck` e validar a execução pelo caminho pós-login. O
risco é baixo: a alteração apenas torna o layout já existente reconhecível.
# Planejamento

- Status: nÃ£o iniciado

## Contexto e mÃ³dulo

NÃ£o iniciado.

## Plano de implementaÃ§Ã£o

NÃ£o iniciado.

## ValidaÃ§Ã£o e riscos

NÃ£o iniciado.
