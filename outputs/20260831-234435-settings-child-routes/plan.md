# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

`SettingsView` ainda lia `section` e renderizava detalhes localmente. A arvore atual
ja possui rotas filhas para conta, sobre e contato, e `routes.ts` declara os destinos
aninhados; faltava alinhar a View e criar a rota/tela de senha.

## Plano de implementaÃ§Ã£o

1. Remover estado e parametro `section` de `SettingsView`.
2. Associar cada item de conteudo ao href da rota filha em `APP_ROUTES`.
3. Garantir Header com voltar e ocultar tabs em toda a subarvore.
4. Criar `configuracoes/senha` e sua tela basica.
5. Validar typecheck e diagnosticos.

## ValidaÃ§Ã£o e riscos

- Baixo risco: a mudanca segue a arvore real do Expo Router.
- Validacao: `npm run typecheck`.
