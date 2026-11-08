# Entrada

- Run ID: 20261025-085638-add-tendencia-tab
- Status: recebido

## Tarefa

Adicionar apenas a nova tab “Tendência” ao rodapé do aplicativo, criando a
estrutura de lógica e estilização no módulo `src/modules/dashboard`.

## Escopo

- Criar a feature Dashboard/Tendência seguindo MVVM.
- Criar a rota Expo Router em `src/app/(private)/(tabs)/dashboard`.
- Registrar a tab no layout existente, sem remover ou redesenhar as tabs atuais.
- Centralizar o destino em `APP_ROUTES`.

## Critérios de aceite

- A tab aparece no rodapé com o título `Tendência` e ícone de gráfico.
- A rota abre uma tela funcional de tendência.
- A lógica fica no ViewModel/Model e os estilos ficam na View.
- A rota usa o alias `@dashboard/*` já existente.
- O fluxo das tabs atuais permanece preservado.
- `npm run typecheck` é executado e seu resultado é registrado.

## Restrições e suposições

- Não implementar integração com API ou alterar endpoints: a primeira tela
  apresentará dados de tendência locais, preparados para futura substituição
  por service.
- Não alinhar a barra inteira ao alvo futuro de cinco tabs; a solicitação é
  exclusivamente adicionar Tendência ao estado atual.
- Não alterar a tab Configurações.
- Branch atual: `development`; nenhuma branch ou mutação externa será criada.
