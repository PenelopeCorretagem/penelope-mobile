# Planejamento

- Status: aprovado

## Contexto e módulo

Os campos já acionam rolagem ao receber foco, mas alguns `ScrollView` terminam
no próprio botão e não têm espaço para rolar o botão acima do teclado.

## Plano de implementação

Adicionar `paddingBottom: 160` aos content containers dos formulários e à tela
de contato, mantendo a recuperação que já possui esse espaço.

## Validação e riscos

Rodar `npm run typecheck` e revisar que o espaço é aplicado somente aos
containers de rolagem. O risco visual é excesso de espaço ao fechar o teclado,
aceitável por ser área rolável e não alterar o layout do formulário.
