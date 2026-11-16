# Entrada

- Run ID: 20261108-020543-trend-analysis-ai-modal
- Data: 2026-11-08
- Status: concluído
- Branch atual: main

## Tarefa recebida

Exibir o aviso sobre análises preditivas de IA como um popup modal ao acessar a
tela de tendências, com opção explícita de fechamento.

## Objetivo e escopo

- Reutilizar o `AlertView` compartilhado em apresentação modal.
- Reabrir o popup a cada foco/acesso à tela de tendências, inclusive ao retornar
  para a aba.
- Garantir botão de fechamento também para a variante `info`.
- Preservar a introdução e o conteúdo da tela.

## Critérios de aceite

1. O aviso não aparece como bloco inline.
2. O aviso usa `AlertView` com `presentation="modal"` e `variant="info"`.
3. Existe ação acessível para fechar o popup.
4. O popup volta a aparecer quando a tela de tendências recebe foco novamente.
5. TypeScript compila com a validação disponível.

## Restrições, suposições e fora do escopo

- Não criar novo componente de alerta.
- Não alterar rotas ou o shell de navegação.
- Manter o comportamento existente de `AlertView` para os demais usos.
