# Execução

- Status: concluída

## Alterações

- `src/services/profileService.ts`: service com `GET/PATCH /users/1`.
- `src/modules/settings/submodules/acount/pages/Account/useProfileViewModel.ts`:
	estado, efeitos, seleção/remoção, loading, erro e salvamento.
- `ProfileModel.ts`, `user.ts`, `AccountView.tsx` e `SettingsView.tsx`: contrato,
	fallback por iniciais e exibição/edição da imagem.
- `mocks/db.json`: coleção `users` com exatamente um usuário e `profileImage: null`.
- `package.json`, `package-lock.json` e `app.json`: `expo-image-picker` e plugin.

## Comandos e resultados

- `npx expo install expo-image-picker`: concluído; npm reportou avisos de peer
	dependency e 17 vulnerabilidades moderadas preexistentes no conjunto instalado.
- `npm run typecheck`: passou.
- `Get-Content -Raw mocks/db.json | ConvertFrom-Json`: passou; `users=1`.
- json-server temporário na porta 3011: GET, PATCH com URI e PATCH com `null`
	passaram; o arquivo foi restaurado ao estado inicial.

## Desvios, falhas e bloqueios

- O primeiro typecheck apontou import usando alias inexistente; corrigido para
	`@shared/dtos/user` e validado novamente.
- Não foram criados branch, commit, rota ou PR.

## Extensão: câmera

- `useProfileViewModel.ts`: adicionadas permissão e captura pela câmera com `launchCameraAsync`, mantendo a seleção pela galeria.
- `AccountView.tsx`: adicionadas as ações acessíveis `Escolher da galeria` e `Tirar foto`.
- `npm run typecheck`: passou novamente após a alteração.
