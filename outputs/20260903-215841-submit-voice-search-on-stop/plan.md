# Plan

Status: aprovado

## Modulo e evidencia

- Componente compartilhado `SearchModal`.
- `handleVoiceSearch(false)` atualmente define `isListening`, chama `stop()` e retorna.
- `handleSubmitSearch` ja e a acao central para normalizacao, navegacao e fechamento do modal.

## Camadas avaliadas

- ViewModel: unico arquivo afetado; concentra estado, efeito de voz e acoes.
- View: apenas dispara `handleVoiceSearch`; nenhuma alteracao necessaria.
- Model, services e rotas: nao participam da decisao solicitada.

## Implementacao

1. Chamar `handleSubmitSearch()` no ramo `!shouldStart`, apos interromper o reconhecimento.
2. Incluir `handleSubmitSearch` nas dependencias do `useCallback` de `handleVoiceSearch`.
3. Executar `npm run typecheck`.
4. Revisar o diff contra os criterios e validar os outputs da execucao.

## Riscos e decisoes

- O callback deve capturar a versao atual de `filters`; a dependencia explicita evita stale closure.
- A submissao ocorre mesmo sem filtro ativo, conforme solicitado, e reutiliza o fluxo ja existente.
- Nenhuma rota e alias novo e necessario.
