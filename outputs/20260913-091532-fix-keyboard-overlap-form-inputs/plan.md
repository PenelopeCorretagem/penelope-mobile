# Planejamento

- Status: aprovado

## Contexto e módulo

Os contêineres usavam `KeyboardAvoidingView` com `behavior` indefinido no
Android. Isso permitia que o teclado cobrisse os campos; os ScrollViews também
tinham pouco espaço inferior para reposicionamento.

## Plano de implementação

Usar `behavior="height"` no Android, `automaticallyAdjustKeyboardInsets` nos
ScrollViews e padding inferior nos conteúdos roláveis.

## Validação e riscos

Executar `npm run typecheck`, `get_errors` e `git diff --check`. Teste visual em
Android/iOS permanece recomendado.
