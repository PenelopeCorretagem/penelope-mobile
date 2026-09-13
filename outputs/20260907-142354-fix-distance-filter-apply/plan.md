# Planejamento

- Status: concluído

## Contexto e módulo

O modal não aplicava a seleção de distância ao fechar porque esse valor era tratado como filtro inativo. A rota permanecia com a ordenação anterior.

## Plano de implementação

1. Aplicar o estado atual ao fechar o modal quando a tela já estiver em Imóveis/Favoritos.
2. Adicionar botão explícito para aplicar filtros.
3. Executar typecheck e revisão do fluxo.

## Validação e riscos

Validar `npm run typecheck`. O modal aberto a partir de outras telas não deve navegar ao ser fechado sem aplicar busca.

