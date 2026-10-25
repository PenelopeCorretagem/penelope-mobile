# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

Módulo auth do app e componente shared de feedback. O `Form` já recebe `statusMessage`, enquanto o `AlertView` atual só apresenta erro; ampliar o contrato do alerta com variantes e loading e propagar as opções pelo AuthScreen/Form. No ViewModel, manter sucesso separado de erro e aguardar 2 segundos antes do redirect.

## Plano de implementaÃ§Ã£o

1. Estender AlertView com variantes error/success/info e ActivityIndicator primary opcional.
2. Substituir texto simples de status do Form por AlertView e propagar variante/loading.
3. Exibir estados de cadastro e atrasar navegação ao login por dois segundos após sucesso.
4. Rodar typecheck com a opção de compatibilidade conhecida para TS 6 e revisar diagnósticos.

## ValidaÃ§Ã£o e riscos

Risco baixo: AlertView é usado por outras telas; variante padrão `error` preserva o comportamento existente. O atraso ocorre apenas após resposta positiva da API.
