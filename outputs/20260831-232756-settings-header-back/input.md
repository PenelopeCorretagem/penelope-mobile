# Entrada

- Run ID: 20260831-232756-settings-header-back
- Criado em: 2026-08-31T23:27:56-03:00
- Status: concluido

## Tarefa recebida

Usar o botao voltar do Header para retornar da exibicao interna de Configuracoes

## Objetivo e escopo

Substituir o botao interno de retorno da tela de Configuracoes pelo botao voltar
existente no Header.

## CritÃ©rios de aceite

- Os detalhes permanecem na rota `configuracoes` usando parametros de secao.
- O Header volta para a lista ao usar `router.back()`.
- Sair continua navegando para login.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Nao criar rotas adicionais ou navegadores paralelos.
