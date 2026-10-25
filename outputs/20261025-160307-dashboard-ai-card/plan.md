# Planejamento

- Status: aprovado

## Contexto e módulo

- Módulo responsável: `src/modules/dashboard/pages/Trend`.
- `DashboardModel.ts` fornece os indicadores e `DashboardView.tsx` renderiza o grid com cards de 48%.
- Reuso avaliado: manter os estilos e o grid existentes; adicionar uma propriedade de apresentação ao modelo para evitar regra baseada no texto do título.

## Plano de implementação

- Model: declarar o indicador destacado como ocupando duas colunas.
- View: aplicar condicionalmente o estilo de largura ampla apenas ao card destacado.
- ViewModel: sem alteração, pois não há novo estado ou efeito.
- Rotas: nenhuma alteração.

## Validação e riscos

- Executar `npm run typecheck` e revisar o diff.
- Uma largura fixa pode quebrar em telas estreitas; usar a largura total do grid (`100%`) e preservar o gap existente.
- Não há decisões pendentes.
