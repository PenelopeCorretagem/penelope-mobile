# Planejamento

- Status: aprovado

## Contexto e módulo

O módulo responsável é `src/modules/settings/submodules/acount/pages/Account`. O ViewModel já fornece `pickProfileImage`, `takeProfileImage` e `removeProfileImage`; a alteração fica restrita à View.

## Plano de implementação

- Adicionar estado local de visibilidade do modal.
- Transformar o avatar em área visual com botão de câmera sobreposto.
- Renderizar modal inferior com ações de galeria, câmera e remoção.
- Fechar o modal antes de disparar cada ação do ViewModel.

## Validação e riscos

- Rodar `npm run typecheck` e diagnósticos do arquivo.
- Revisar acessibilidade, fechamento por toque externo e preservação do fluxo de salvamento.
- Risco limitado à interação visual; não há mudança de persistência.
