Status: concluído

# Entrada

## Tarefa

Adicionar troca de imagem de perfil na tela de conta, com persistência no mock API para um único usuário. O usuário pode ter uma foto ou nenhuma.

## Objetivo e escopo

- Exibir a imagem de perfil no cabeçalho de configurações e na tela de conta quando existir.
- Permitir selecionar uma imagem, remover a imagem e salvar a alteração no registro `users/1` do `mocks/db.json`.
- Manter fallback para iniciais quando o usuário não tiver imagem.
- Respeitar MVVM: View sem chamadas HTTP, service responsável pelo mock API e ViewModel responsável por estado/efeitos.

## Critérios de aceite

- O mock contém exatamente um usuário com campo opcional de imagem nulo.
- A tela de conta oferece seleção e remoção da foto.
- Salvar alterações persiste `profileImage` no mock API e atualiza o avatar.
- Falhas de carregamento/salvamento são apresentadas sem quebrar a tela.
- `npm run typecheck` passa.

## Restrições e suposições

- A imagem será persistida como URI retornada pelo seletor; não há backend real nem upload binário nesta etapa.
- Será usada a biblioteca oficial `expo-image-picker` compatível com a versão Expo instalada.
- Não serão alterados fluxos de autenticação ou rotas.

## Branch

- Atual: `feat-home`
- Branch sugerida: nenhuma; não criar branch nesta execução.
