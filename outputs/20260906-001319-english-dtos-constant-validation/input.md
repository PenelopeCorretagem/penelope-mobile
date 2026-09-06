# Entrada

- Run ID: 20260906-001319-english-dtos-constant-validation
- Criado em: 2026-09-06T00:13:19-03:00
- Status: concluída

## Tarefa recebida

Renomear DTOs para inglês e restringir tipos de mídia e imóvel às constantes do domínio

## Objetivo e escopo

Renomear DTOs para inglês e restringir os tipos de mídia e imóvel aos valores das constantes de domínio.

## CritÃ©rios de aceite

DTOs e símbolos em inglês; `MediaTypeId` e `EstateType` derivados das constantes; guards de runtime; typecheck aprovado.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

Preservar os DTOs de UI legados em `src/types` e não alterar payloads de serviços existentes.
