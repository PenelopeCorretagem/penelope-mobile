# Execução

- Status: concluído

## Alterações

- `src/modules/dashboard/pages/Trend/useDashboardViewModel.ts`: adicionados o
  filtro expandido, a ação de alternância e o fechamento ao selecionar ou
  limpar.
- `src/modules/dashboard/pages/Trend/DashboardView.tsx`: substituído o avanço
  cíclico por campos expansíveis com lista inline de opções, seleção direta,
  indicação da opção atual e estados de acessibilidade.

Alterações preexistentes em `DashboardModel.ts` foram preservadas e não fazem
parte desta tarefa.

## Comandos e resultados

- `npm run typecheck`: falhou antes da análise dos arquivos por
  `TS5101` em `tsconfig.json` (`baseUrl` depreciado no TypeScript instalado).
- `git diff --check`: aprovado, sem erros de whitespace.

## Desvios, falhas e bloqueios

Não houve desvio de escopo. A validação de tipos ficou bloqueada pela
incompatibilidade da configuração existente com a versão instalada do
TypeScript; não foi alterado `tsconfig.json` para evitar mudança fora do plano.
