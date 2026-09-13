# Execução

## Arquivos alterados

- `src/shared/components/forms/Form/FormView.tsx`

## Alteração

- `actionsRow` passou a usar `alignItems: 'stretch'`.
- `backButton` passou a usar `flex: 1`.

O `primaryButton` já usava `flex: 1`, então os dois botões agora dividem igualmente o espaço disponível e mantêm a mesma altura na linha.

## Validação

- `npm run typecheck`: passou.
