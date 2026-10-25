# Execucao

- Status: concluida

## Alteracoes

- AlertView agora só renderiza o botão “Entendi” para `error`; loading e sucesso não pedem confirmação.
- Login exibe alerta de carregamento por no mínimo 1 segundo; em sucesso, mostra confirmação por 1,5 segundo e navega para `APP_ROUTES.imoveis`.
- Recuperação foi ligada ao endpoint existente `POST /v1/auth/forgot-password` com payload `{ email }`; exibe loading e mensagem genérica de sucesso por 1,5 segundo, permanecendo na tela.
- Recuperação ganhou Model/ ViewModel para validação de e-mail, estado e chamada de service; API path e service usam `API_ROUTES`.

## Comandos e resultados

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou após implementação e novamente após remover import não utilizado.
- Diagnósticos do editor nos arquivos alterados: nenhum erro.
- A busca não encontrou testes existentes específicos desses ViewModels.

## Desvios, falhas e bloqueios

- Nenhum bloqueio conhecido.
