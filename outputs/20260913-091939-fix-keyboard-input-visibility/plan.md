# Planejamento

- Status: aprovado

## Contexto e módulo

O comportamento é controlado por `src/shared/components/forms/Form/FormView.tsx`
e pelos `KeyboardAvoidingView`/`ScrollView` das telas consumidoras. O formulário
compartilhado não expõe foco para o container, e o formulário de contato usa
inputs próprios dentro de um `ScrollView` desabilitado.

## Plano de implementação

1. Expor callback de foco no `FormView` e dispará-lo nos inputs de texto.
2. Conectar as telas de conta, senha, recuperação e autenticação a refs dos seus
	`ScrollView`, rolando ao fim após o teclado iniciar.
3. Ajustar `ContactsView` e `ContactFormView` para o mesmo comportamento, mantendo
	a rolagem externa habilitada e o teclado encapsulado pelo container.

## Validação e riscos

- Rodar `npm run typecheck` e revisar referências dos callbacks.
- Validar que o callback é opcional e não altera consumidores sem necessidade.
- Risco: o atraso de foco pode variar entre plataformas; usar atraso curto após o foco
	para permitir que o teclado altere a área disponível.
