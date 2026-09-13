# Entrada

- Run ID: 20260831-234435-settings-child-routes
- Criado em: 2026-08-31T23:44:35-03:00
- Status: concluido

## Tarefa recebida

Migrar itens de configuracoes de section para paginas e rotas filhas

## Objetivo e escopo

Migrar os itens de Configuracoes de `section` para paginas e rotas filhas reais.

## CritÃ©rios de aceite

- A lista usa as rotas `configuracoes/conta`, `configuracoes/senha`,
  `configuracoes/sobre` e `configuracoes/contato`.
- O parametro `section` deixa de ser usado.
- O Header oferece voltar em toda a arvore de Configuracoes.
- O TabNavigator fica oculto em todas as paginas filhas.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar as alteracoes recentes em `routes.ts`.
- Nao criar navegadores paralelos.
