# Entrada

- Run ID: 20261010-150145-alertas-login-recuperacao
- Criado em: 2026-10-10T15:01:45-03:00
- Status: concluido

## Tarefa recebida

Aplicar alertas de loading, sucesso e erro ao login e à recuperação de senha usando os endpoints existentes.

## Objetivo e escopo

Aplicar feedback visual de loading/sucesso/erro ao login e à recuperação de senha, usando AlertView; apenas alertas de erro devem oferecer botão de confirmação.

## CritÃ©rios de aceite

- Login: loading mínimo de 1 segundo; sucesso por 1,5 segundo e navegação ao destino autenticado.
- Recuperação: enviar solicitação ao endpoint existente, loading mínimo de 1 segundo e sucesso por 1,5 segundo.
- Erros nos dois fluxos exibem AlertView com confirmação; loading e sucesso não exibem botão.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Preservar o contrato existente da API e a mensagem genérica de recuperação para não revelar se um e-mail existe.
- Não alterar as telas de recuperação dentro de Configurações, que pertencem a outro módulo.
