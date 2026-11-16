# Revisão

Veredito: aprovado

Nenhum achado bloqueante. O i18n é inicializado antes do `Stack`; fallback e
normalização estão centralizados; Views usam `useTranslation`; a troca manual
fica em Configurações e atualiza componentes reativos. Dados de API permanecem
dinâmicos.

Checklist: infraestrutura fora de `src/app`, rotas/layouts preservados,
ViewModels/services sem JSX ou estilos extras, interpolação sem escape e JSON
pt/en sincronizados, dependências compatíveis com Expo 57.

`npm run typecheck`: aprovado. Teste visual em dispositivo: não disponível.

## Revisão da rodada 2

Veredito: aprovado

- **Resolvido:** `FormView` não reutiliza mais o texto do botão como loading
  quando o fluxo possui uma tradução específica.
- **Resolvido:** Trend Analysis não usa mais labels/opções em português como
  valores de filtro; os códigos permanecem estáveis e as superfícies exibidas
  usam i18n.
- **Resolvido:** erro da tela Properties é uma chave traduzível consumida pela
  View, mantendo mensagens técnicas fora da interface.

Checklist MVVM: Views continuam responsáveis pela apresentação, o ViewModel de
trends apenas deriva estado e traduções, e o Model mantém códigos e regras
puras. Navegação e estilos não foram alterados.

Validações: `npm run typecheck` e sincronização dos JSONs aprovadas. Teste visual
em dispositivo continua não disponível.

## Revisão da rodada 5

Veredito: aprovado

### Achados

Nenhum achado bloqueante dentro do escopo. As superfícies solicitadas usam `t()`;
mensagens de validação de autenticação e notificações são códigos estáveis
resolvidos no ponto de apresentação; dados de API continuam sem tradução.

### Checklist arquitetural

- Views permanecem responsáveis pela apresentação e não chamam APIs diretamente.
- Models mantêm validações, códigos internos e transformações puras, sem JSX ou
  dependências de i18n.
- ViewModels mantêm estado/efeitos e retornam códigos de erro/sucesso, sem estilos.
- `SearchModalModel` e `PropertyDetailsModel` não traduzem dados dinâmicos; labels
  derivados são resolvidos nas Views.
- JSONs pt/en têm a mesma estrutura de chaves; navegação, aliases e shell não foram
  alterados.

### Validações

- `npm run typecheck`: aprovado.
- Checagem de parse e chaves pt/en: aprovada.
- `git diff --check`: aprovado.
- Teste visual: não executado.

## Revisão da rodada 6

Veredito: aprovado

### Achados

Nenhum achado bloqueante. Labels e opções exibidas no SearchModal são
traduzíveis, enquanto os valores usados no estado, parâmetros de rota e
interpretação permanecem os mesmos. As mensagens de erro exibidas são chaves
resolvidas na View, sem expor o texto técnico da exceção. O botão de fechar do
carrossel usa `common.close` em ambos os idiomas.

### Checklist arquitetural

- `SearchModalModel` mantém descritores e valores internos sem React ou i18n.
- `useSearchModalViewModel` mantém estado, efeitos e códigos de erro, sem JSX ou
  estilos.
- `SearchModalView` e `ImageCarouselModal` são responsáveis pela apresentação e
  tradução.
- Nenhuma rota, API, estilo ou dependência foi alterada nesta rodada.
- Recursos pt/en têm as mesmas chaves e os labels dinâmicos de cidade/região
  continuam vindos dos dados.

### Validações

- `npm run typecheck`: aprovado.
- Checagem de chaves pt/en: aprovada (284/284).
- `git diff --check`: aprovado.
- `validate-run.ps1`: aprovado (`Output válido`).
- Teste visual em dispositivo: não executado.
