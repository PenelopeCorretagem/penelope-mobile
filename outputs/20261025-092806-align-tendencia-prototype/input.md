# Entrada

- Run ID: 20261025-092806-align-tendencia-prototype
- Criado em: 2026-10-25T09:28:06-03:00
- Status: recebido

## Tarefa recebida

Recriar a tela de Tendência conforme o protótipo enviado

## Objetivo e escopo

Recriar a tela da tab Tendência conforme o protótipo anexado: cabeçalho de
evolução do preço, filtros da análise, indicadores do mercado e gráfico de
evolução do preço por metro quadrado. A alteração fica restrita à feature
`src/modules/dashboard/pages/Trend`; a rota e a tab existentes devem continuar.

## Critérios de aceite

- A tela reproduz a hierarquia visual, textos, cartões, espaçamentos, cores,
  ícones e gráfico apresentados no protótipo.
- Filtros de período, bairro e área são visíveis e possuem estado local
  controlado pelo ViewModel.
- “Limpar filtros” restaura os valores iniciais.
- Indicadores e gráfico são renderizados a partir de dados tipados do Model.
- A tela permanece sem chamadas diretas à API e mantém MVVM.
- `npx tsc --noEmit --ignoreDeprecations 6.0` passa; `npm run typecheck` é
  executado e seu resultado é registrado.

## Restrições, suposições e fora do escopo

- Os seletores são implementados como controles visuais locais nesta etapa;
  integração com arquivos históricos, backend, date picker ou dropdown
  interativo não foi solicitada pelo protótipo e fica fora do escopo.
- Não alterar a navegação, outras tabs ou o layout global.
- Reutilizar os componentes, cores e espaçamentos existentes.
