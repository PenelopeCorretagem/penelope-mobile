# Entrada

- Run ID: 20260831-213140-clear-property-search
- Criado em: 2026-08-31T21:31:40-03:00
- Status: planejado

## Tarefa recebida

Corrigir a limpeza do texto digitado na tela de propriedades e na barra de pesquisa.

## Objetivo e escopo

Garantir que a acao de limpar filtros da tela de propriedades seja refletida no
`TextInput` do modal de pesquisa quando ele for aberto novamente. O escopo fica
restrito ao estado local do `SearchModalView` e a sincronizacao com os parametros
da rota existentes.

## Criterios de aceite

- Depois de limpar filtros na `PropertiesView`, reabrir a pesquisa mostra o campo vazio.
- O texto digitado continua sendo exibido enquanto a pesquisa permanece aberta.
- A limpeza preserva filtros, navegacao e carregamento de anuncios existentes.
- `npm run typecheck` passa.

## Restricoes, suposicoes e fora do escopo

- Preservar as alteracoes preexistentes do worktree.
- Nao alterar API, servico, contrato de rota ou dependencias.
- Suposicao: o botao da `PropertiesView` deve limpar todos os filtros, incluindo
	`searchTerm`, como ja indica a implementacao do ViewModel.
