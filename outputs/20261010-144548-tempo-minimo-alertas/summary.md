# Saida

- Status final: concluido

## Entregas

- Loading do cadastro aparece por no mínimo 1 segundo em cada tentativa, inclusive quando a API responde rapidamente.
- Sucesso permanece por 1,5 segundo antes da navegação ao login; erros rápidos também só substituem o loading após o mínimo.
- O modal de sucesso não mostra botão de ação.
- Alertas com mensagem repetida podem ser exibidos em novos ciclos.

## ValidaÃ§Ãµes

- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- Diagnósticos do editor: nenhum erro nos arquivos alterados.

## PendÃªncias e prÃ³ximo passo

- Nenhuma pendência conhecida.
