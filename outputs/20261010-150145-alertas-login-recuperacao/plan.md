# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

Módulo `auth`: login já autentica pela API; recuperação apresentava uma confirmação local sem chamar o endpoint do backend. A API existente aceita `POST /v1/auth/forgot-password` com `{ email }` e devolve mensagem genérica.

## Plano de implementaÃ§Ã£o

1. Restringir botão de confirmação do AlertView a variante `error`.
2. Aplicar loading mínimo de 1 segundo e sucesso de 1,5 segundo no login, preservando o destino atual.
3. Centralizar validação e estado da recuperação em Model/ViewModel, adicionar a rota/API do endpoint existente e exibir sucesso temporário sem navegar para fora.
4. Validar tipos e diagnósticos nos arquivos alterados.

## ValidaÃ§Ã£o e riscos

Risco baixo: a recuperação passa a fazer uma chamada real; a API retorna texto genérico para manter privacidade. Alertas de sucesso desaparecem automaticamente e a pessoa permanece na recuperação.
