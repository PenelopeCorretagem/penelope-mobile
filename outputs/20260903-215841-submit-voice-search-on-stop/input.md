# Input

Status: concluido

## Identificacao

- Execucao: 20260903-215841-submit-voice-search-on-stop
- Data: 2026-09-03
- Branch atual: feat-home
- Branch sugerida: nao aplicavel (nao criar ou trocar branch)

## Tarefa

Ao parar/soltar o microfone na SearchModal, submeter imediatamente a pesquisa usando a acao existente do ViewModel.

## Objetivo e escopo

- Alterar somente `src/shared/components/layout/SearchModal/useSearchModalViewModel.ts`.
- No ramo de parada de `handleVoiceSearch`, interromper o reconhecimento e chamar `handleSubmitSearch`.
- Ajustar dependencias do `useCallback` para manter o callback correto e evitar stale closure.

## Criterios de aceite

- Parar a pesquisa por voz chama `ExpoSpeechRecognitionModule.stop()` e submete os filtros atuais.
- A submissao continua normalizando filtros, atualizando a rota e fechando o modal pela acao existente.
- `npm run typecheck` conclui sem erros.

## Restricoes e suposicoes

- Preservar todas as alteracoes preexistentes do workspace.
- Nao adicionar dependencias, rotas, estado global ou alterar a View.
- A atualizacao final do transcript permanece controlada pelo listener existente.

## Fora do escopo

- Alterar permissao, configuracao ou comportamento do servico de reconhecimento de voz.
- Criar commit, branch, PR ou publicar alteracoes.
