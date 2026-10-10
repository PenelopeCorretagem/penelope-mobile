# Entrada

- Run ID: 20261010-144548-tempo-minimo-alertas
- Criado em: 2026-10-10T14:45:49-03:00
- Status: concluido

## Tarefa recebida

Corrigir o tempo mínimo de exibição do loading e reabrir alertas iguais em novas tentativas.

## Objetivo e escopo

Garantir que o aviso de carregamento do cadastro apareça por pelo menos dois segundos, mesmo quando a API responde rapidamente, e permitir que a mesma mensagem de alerta seja exibida novamente em nova tentativa.

## CritÃ©rios de aceite

- Cada tentativa de cadastro mantém o estado de loading visível por no mínimo 1 segundo.
- Erros são exibidos depois do mínimo de loading; sucesso mantém sua mensagem por 1,5 segundo e navega ao login.
- Alerta de sucesso não exibe botão de ação.
- Um alerta modal dispensado pode aparecer novamente em um ciclo posterior, mesmo que o texto seja igual.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Manter o componente e o contrato visual existentes; não alterar endpoint ou payload.
