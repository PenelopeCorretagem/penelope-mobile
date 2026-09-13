# Entrada

- Run ID: 20260904-180048-favorites-properties-search-routing
- Criado em: 2026-09-04
- Status: planejado

## Tarefa recebida

Reutilizar a tela de imóveis na rota de favoritos com filtro do usuário logado e direcionar a busca para a rota correta.

## Objetivo e escopo

Reutilizar a tela de listagem de imóveis na rota de favoritos, exibindo somente os anúncios cujos IDs estão salvos pelo usuário autenticado na sessão atual. Manter a busca por texto, voz e filtros na rota em que o modal foi aberto; quando aberto em qualquer outra rota, submeter a busca para a listagem geral de imóveis.

## Critérios de aceite

- Favoritos e imóveis usam a mesma View e o mesmo ViewModel de listagem.
- A rota de favoritos exibe somente anúncios presentes em `favoriteIds`.
- Texto, áudio, filtros e limpeza submetidos em favoritos permanecem em favoritos.
- Texto, áudio, filtros e limpeza submetidos fora de favoritos são direcionados para `APP_ROUTES.imoveis`.
- Loading, erro, paginação, ordenação e estado vazio continuam funcionando.
- `npm run typecheck` passa sem novos erros.

## Restrições, suposições e fora do escopo

- Preservar a arquitetura MVVM e os aliases existentes.
- O `FavoritesContext` atual representa os favoritos da sessão e não fornece persistência nem identificador de usuário; esta tarefa não cria API nem altera o contrato de autenticação.
- Não duplicar a tela de propriedades nem criar um novo navigator.
- Branch atual: `feat-home`; não trocar de branch.
