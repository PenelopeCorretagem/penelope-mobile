# Saida

- Status final: concluido

## Entregas

- Imagem é enviada, armazenada em `usuario.imagem_perfil` e restaurada após recarregar o perfil.
- Avatar inteiro abre o modal de edição.
- Migration criada: `V5__add_imagem_perfil.sql`.

## ValidaÃ§Ãµes

- Typecheck: passou.
- Diagnósticos: sem erros.
- Teste Maven: pendente por Maven ausente.

## PendÃªncias e prÃ³ximo passo

- Reiniciar API para Flyway aplicar V5 e testar selecionar, salvar, recarregar e remover a imagem.
