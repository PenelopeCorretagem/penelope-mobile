# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

- Módulo: `src/modules/properties/pages/PropertyDetails`.
- Evidência: `PropertyDetailsView.tsx` importa `react-native-youtube-iframe`.
- A versão 2.4.1 declara `react-native-web-webview` como peer opcional, mas seu
	adaptador web o importa em runtime.

## Plano de implementação

1. Adicionar `react-native-web-webview` como dependência direta usando npm.
2. Manter o código MVVM e a implementação nativa da tela sem alterações.
3. Validar TypeScript e exportação web do Expo.

## Validação e riscos

- Validação principal: `npm run typecheck` e `npx expo export --platform web`.
- Risco: alteração transitiva do lockfile pelo npm; revisar o diff antes de concluir.
