# Entrada

- Run ID: 20261023-223053-expo-router-nav-compat
- Criado em: 2026-10-23T22:30:53-03:00
- Status: concluido

## Tarefa recebida

Corrigir imports React Navigation incompatíveis com Expo Router SDK 56+ após falha de bundling Android.

## Objetivo e escopo

Eliminar a falha Android causada por imports diretos de `@react-navigation/native` em uma versão atual do Expo Router.

## CritÃ©rios de aceite

- A aplicação não importa pacotes `@react-navigation/*` diretamente.
- Tab reset e scroll-to-top continuam disponíveis via entry points públicos do Expo Router.
- Typecheck e export Android passam sem variável de bypass.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Usar APIs públicas documentadas do Expo Router; não desativar a verificação de compatibilidade.
- Preservar as atualizações preexistentes de Expo no manifesto.
