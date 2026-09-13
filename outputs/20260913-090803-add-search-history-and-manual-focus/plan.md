# Planejamento

- Status: aprovado

## Contexto e módulo

O ViewModel abria filtros automaticamente com `setIsExpanded(true)` e focava o
input com `inputRef.current?.focus()`. Não havia armazenamento de histórico.

## Plano de implementação

1. Instalar AsyncStorage e criar limite/chave do histórico no Model.
2. Carregar, deduplicar e persistir entradas completas de pesquisa no ViewModel.
3. Renderizar histórico quando filtros estiverem fechados e selecionar uma
	entrada como consulta.
4. Remover foco automático e manter filtros fechados ao abrir o modal.

## Validação e riscos

Executar `npm run typecheck`, `git diff --check` e diagnósticos dos arquivos do
SearchModal.
