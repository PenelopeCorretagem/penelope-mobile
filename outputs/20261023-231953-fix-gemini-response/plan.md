# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O provider lê somente `interaction.output_text`, mas a API documenta a resposta com `steps`, contendo `model_output` e blocos de conteúdo textual. O front recebe `502` porque o parser encontra texto vazio.

## Plano de implementaÃ§Ã£o

1. Extrair texto de `steps[].content[].text`, mantendo fallbacks para `interaction.output_text` e `output_text` direto.
2. Adicionar teste focal com o formato oficial atual.
3. Validar diagnósticos e executar teste Maven se disponível.

## ValidaÃ§Ã£o e riscos

Risco baixo: aceitar formatos adicionais sem alterar a validação dos filtros nem o contrato HTTP.
