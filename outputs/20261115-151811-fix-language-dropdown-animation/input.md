# Entrada

- Run ID: 20261115-151811-fix-language-dropdown-animation
- Criado em: 2026-11-15T15:18:11-03:00
- Status: executado

## Tarefa recebida

Corrigir a animação da lista de idiomas para que a abertura e o fechamento sejam visíveis

## Objetivo e escopo

Corrigir a animação da lista de idiomas nas configurações, que atualmente usa
`LayoutAnimation` mas não apresenta uma transição visível. A abertura e o
fechamento devem animar explicitamente a área da lista, inclusive quando o
usuário seleciona um idioma.

## Critérios de aceite

- A lista anima sua expansão ao abrir.
- A lista anima seu recolhimento ao fechar e após selecionar um idioma.
- O conteúdo e a seleção continuam funcionando durante a animação.
- A solução funciona sem dependências novas e passa no typecheck.

## Restrições, suposições e fora do escopo

- Preservar a lista, traduções, acessibilidade, MVVM e navegação atuais.
- Preferir `Animated`/`react-native-reanimated` já presente no projeto, evitando
  depender de mudanças automáticas de layout.
- Não alterar rotas, shell ou adicionar idiomas.
- Branch atual: `feat/i18n`; não criar ou trocar branch.
