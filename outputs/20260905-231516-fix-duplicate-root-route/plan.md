# Plano

Status: executado

- Remover `src/app/(private)/index.tsx`, que duplica o caminho `/`.
- Preservar `src/app/index.tsx` como único decisor de autenticação.
- Executar typecheck e export web para validar a árvore de rotas.
