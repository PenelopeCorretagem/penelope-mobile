# Contrato dos outputs

Cada execução usa `outputs/<AAAAMMDD-HHMMSS>-<slug>/` e mantém cinco arquivos.
Atualize o campo `Status` em cada fase; não apague evidências de falha.

## `input.md`

- Identificação da execução e data/hora.
- Tarefa recebida, objetivo e escopo.
- Critérios de aceite verificáveis.
- Restrições, suposições e itens fora do escopo.
- Branch atual e branch sugerida, quando aplicável.

## `plan.md`

- Módulo responsável e evidências encontradas.
- Código reutilizável avaliado.
- Arquivos/camadas afetados e sequência de implementação.
- Estratégia de validação.
- Riscos, dependências e decisões pendentes.

## `execution.md`

- Resultado da execução e arquivos modificados.
- Decisões tomadas e desvios do plano.
- Comandos e resultados observados.
- Erros, bloqueios e trabalho não realizado.

## `review.md`

- Veredito: `aprovado`, `ajustes necessários` ou `bloqueado`.
- Achados por severidade com referências a arquivos.
- Resultado do checklist arquitetural.
- Validações executadas e lacunas de cobertura.

## `summary.md`

- Status final: `concluído`, `parcial` ou `bloqueado`.
- Objetivo e entregas em linguagem direta.
- Validações aprovadas e não executadas.
- Pendências e próximo passo recomendado.

Um arquivo vazio, apenas com o scaffold ou com status `não iniciado` representa
uma execução incompleta e deve fazer a validação falhar.
