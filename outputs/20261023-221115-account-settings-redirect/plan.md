# Planejamento

- Status: concluido

## Contexto e mÃ³dulo

As telas Perfil, Senha e Recuperação pertencem a `settings/submodules/acount`; o destino principal já está definido como `APP_ROUTES.configuracoes`. Perfil tem `saveProfile()` com retorno booleano para distinguir sucesso de falha. Senha e recuperação ainda possuem handlers locais sem persistência.

## Plano de implementaÃ§Ã£o

1. Redirecionar Perfil após `saveProfile()` retornar sucesso.
2. Adicionar navegação para Configurações principal aos submits de Senha e Recuperação.
3. Validar typecheck, diagnósticos e registro do workflow.

## ValidaÃ§Ã£o e riscos

Risco: Senha/Recuperação são atualmente placeholders sem chamada de API; o pedido aqui cobre apenas o destino de navegação após o submit. Falhas de persistência do perfil continuam na tela.
