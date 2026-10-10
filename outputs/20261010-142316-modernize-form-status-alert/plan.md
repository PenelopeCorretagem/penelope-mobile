# Plano

- Status: aprovado

## Contexto e módulo

`AlertView` atualmente renderiza um bloco inline com fundos verde/vermelho. `FormView` já exibe os status do formulário e compartilha o Alert com páginas de imóveis que devem permanecer inline.

## Plano de implementação

1. Estender `AlertView` com `presentation: 'inline' | 'modal'`, mantendo inline como padrão e compatibilidade dos consumidores existentes.
2. Na modalidade modal, usar `Modal` transparente com animação fade, cartão central responsivo, overlay, título/ícone da paleta do projeto e ação de fechar.
3. Usar a mesma paleta da marca para error/success/info, distinguindo variantes por ícone/título, sem vermelho ou verde.
4. Configurar `FormView` para pedir a apresentação modal, preservando os outros usos inline.
5. Validar typecheck, diagnósticos e diff.

O componente controlará localmente o fechamento e reabrirá quando a mensagem mudar. O fechamento fica bloqueado nos primeiros 2 segundos de cada mensagem e enquanto `loading` estiver ativo.

## Validação e riscos

Executar `npm run typecheck`; se bloqueado pelo TS5101 preexistente em `baseUrl`, executar `npx tsc --noEmit --ignoreDeprecations 6.0`. Confirmar visualmente a largura responsiva do cartão, contraste, fechamento e que Alert inline continua no mesmo padrão de layout.
