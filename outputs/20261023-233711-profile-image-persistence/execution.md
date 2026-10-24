# Execucao

- Status: concluida

## AlteraÃ§Ãµes

- Front envia imagem como data URI/base64 e restaura `profileImage` no GET/PATCH.
- API adiciona `imagem_perfil LONGTEXT` na migration V5 e mapeia o campo em domínio, request, response e JPA.
- Avatar inteiro virou `Pressable`; câmera permanece como indicador visual.
- Teste de serviço cobre persistência e retorno da imagem.

## Comandos e resultados

- `npx expo install expo-file-system`: passou; npm reportou 18 vulnerabilidades existentes.
- `npx tsc --noEmit --ignoreDeprecations 6.0`: passou.
- Diagnósticos do editor: nenhum erro.
- `mvn -Dtest=UserProfileServiceTest test`: não executado; Maven não instalado.

## Desvios, falhas e bloqueios

- Migration não executada neste ambiente; reiniciar API com Flyway aplicará a coluna.
