# Execucao

- Status: concluida

## Alteracoes

- `StackActions` passou a vir de `expo-router/react-navigation`; `useScrollToTop` vem de `expo-router`.
- Removida a dependência direta `@react-navigation/native`, adicionada anteriormente para essa funcionalidade.

## Comandos e resultados

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- `npx expo export --platform android`: passou; Metro empacotou 1.591 módulos.
- Busca em `src`: nenhum import direto de `@react-navigation/*`.
- O npm reportou 18 vulnerabilidades existentes no conjunto; não houve `npm audit fix` fora do escopo.

## Desvios, falhas e bloqueios

- Nenhum bloqueio conhecido.
