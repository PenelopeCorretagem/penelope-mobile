# Entrada

- Run ID: 20260906-185803-equal-form-buttons
- Criado em: 2026-09-06T18:58:03-03:00
- Status: recebido

## Tarefa recebida

Ajustar os dois botões do FormView para ocuparem metade do espaço disponível na mesma altura

## Objetivo e escopo

Ajustar a linha de ações de `FormView` para que os botões de voltar e ação
principal tenham a mesma altura e dividam igualmente o espaço horizontal.

## CritÃ©rios de aceite

- Os dois botões permanecem na mesma linha.
- Os dois botões têm largura flexível igual.
- Os dois botões têm a mesma altura visual.
- O comportamento de `onBack`, `onNext` e `onSubmit` permanece inalterado.
- `npm run typecheck` passa.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Alterar somente o estilo local de `FormView`.
- O `gap` existente permanece; cada botão divide igualmente o espaço restante
	após o espaçamento entre eles.
- Não alterar o componente compartilhado `Button` nem o comportamento de formulário.
