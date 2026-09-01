# Planejamento

- Status: aprovado

## Contexto e modulo

O modulo responsavel e `src/shared/components/layout/SearchModal`, que renderiza
o campo de pesquisa global. A `PropertiesView` limpa o estado do ViewModel e os
parametros da rota, mas o modal mantem `filters` em estado local.

## Plano de implementacao

1. Ao abrir o modal, reidratar `filters` usando `getFiltersFromRouteParams`.
2. Manter a sincronizacao existente por parametros para mudancas enquanto o modal
	 estiver montado.
3. Rodar o typecheck e revisar o limite MVVM.

Camadas afetadas: View compartilhada de pesquisa; nenhuma mudanca de Model,
ViewModel da feature, service ou rota.

## Validacao e riscos

- Validacao principal: `npm run typecheck`.
- Risco baixo: a reidratação na abertura pode descartar texto local ainda nao
	submetido; isso e coerente com a rota como fonte de verdade apos fechar a busca.
- Branch atual: `feat-home`; nenhuma troca de branch sera feita.
