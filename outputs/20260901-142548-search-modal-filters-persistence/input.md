# Entrada

- Run ID: 20260901-142548-search-modal-filters-persistence
- Criado em: 2026-09-01T14:25:48-03:00
- Status: concluído

## Tarefa recebida

Corrigir persistência de filtros do SearchModal ao navegar para /imoveis e quando já está na tela.

## Objetivo e escopo

Corrigir o fluxo de busca do modal global para que os filtros selecionados sejam salvos e reaplicados ao entrar na tela de imóveis, bem como quando o usuário já está nessa rota.

## Critérios de aceite

- O modal salva `searchTerm`, `city`, `region`, `type` e `sortOrder` ao confirmar a busca.
- Ao navegar para `/imoveis` a partir de outra rota, os filtros continuam aplicados na tela.
- Quando a rota `/imoveis` já está ativa, os filtros são atualizados via params sem perder o estado.
- A correção fica localizada no fluxo de rota e persistência do modal.

## Restrições, suposições e fora do escopo

- Preservar a arquitetura MVVM e os aliases já existentes.
- Não ampliar a correção para outros módulos sem necessidade.
- O projeto tem erros de TypeScript fora do escopo desta correção em imports de Footer inexistentes.
