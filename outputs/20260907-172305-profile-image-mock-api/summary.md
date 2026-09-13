# Saída

- Status final: concluído

## Entregas

Foi adicionada a troca de imagem em Settings > Meu perfil, com seleção via
`expo-image-picker`, fallback para iniciais, remoção e persistência da URI em
`profileImage` no único usuário do mock. AccountView e SettingsView carregam o
mesmo perfil por service/ViewModel, sem mudança de rotas.

## Validações

- `npm run typecheck`: aprovado.
- JSON do mock: aprovado, exatamente um usuário e imagem inicial nula.
- GET/PATCH `/users/1`: aprovado em json-server temporário, incluindo remoção.
- `validate-run.ps1`: aprovado após completar `input.md`.

## Pendências e próximo passo

Não há bloqueios de implementação. Verificação visual manual permanece opcional.

## Extensão final

O perfil agora permite escolher uma imagem da galeria ou tirar uma nova foto, além de remover a imagem existente. As duas opções usam o mesmo contrato de persistência já implementado.

Validação adicional: `npm run typecheck` aprovado.
