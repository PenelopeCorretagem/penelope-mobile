# Planejamento

- Status: aprovado

## Contexto

O card amplo usa `width: '100%'`. Os cards compactos foram alterados para
`flex: 1`, mas essa regra não expressa claramente duas colunas com o gap
existente. O grid deve distribuir duas larguras fixas e usar o espaço restante
como intervalo entre elas.

## Implementação

1. Remover `flex: 1` dos cards compactos.
2. Definir a largura compacta como `48%`, mantendo duas colunas.
3. Usar `justifyContent: 'space-between'` no grid para alinhar as bordas
   externas ao card amplo.
4. Preservar `alignItems: 'stretch'` para nivelar o início e fim verticais.

## Validação

- Executar `npm run typecheck` e `git diff --check`.
- Confirmar que `indicatorCardWide` continua com largura total.
