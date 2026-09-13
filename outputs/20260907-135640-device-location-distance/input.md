# Entrada

- Run ID: 20260907-135640-device-location-distance
- Criado em: 2026-09-07T13:56:40-03:00
- Status: recebido

## Objetivo e escopo

Solicitar permissao de localizacao no dispositivo mobile, exibir a distancia ate cada imovel nos cards e ordenar por distancia por padrao, com opcoes alfabeticas no filtro.

## Criterios de aceite

- Solicitar permissao foreground em runtime no fluxo de imoveis.
- Permissao negada ou localizacao indisponivel nao bloqueia a listagem.
- Cards com coordenadas exibem distancia formatada em quilometros.
- Ordenacao inicial e por distancia; filtro oferece distancia, A a Z e Z a A.
- Imoveis sem coordenadas nao causam erro e ficam ao final na ordenacao por distancia.
- `npm run typecheck` passa.

## Restricoes, suposicoes e fora do escopo

- Latitude e longitude da API sao opcionais para manter compatibilidade.
- Nao sera feita geocodificacao externa no app.
- A localizacao serve apenas para calculo local, sem rastreamento continuo.
- Branch atual: `feat-home`; sem branch ou commit.

