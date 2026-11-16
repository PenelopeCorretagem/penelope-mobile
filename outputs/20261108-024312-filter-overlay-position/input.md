# Entrada

- Run ID: 20261108-024312-filter-overlay-position
- Criado em: 2026-11-08T02:43:12-03:00
- Status: recebido

## Tarefa recebida

Ajustar a abertura vertical do filtro para que o painel apareça mais acima

## Objetivo e escopo

Ajustar somente a posição vertical do painel de filtros da tela de tendências,
fazendo-o abrir próximo ao cabeçalho da página e sobrepor o conteúdo abaixo.

## CritÃ©rios de aceite

- O painel deve abrir logo abaixo do título e do botão de filtro.
- O painel deve continuar sobrepondo os componentes abaixo, sem alterar filtros,
  navegação ou o layout global do shell.
- A alteração deve manter tipagem e formatação válidas.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alterações preexistentes na árvore de trabalho.
- Não alterar a navegação, o estado dos filtros ou componentes compartilhados.
- A posição `top: 52` é uma aproximação baseada na altura do cabeçalho externo
  (`pageHeader`) e no espaçamento da seção.
