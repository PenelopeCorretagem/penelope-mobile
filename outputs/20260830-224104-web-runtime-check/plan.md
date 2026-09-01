# Planejamento

- Status: concluído

## Contexto e módulo

O problema foi investigado no módulo de navegação e estilos compartilhados, além da app root em [src/app/_layout.tsx](../../src/app/_layout.tsx). O app usa Expo Router e React Native Web, então qualquer estilo incompatível em browser pode gerar o erro clássico do navegador ao tentar setar uma propriedade indexada no CSSStyleDeclaration.

## Plano de implementação

1. localizar qualquer uso de `gap` ou propriedades de estilo incompatíveis em toda a base em [src](../../src);
2. validar a app em runtime real via servidor Expo Web e captura do console do navegador;
3. confirmar se o erro ainda existe ou se foi resolvido por correções anteriores;
4. registrar evidências finais e validar com `npm run typecheck`.

## Validação e riscos

- risco principal: falso positivo por causa de estilos dinâmicos em web; por isso a verificação foi feita com execução real do navegador;
- garantia: a build web também foi validada com `npx expo export --platform web --output-dir dist`;
- custo de correção: mínimo, sem impacto em arquitetura MVVM.
