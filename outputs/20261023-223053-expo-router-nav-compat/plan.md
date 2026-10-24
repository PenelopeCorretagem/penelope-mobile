# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O bundler apontou três imports de `@react-navigation/native`. A documentação do Expo Router migra esses imports para `expo-router/react-navigation` ou exports do próprio `expo-router`. `StackActions` e `useScrollToTop` estão disponíveis nesses entry points.

## Plano de implementaÃ§Ã£o

1. Migrar os imports no layout da tab bar e telas raiz de listas/Configurações.
2. Remover a dependência externa adicionada para suportar esses imports diretos.
3. Validar TypeScript e export Android.

## ValidaÃ§Ã£o e riscos

Risco baixo. O runtime é fornecido pelo Expo Router; o projeto não deve depender diretamente do pacote React Navigation, conforme a regra do SDK atual.
