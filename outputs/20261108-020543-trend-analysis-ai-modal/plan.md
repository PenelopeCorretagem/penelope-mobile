# Planejamento

- Status: aprovado

## Módulo e camadas

O ajuste envolve a View de `src/modules/trend-analysis/pages/TrendAnalysis`,
que controla a apresentação da tela, e o componente compartilhado
`src/shared/components/feedback/Alert/AlertView.tsx`, que já implementa Modal,
estado de dismiss e acessibilidade.

## Plano

1. Usar `useFocusEffect` da Expo Router na View para gerar uma chave de montagem
   nova sempre que a tela receber foco.
2. Renderizar o `AlertView` com `presentation="modal"` e `variant="info"`.
3. Alterar o modal compartilhado para exibir o botão de fechamento para todas as
   variantes não-loading, mantendo os usos inline e os demais comportamentos.
4. Executar typecheck e revisar acessibilidade e outputs.

## Riscos e validação

- A chave de montagem deve evitar estado global e garantir reabertura sem alterar
  a API pública do alerta.
- `useFocusEffect` é API já fornecida pelo Expo Router usado no projeto.
- Validar com `npm run typecheck`; se a depreciação preexistente bloquear, usar a
  mesma alternativa documentada na execução anterior e registrar a limitação.
