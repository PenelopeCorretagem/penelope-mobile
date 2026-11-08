# Planejamento

- Status: aprovado

## Contexto e módulo

- `TrendAnalysisView` é a View responsável pela tela.
- `AlertView` já suporta apresentação modal e fechamento.
- A tela não possuía mais `AlertView` nem `useFocusEffect`.

## Plano de implementação

1. Importar `useFocusEffect` de `expo-router` e remontar o alerta com uma chave
   incrementada a cada foco.
2. Renderizar o `AlertView` modal na tela de tendências com a mensagem
   informativa existente.
3. Preservar o conteúdo, filtros e shell de navegação.

## Validação e riscos

- Executar `npm run typecheck`, a validação TypeScript alternativa e
  `git diff --check`.
- O risco principal é a tela receber múltiplos focos; a `key` garante que o
  estado interno de fechamento do alerta seja reinicializado em cada entrada.
