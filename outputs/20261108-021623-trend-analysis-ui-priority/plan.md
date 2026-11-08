# Planejamento

- Status: concluído

## Diagnóstico

A tela atual começa diretamente em “Indicadores do mercado”, mas o primeiro
indicador ocupa largura total com `value` vazio e texto de IA, o que reduz a
clareza. O preço mediano e a variação são as decisões de maior valor para o
cliente e devem ter maior destaque visual. O gráfico deve explicar o período e
ser apresentado depois do resumo.

## Plano

1. Adicionar um cabeçalho compacto de contexto (“Tendências de mercado”,
   apartamentos em São Paulo) sem reintroduzir o antigo popup.
2. Reorganizar o resumo em card de leitura principal e cards de preço/variação,
   com tipografia e contraste adequados.
3. Alterar a ViewModel para apresentar “Leitura do mercado” com valor textual
   explícito de valorização/redução, preservando a regra calculada.
4. Melhorar o cabeçalho do gráfico, legenda e nota para comunicação imobiliária
   clara, sem alterar os dados.
5. Manter o overlay de filtros, zIndex/elevation e ações atuais.

## Validação

- `npm run typecheck`; se bloqueado por TS5101, `npx tsc --noEmit
  --ignoreDeprecations 6.0`.
- Busca por conteúdo vazio e referências ao popup removido.
- Revisão de acessibilidade e checklist MVVM.
