# Planejamento

- Status: aprovado

## Contexto e mÃ³dulo

As pastas `home`, `imoveis`, `dashboard` e `perfil` possuíam `index.tsx` e um
arquivo nomeado com o mesmo segmento. O `index.tsx` reexportava esse segundo
arquivo, criando nomes de tela duplicados no Expo Router.

## Plano de implementaÃ§Ã£o

1. Fazer o `index.tsx` de cada pasta importar diretamente a tela do modulo.
2. Remover os arquivos de rota nomeados duplicados.
3. Executar export web e typecheck.

## ValidaÃ§Ã£o e riscos

- Baixo risco: os destinos publicos permanecem os mesmos.
- Validacao principal: `npx expo export --platform web`.
