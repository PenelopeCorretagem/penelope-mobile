# Planejamento

- Status: aprovado

## Contexto e módulo

As telas usam `KeyboardAvoidingView` e `ScrollView`, mas receberam `paddingBottom`
fixo de 160px para criar área de rolagem. Esse valor permanece visível sem teclado
e não representa diferentes alturas de teclado.

## Plano de implementação

Criar `useKeyboardHeight` em `src/shared/hooks`, ouvindo abertura e fechamento
do teclado por plataforma. Aplicar o valor retornado no `contentContainerStyle`
das cinco telas e remover os valores fixos.

## Validação e riscos

Executar `npm run typecheck` após cada fatia e revisar a limpeza das subscriptions.
O teste visual em dispositivo continua recomendado para confirmar a interação nativa.
