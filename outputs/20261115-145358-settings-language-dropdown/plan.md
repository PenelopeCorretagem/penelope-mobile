# Planejamento

- Status: concluído

## Contexto e módulo

- Módulo responsável: `src/modules/settings/pages/Settings`.
- `SettingsView.tsx` atualmente alterna diretamente entre `pt` e `en` ao tocar na
  opção de idioma; `i18n/index.js` registra esses recursos.
- `SettingsOption` é a linha reutilizável de configurações e deve continuar
  preservando o comportamento das demais opções.

## Plano de implementação

1. Derivar os códigos da lista dos idiomas efetivamente registrados no i18n,
   sem duplicar a fonte de suporte.
2. Controlar no ViewModel da tela a expansão, fechamento e seleção do idioma.
3. Atualizar a View para renderizar as opções inline, indicar a seleção atual e
   fechar após selecionar.
4. Ajustar `SettingsOption` apenas se necessário para representar o estado
   expandido com acessibilidade e chevron apropriado.

Nenhuma rota será criada ou alterada; `APP_ROUTES` permanece a fonte existente
para navegação. A shell principal não será modificada.

## Validação e riscos

- Executar `npm run typecheck` e `git diff --check`.
- Revisar manualmente abrir, fechar sem alteração, selecionar `pt`/`en`,
  atualização imediata dos textos e correspondência entre lista e recursos.
- Não adicionar persistência, dependência ou novos idiomas.
