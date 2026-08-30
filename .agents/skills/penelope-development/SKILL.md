---
name: penelope-development
description: Orquestra features, correções e refatorações no Penelope Mobile do recebimento da tarefa ao relatório final, usando o workflow MVVM do projeto, agentes especializados e outputs auditáveis. Use quando uma solicitação exigir planejar e alterar código deste repositório; não use para perguntas conceituais sem mudança no projeto.
---

# Penelope Development

Conduza cada tarefa pela sequência `input -> planejamento -> execução -> saída`.
O agente principal é o orquestrador e mantém a responsabilidade pela decisão final,
pelos arquivos de output e pela comunicação com o usuário.

## Preparação

1. Leia `docs/development-workflow.md`, `AGENTS.md`, `tsconfig.json` e os arquivos
   diretamente relacionados à tarefa.
2. A partir da raiz do repositório, execute:

   ```powershell
   powershell -ExecutionPolicy Bypass `
     -File .agents/skills/penelope-development/scripts/new-run.ps1 `
     -Slug <slug> -Task <tarefa>
   ```

   Guarde o diretório retornado como `<run-dir>`.
3. Complete `<run-dir>/input.md` com objetivo, escopo, critérios de aceite,
   restrições e suposições. Se faltar uma decisão que mudaria materialmente o
   resultado, pergunte; caso contrário, registre uma suposição conservadora e siga.

Leia [references/output-contract.md](references/output-contract.md) antes de criar
ou atualizar os arquivos da execução.

## Planejamento

Delegue a exploração ao agente `penelope_planner` quando subagentes estiverem
disponíveis. Forneça a tarefa e o caminho de `input.md`; peça um plano aderente ao
documento de desenvolvimento. O planejador não altera arquivos.

Revise o retorno, resolva inconsistências com o repositório real e grave o plano
aprovado em `<run-dir>/plan.md`. O plano deve identificar módulo, reutilização,
camadas MVVM afetadas, rota, validações, riscos e nome de branch sugerido.

Leia [references/architecture-checklist.md](references/architecture-checklist.md)
durante o planejamento e novamente na revisão.

## Execução

Delegue a implementação ao agente `penelope_implementer`, entregando `input.md` e
`plan.md`. Ele é o único subagente autorizado a editar o código nesta execução.
Não execute outro agente escritor em paralelo.

O executor deve preservar alterações preexistentes, manter o escopo e rodar as
validações proporcionais à mudança. Registre em `<run-dir>/execution.md`:

- arquivos criados, alterados ou removidos;
- decisões e desvios do plano;
- comandos executados e resultados;
- falhas, bloqueios e itens não realizados.

Não crie Issue, Pull Request, merge, publicação ou outra mutação externa sem
autorização explícita. Criar ou trocar branch também não deve sobrescrever trabalho
local; registre a branch atual e a sugestão quando a troca não for segura.

## Revisão e saída

Delegue a revisão ao agente `penelope_reviewer` depois que o executor terminar. O
revisor trabalha em modo somente leitura, verifica o código real e devolve achados
priorizados. Grave o resultado em `<run-dir>/review.md`.

Se houver achado bloqueante e a correção estiver dentro do escopo, devolva-o ao
executor e peça uma correção focada; depois repita a revisão. Pare após duas rodadas
sem resolução e registre o bloqueio, em vez de criar um ciclo indefinido.

Finalize `<run-dir>/summary.md` mesmo quando a tarefa falhar ou for interrompida.
Inclua status, entregas, validações, pendências e próximo passo. Antes de responder,
execute:

```powershell
powershell -ExecutionPolicy Bypass `
  -File .agents/skills/penelope-development/scripts/validate-run.ps1 `
  -RunDirectory <run-dir>
```

Informe claramente qualquer validação que não tenha sido possível concluir.
