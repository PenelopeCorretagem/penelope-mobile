# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

O ViewModel inicia o estado de loading e chama a API, mas não espera duração mínima antes de trocar para sucesso/erro. O AlertView controla dispensa por igualdade da mensagem; após dispensar um texto, uma ocorrência igual pode continuar oculta se houver outra mensagem entre os ciclos.

## Plano de implementaÃ§Ã£o

1. Medir o início da submissão e manter loading até completar pelo menos 1 segundo, aguardando a API em paralelo com essa janela.
2. Reiniciar o estado de dispensa do modal sempre que a mensagem/estado mudar.
3. Exibir sucesso por 1,5 segundo e omitir o botão de ação nessa variante.
4. Validar TypeScript e diagnósticos nos componentes alterados.

## ValidaÃ§Ã£o e riscos

Risco baixo. Loading mínimo será aplicado a sucesso e falha; demora da API acima de 1 segundo não recebe atraso adicional. A mensagem de sucesso permanece por 1,5 segundo.
