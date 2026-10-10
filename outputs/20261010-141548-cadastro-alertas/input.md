# Entrada

- Run ID: 20261010-141548-cadastro-alertas
- Criado em: 2026-10-10T14:15:48-03:00
- Status: concluido

## Tarefa recebida

Exibir alertas de progresso e sucesso no cadastro e redirecionar ao login apos dois segundos.

## Objetivo e escopo

Exibir alerta de progresso no envio de cadastro, confirmação de sucesso por dois segundos e redirecionamento para login.

## CritÃ©rios de aceite

- Durante a requisição, o AlertView mostra “Cadastrando sua conta...” com indicador circular `primary`.
- No sucesso, o AlertView mostra confirmação por 2 segundos antes de navegar para login.
- Erros do cadastro continuam exibidos no AlertView e os demais usos mantêm o padrão de erro.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Reutilizar o componente Alert existente e preservar seu visual padrão de erro.
- Não alterar a chamada à API nem o contrato do cadastro.
