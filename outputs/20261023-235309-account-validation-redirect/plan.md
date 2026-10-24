# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

Perfil já só redirecionava após retorno verdadeiro, mas não validava campos localmente. Senha redirecionava sempre porque seu handler era placeholder sem validação.

## Plano de implementaÃ§Ã£o

1. Adicionar validação pura do perfil e fazê-la bloquear `saveProfile`.
2. Adicionar validação e mensagem de erro ao submit de senha.
3. Manter AlertView de erro na tela e sucesso com atraso de 1,5 s.
4. Validar TypeScript, diagnósticos e workflow.

## ValidaÃ§Ã£o e riscos

Risco baixo. Nenhum redirect é executado em falha local; o perfil também depende do retorno booleano do service para confirmar sucesso da API.
