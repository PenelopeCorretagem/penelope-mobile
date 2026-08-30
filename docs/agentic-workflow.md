# Workflow com agentes e skills

Este workflow operacionaliza as regras de `docs/development-workflow.md` no Codex.
A entrada pode ser uma solicitação em linguagem natural; cada execução gera um
registro auditável em `outputs/`.

```text
input -> planejamento -> execução -> saída
             |              |
             v              v
      penelope_planner  penelope_implementer
                              |
                              v
                       penelope_reviewer
```

O planejador e o revisor trabalham em modo somente leitura. O implementador é o
único subagente escritor, reduzindo conflitos. O agente principal coordena as fases,
decide sobre achados e grava os outputs.

## Como usar

No Codex CLI ou na extensão, invoque a skill:

```text
$penelope-development implemente a tela de contatos com estados de loading e erro
```

A skill também pode ser selecionada automaticamente para pedidos de implementação,
correção ou refatoração neste repositório.

Para criar apenas o scaffold de uma execução manualmente:

```powershell
powershell -ExecutionPolicy Bypass `
  -File .agents/skills/penelope-development/scripts/new-run.ps1 `
  -Slug contatos `
  -Task 'Implementar a tela de contatos'
```

Para validar que todos os registros foram finalizados:

```powershell
powershell -ExecutionPolicy Bypass `
  -File .agents/skills/penelope-development/scripts/validate-run.ps1 `
  -RunDirectory outputs/20260823-120000-contatos
```

## Artefatos por execução

```text
outputs/<run-id>/
├── input.md
├── plan.md
├── execution.md
├── review.md
└── summary.md
```

- `input.md`: pedido normalizado, escopo e critérios de aceite.
- `plan.md`: impacto arquitetural e plano aprovado.
- `execution.md`: mudanças, comandos, decisões e falhas.
- `review.md`: veredito, achados e checklist.
- `summary.md`: saída final, validações, pendências e próximo passo.

O workflow não cria Issue, Pull Request, merge ou publicação automaticamente.
Essas ações externas continuam dependendo de um pedido explícito.
