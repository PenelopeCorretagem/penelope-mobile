# Execução

Status: concluída

- Removido `src/app/(private)/index.tsx`, rota duplicada que sempre redirecionava para Imóveis.
- Mantido `src/app/index.tsx` como único decisor do root.
- `npm run typecheck`: aprovado.
- `npx expo export --platform web`: aprovado.
