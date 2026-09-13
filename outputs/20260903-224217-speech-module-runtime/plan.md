# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O pacote esta instalado e o plugin esta configurado, mas o import executa requireNativeModule imediatamente. Expo Go ou um binario sem prebuild pode nao conter esse modulo.

## Plano de implementaÃ§Ã£o

Remover o import estatico, carregar o modulo sob demanda com try/catch, proteger listeners e acoes de voz e informar indisponibilidade ao usuario.

## ValidaÃ§Ã£o e riscos

Validar com npm run typecheck e validate-run.ps1. O modulo nativo continua necessario para voz real.
