# Revisao

- Status: concluida
- Veredito: aprovado

## Achados

- Sem achados bloqueantes.

## Checklist e validaÃ§Ãµes

- Reseleção de aba ativa retorna ao root de stacks aninhados e reemite `tabPress` para a raiz executar `useScrollToTop`.
- Imóveis/Favoritos usam o mesmo `FlatList`; Configurações usa `ScrollView`; todos conectados ao hook oficial.
- Tocar em aba inativa continua navegando normalmente.
- Typecheck passou; diagnósticos do editor sem erros. Auditoria npm reportou 18 vulnerabilidades não tratadas.
