# Entrada

- Run ID: 20260907-175047-profile-image-modal
- Criado em: 2026-09-07T17:50:47-03:00
- Status: concluído

## Tarefa recebida

Abrir modal de ações ao tocar no ícone de câmera do perfil

## Objetivo e escopo

Substituir os textos laterais de ação da imagem de perfil por um ícone de câmera sobreposto ao avatar. Ao tocar no ícone, abrir um modal com opções para escolher da galeria, tirar foto e remover a imagem quando existente.

## Critérios de aceite

- O avatar exibe um botão de câmera sobreposto, sem textos laterais.
- O toque no botão abre um modal com galeria e câmera.
- Cada ação fecha o modal e reutiliza o ViewModel existente.
- A remoção continua disponível quando há foto.
- `npm run typecheck` passa.

## Restrições, suposições e fora do escopo

- Não alterar o contrato do mock API, o ViewModel ou as rotas.
- Não criar novo componente compartilhado para um modal usado apenas nesta tela.
