# Resumo

Status final: concluído

Removida a rota privada duplicada que interceptava `/` e sempre enviava o usuário para Imóveis. Agora `src/app/index.tsx` é o único root e decide entre Imóveis e login usando `isAuthenticated`.

Validações aprovadas: `npm run typecheck` e `npx expo export --platform web`.
