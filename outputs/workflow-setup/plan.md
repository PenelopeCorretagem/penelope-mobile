# Planejamento

- Status: concluído

## Estrutura escolhida

1. Criar a skill repo-scoped `penelope-development` em `.agents/skills`.
2. Criar agentes de projeto em `.codex/agents`: planejador, implementador e revisor.
3. Centralizar a orquestração e o contrato de outputs na skill.
4. Adicionar scripts determinísticos para criar e validar execuções.
5. Integrar o fluxo ao `AGENTS.md` e à documentação existente.
6. Validar skill, scripts, TOML, output inicial e TypeScript do projeto.

## Decisão de concorrência

As fases são sequenciais. Apenas o implementador escreve código; planejador e
revisor usam sandbox somente leitura.
