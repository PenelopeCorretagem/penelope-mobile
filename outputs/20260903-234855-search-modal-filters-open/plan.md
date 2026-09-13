# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O efeito que reage a visible atualmente chama setIsExpanded(false) ao preparar o modal.

## Plano de implementaÃ§Ã£o

Trocar esse reset por setIsExpanded(true), preservando o toggle da View e o reset fora da tela.

## ValidaÃ§Ã£o e riscos

Executar npm run typecheck e validar os outputs.
