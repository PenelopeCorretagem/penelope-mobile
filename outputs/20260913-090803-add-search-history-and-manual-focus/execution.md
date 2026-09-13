# ExecuÃ§Ã£o

- Status: concluído

## AlteraÃ§Ãµes

Adicionado AsyncStorage, histórico limitado a cinco entradas e seleção de
pesquisas recentes. Filtros agora iniciam fechados e substituem o histórico
quando abertos. Removido o foco automático do input; o fechamento também remove
foco residual.

## Comandos e resultados

`npx expo install @react-native-async-storage/async-storage`: concluído.
`npm run typecheck`: aprovado.
`git diff --check`: aprovado.
`get_errors`: sem erros nos arquivos do SearchModal.

## Desvios, falhas e bloqueios

O `npm install` reportou avisos de peer dependency preexistentes e 18
vulnerabilidades moderadas; não foram tratados por não fazerem parte do escopo.
