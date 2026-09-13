# Execução

- Status: concluída

## Arquivos alterados

- `src/modules/settings/submodules/acount/pages/Account/AccountView.tsx`: avatar com ícone de câmera sobreposto e modal de ações.

## Decisões

- O estado de abertura do modal permanece local à View, pois não é estado de negócio.
- As ações de galeria, câmera e remoção continuam no `useProfileViewModel`.
- O toque fora do modal e o botão de fechar encerram a interface de seleção.

## Comandos e resultados

- `npm run typecheck`: passou.
- Diagnósticos do `AccountView.tsx`: nenhum erro.

## Bloqueios

Nenhum.
