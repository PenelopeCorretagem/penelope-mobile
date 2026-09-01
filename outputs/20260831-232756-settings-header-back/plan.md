# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

`SettingsView` controlava a secao ativa em estado local e renderizava um link
interno de retorno. O Header de Configuracoes ja usa `router.back()`, portanto a
solucao deve representar a secao no historico da propria rota.

## Plano de implementaÃ§Ã£o

1. Ler `section` com `useLocalSearchParams`.
2. Abrir detalhes com `router.push` para `APP_ROUTES.app.configuracoes` e o parametro.
3. Remover o link interno e o estado local.
4. Validar typecheck e referencias.

## ValidaÃ§Ã£o e riscos

- O historico do Router passa a controlar a volta da lista para o detalhe.
- Validacao: `npm run typecheck`.
