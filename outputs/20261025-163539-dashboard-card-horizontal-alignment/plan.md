# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/dashboard/pages/Trend`. O grid dos
indicadores usa `gap: spacing.sm`, enquanto `indicatorCard` usa `width: '48%'`.
A soma dessas larguras mais o gap é menor que 100%, deixando sobra à direita.

## Plano de implementação

1. Substituir a largura percentual dos cards compactos por `flex: 1`.
2. Manter `indicatorCardWide` com `width: '100%'`, para a IA continuar em uma
   linha completa.
3. Preservar `alignItems: 'stretch'`, que nivela os cards na linha.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Verificar que o card amplo continua precedendo os dois cards compactos sem
  alterar conteúdo ou comportamento.
- A solução depende somente do flexbox já usado pelo React Native.
