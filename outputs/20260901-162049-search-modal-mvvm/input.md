# Entrada

- Run ID: 20260901-162049-search-modal-mvvm
- Criado em: 2026-09-01T16:20:49-03:00
- Status: concluído

## Tarefa recebida

Refatorar o SearchModal para manter o estado dos filtros e substituir o botão inline por ButtonView, mantendo a lógica atual e separando a camada MVVM do modal.

## Objetivo e escopo

- Extrair a lógica do modal para model e viewmodel mantendo a sincronização com os parâmetros de rota.
- Substituir o botão inline de limpar filtros pelo componente compartilhado ButtonView.
- Preservar o comportamento de filtros ativos, abertura/fechamento, busca por voz e navegação.

## Critérios de aceite

- O modal continua funcionando com os filtros selecionados e sincronizados com a rota.
- O botão de limpar filtros usa o componente compartilhado.
- O código segue a estrutura MVVM em SearchModal.
- A checagem TypeScript final executa sem erros.

## Restrições, suposições e fora do escopo

- Não foi alterada a navegação principal do app nem o layout do shell.
- A correção foca no componente SearchModal e em sua estrutura.
- O comportamento de filtros permanece dependente da solução já validada em query params.
