# Entrada

- Run ID: 20260913-090803-add-search-history-and-manual-focus
- Criado em: 2026-09-13T09:08:03-03:00
- Status: recebido

## Tarefa recebida

Adicionar historico persistente das ultimas cinco pesquisas, filtros sob demanda e foco manual no input

## Objetivo e escopo

Adicionar histórico persistente das últimas cinco pesquisas no SearchModal,
mostrar esse histórico abaixo do input, abrir filtros somente sob demanda e
impedir foco/teclado automático ao abrir pela lupa.

## Critérios de aceite

- Últimas cinco pesquisas são persistidas no armazenamento do dispositivo.
- Histórico aparece abaixo do input quando filtros estão fechados.
- Ao abrir filtros, o histórico não é renderizado e o painel ocupa a área.
- O modal abre sem foco automático no input; tocar no input permite digitação.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Usar AsyncStorage compatível com Expo.
- Preservar o fluxo atual de consulta, filtros e pesquisa por voz.
- Não alterar o contrato da API de anúncios.
