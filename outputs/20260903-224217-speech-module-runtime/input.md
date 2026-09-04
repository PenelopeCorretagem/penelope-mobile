# Entrada

- Run ID: 20260903-224217-speech-module-runtime
- Criado em: 2026-09-03T22:42:17-03:00
- Status: concluido

## Tarefa recebida

Corrigir erro de carregamento do expo-speech-recognition no runtime atual

## Objetivo e escopo

Corrigir o crash causado pelo import global de expo-speech-recognition quando o runtime nao possui o modulo nativo.

## CritÃ©rios de aceite

- A tela monta sem crash.
- Busca textual permanece funcionando.
- Voz funciona em development build.
- Runtime sem modulo mostra erro controlado.
- npm run typecheck passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Pacote e config plugin ja existem.
- Nao alterar dependencias, rotas ou busca textual.
