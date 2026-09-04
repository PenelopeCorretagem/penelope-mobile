# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

`SettingsView` usava `href` para todos os itens, fazendo o componente navegar para
Conta, Troca de senha, Sobre e Contato. O requisito pede que esses conteudos
permaneçam na rota Configuracoes.

## Plano de implementaÃ§Ã£o

1. Adicionar callback `onPress` opcional a `SettingsOptionView`.
2. Controlar a secao ativa localmente em `SettingsView`.
3. Manter `href` somente em Sair e remover a rota separada de troca de senha.
4. Rodar typecheck e checar referencias antigas.

## ValidaÃ§Ã£o e riscos

- Baixo risco: a mudanca e restrita a Configuracoes e ao componente de item.
- Validacao: typecheck e diagnostico dos arquivos alterados.
