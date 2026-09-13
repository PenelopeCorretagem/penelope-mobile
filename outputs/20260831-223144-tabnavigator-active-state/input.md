# Entrada

- Run ID: 20260831-223144-tabnavigator-active-state
- Criado em: 2026-08-31T22:31:44-03:00
- Status: planejado

## Tarefa recebida

Corrigir o estado selecionado dos botoes do TabNavigator.

## Objetivo e escopo

Fazer com que o botao correspondente a rota atual receba os estilos ativo apos
ser clicado. O escopo fica restrito ao calculo de `isActive` do TabNavigator.

## Criterios de aceite

- O botao Home fica selecionado em `/app/home`.
- Os botoes Imoveis, Favoritos e Perfil ficam selecionados em suas rotas.
- A navegacao existente continua funcionando.
- `npm run typecheck` passa.

## Restricoes, suposicoes e fora do escopo

- Preservar alteracoes preexistentes do worktree.
- Nao alterar a estrutura de rotas, labels, icones ou estilos.
