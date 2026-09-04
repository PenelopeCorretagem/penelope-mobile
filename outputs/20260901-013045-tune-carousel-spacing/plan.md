# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

O card paginado ocupava toda a viewport e sua margem havia sido removida para
evitar overflow. O requisito agora pede um card um pouco menor e distância entre
eles.

## Plano de implementaÃ§Ã£o

1. Reduzir a largura passada ao card por `spacing.md`.
2. Restaurar a margem entre cards apenas no modo paginado.
3. Validar typecheck e export web.

## ValidaÃ§Ã£o e riscos

- Risco baixo: a página de snap continua com largura total da viewport.
