# Planejamento

- Status: aprovado

## Contexto e módulo

- Módulo: `src/modules/settings/pages/Settings`.
- A lista já é renderizada condicionalmente em `SettingsView.tsx`; o ViewModel
  controla somente o estado aberto/fechado e a seleção.
- Não há biblioteca de animação adicional no projeto; o padrão nativo do
  React Native deve ser preferido.

## Plano de implementação

1. Aplicar `LayoutAnimation` imediatamente antes das mudanças de layout ao abrir,
   fechar e selecionar um idioma.
2. Habilitar a implementação nativa no Android de forma segura, sem alterar o
   ViewModel nem a seleção atual.
3. Preservar a lista, acessibilidade, estilos e navegação existentes.

## Validação e riscos

- Executar `npm run typecheck`, `git diff --check` e `validate-run.ps1`.
- Revisar que a configuração da animação ocorre antes de cada montagem/remoção
  da lista e não introduz dependências.
- Teste visual em dispositivo/emulador não está disponível automaticamente;
  registrar essa lacuna se não puder ser executado.
