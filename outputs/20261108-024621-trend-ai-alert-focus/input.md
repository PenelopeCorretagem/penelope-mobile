# Entrada

- Run ID: 20261108-024621-trend-ai-alert-focus
- Criado em: 2026-11-08T02:46:21-03:00
- Status: recebido

## Tarefa recebida

Corrigir a reexibição do pop-up informativo da IA ao acessar tendências

## Objetivo e escopo

Fazer o pop-up informativo sobre análises preditivas de IA aparecer sempre que
o usuário acessar a área de tendências, inclusive depois de fechar o aviso e
voltar para outra aba.

## CritÃ©rios de aceite

- O modal deve aparecer na entrada inicial da tela de tendências.
- O modal deve reaparecer em cada novo foco da tela.
- Fechar o modal deve continuar funcionando.
- Não alterar filtros, conteúdo analítico ou navegação.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar alterações preexistentes.
- Reutilizar `AlertView` e o ciclo de foco do Expo Router.
- Não alterar o layout global das abas.
