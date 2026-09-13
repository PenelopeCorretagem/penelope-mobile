# Execução

- Status: concluído

## Alterações

- `src/shared/components/forms/Form/FormView.tsx`: adiciona callback opcional de foco.
- Telas de autenticação e conta: conectam foco a refs de `ScrollView` e rolagem ao fim.
- `ContactsView` e `ContactFormView`: aplicam o mesmo comportamento ao formulário institucional.

## Comandos e resultados

- `npm run typecheck`: passou após corrigir um import inicial de `useRef`.
- `git diff --check`: passou; apenas avisos preexistentes de conversão de newline foram exibidos.

## Desvios, falhas e bloqueios

- A primeira execução do typecheck falhou por importar `useRef` de `react-native`; corrigido imediatamente.
- Não foi executado teste em dispositivo físico/emulador nesta sessão.
