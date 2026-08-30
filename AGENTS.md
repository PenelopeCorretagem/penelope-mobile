# Penelope Mobile

## Fontes obrigatórias

- Leia `docs/development-workflow.md` antes de planejar ou alterar código.
- O projeto usa Expo SDK 54. Consulte a documentação versionada em
  https://docs.expo.dev/versions/v54.0.0/ antes de usar ou alterar APIs do Expo.
- Respeite os aliases reais definidos em `tsconfig.json`.

## Workflow de desenvolvimento

Para implementar features, correções ou refatorações, use a skill
`$penelope-development` e siga as fases:

```text
input -> planejamento -> execução -> saída
```

- Registre cada execução em `outputs/<run-id>/`.
- Use `penelope_planner` para explorar o código e preparar o plano.
- Use `penelope_implementer` como o único agente que altera o código.
- Use `penelope_reviewer` depois da implementação para validar o resultado.
- Execute os agentes em sequência. Só paralelize investigações independentes e
  somente leitura.
- Não crie Issue, Pull Request, merge ou publicação externa sem pedido explícito.
- Não esconda falhas: registre bloqueios, comandos que falharam e pendências na
  saída da execução.

## Validação mínima

- Execute `npm run typecheck` após alterações TypeScript/TSX.
- Rode testes adicionais existentes e relevantes à mudança.
- Verifique as regras MVVM e o checklist de
  `docs/development-workflow.md` antes de concluir.
