# Execucao

- Status: concluida

## Alteracoes

- ViewModel do cadastro mede o início de cada requisição e mantém o alerta de loading por pelo menos 1 segundo antes de apresentar sucesso ou erro.
- Se a API levar mais de 1 segundo, não é acrescentado atraso; a confirmação de sucesso continua visível por 1,5 segundo antes do redirect.
- AlertView omite o botão “Entendi” quando a variante é `success`; os outros estados mantêm a ação.
- AlertView limpa o estado de dispensa quando a mensagem ou apresentação muda, permitindo reapresentar textos iguais em tentativas posteriores.

## Comandos e resultados

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- Diagnósticos do editor nos arquivos alterados: nenhum erro.

## Desvios, falhas e bloqueios

- Nenhum bloqueio conhecido.
