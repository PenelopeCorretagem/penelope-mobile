# Entrada

- Run ID: 20261023-233711-profile-image-persistence
- Criado em: 2026-10-23T23:37:11-03:00
- Status: concluido

## Tarefa recebida

Persistir imagem de perfil no banco via API e abrir edição ao tocar no avatar inteiro.

## Objetivo e escopo

Persistir a imagem de perfil no banco pela API e abrir o modal de edição ao tocar em qualquer parte do avatar.

## CritÃ©rios de aceite

- GET/PATCH de perfil retornam e aceitam `profileImage`.
- A imagem selecionada é convertida para data URI/base64 e salva em `usuario.imagem_perfil`.
- Remover imagem envia `null` e limpa o valor persistido.
- Avatar inteiro abre as opções de edição.
- Typecheck e diagnósticos passam.

## RestriÃ§Ãµes, suposiÃ§Ãµes e fora do escopo

- Migration Flyway adiciona coluna `LONGTEXT`.
- Não armazenar apenas URI local; a API recebe conteúdo da imagem.
- Teste Maven depende de Maven instalado.
