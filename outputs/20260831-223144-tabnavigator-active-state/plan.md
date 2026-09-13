# Planejamento

- Status: aprovado

## Contexto e modulo

O componente responsavel e `src/shared/components/layout/TabNavigator`,
renderizado pelo layout de `src/app/app`. Os valores de `APP_ROUTES` sao relativos
e `usePathname()` fornece o caminho com `/` inicial.

## Plano de implementacao

1. Normalizar o href do link para o formato absoluto ao calcular `isActive`.
2. Rodar o typecheck e revisar o diff da alteracao.

Nenhuma camada MVVM ou service e afetada; trata-se de estado visual derivado da
rota atual.

## Validacao e riscos

- Validacao principal: `npm run typecheck`.
- Risco baixo: a comparacao continua exata e nao marca rotas filhas como ativas.
