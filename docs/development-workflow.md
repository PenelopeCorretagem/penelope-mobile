# Workflow de Desenvolvimento — MVVM Modular com React Native + TypeScript

## 1. Objetivo

Este workflow define como novas funcionalidades devem ser criadas e organizadas no projeto

A arquitetura segue uma abordagem de:

* Organização por módulos de negócio
* MVVM para separar interface, estado e regras
* `shared` apenas para código realmente reutilizável
* Services externos centralizados em uma única camada
* Infraestrutura global separada das features
* Convenções claras para facilitar manutenção e crescimento do projeto

O objetivo não é criar uma arquitetura gigantesca para um projeto pequeno, mas evitar que o código vire um depósito radioativo de `components`, `services`, `utils` e arquivos perdidos pela aplicação

---

# 2. Estrutura geral do projeto

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── sobre.tsx
├── modules/
│   ├── auth/
│   │   ├── assets/
│   │   ├── components/
│   │   └── pages/
│   └── institutional/
│       ├── assets/
│       ├── components/
│       └── pages/
│           ├── About/
│           ├── Advertisements/
│           └── Home/
├── shared/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   └── utils/
├── services/
│   └── advertisementService.ts
├── infrastructure/
│   ├── api/
│   │   ├── client.ts
│   │   └── interceptors.ts
│   └── storage/
└── types/
```

### Navegação com Expo Router

O projeto utiliza o Expo Router. Portanto, não existe uma pasta `navigation/` nem um
`AppNavigator.tsx`. O arquivo `src/app/_layout.tsx` configura o navigator raiz, e os
arquivos dentro de `src/app` representam somente as rotas. Models, ViewModels,
components, services e tipos ficam fora de `src/app` para não serem interpretados como rotas:

```text
src/app/
├── _layout.tsx       # Stack e opções globais de navegação
├── index.tsx         # /
└── sobre.tsx         # /sobre
```

Subpastas podem ter seu próprio `_layout.tsx` quando precisarem de um Stack, Tabs ou
grupo de rotas específico.

---

# 3. Responsabilidade de cada camada

## `modules`

Contém os módulos de negócio da aplicação

Exemplo:

```text
auth
institutional
advertisements
profile
```

Cada módulo deve conter tudo que pertence ao seu domínio

Exemplo:

```text
institutional/
├── components/
├── services/
├── assets/
└── pages/
```

A ideia é que o código relacionado ao domínio fique próximo

---

## `pages`

Representa as telas da aplicação

Cada página segue a estrutura:

```text
Feature/
├── FeatureModel.ts
├── FeatureView.tsx
├── useFeatureViewModel.ts
└── index.ts
```

Exemplo:

```text
Contacts/
├── ContactsModel.ts
├── ContactsView.tsx
├── useContactsViewModel.ts
└── index.ts
```

---

# 4. Model

O Model concentra:

* Interfaces e tipos da feature
* Transformações de dados
* Mapeamento de respostas da API
* Validações puras
* Funções relacionadas diretamente à estrutura dos dados

Exemplo:

```typescript
// ContactsModel.ts

export interface Contact {
  id: string
  name: string
  phone: string
  email: string
}

export function formatContact(raw: any): Contact {
  return {
    id: raw.id,
    name: raw.name,
    phone: raw.phone_number,
    email: raw.email
  }
}

export function isValidContact(contact: Contact): boolean {
  return (
    contact.name.length > 0 &&
    contact.email.length > 0
  )
}
```

O Model não deve:

```text
❌ Renderizar JSX
❌ Controlar estado React
❌ Fazer chamadas HTTP
❌ Conhecer componentes visuais
```

---

# 5. Service

Services representam a comunicação com APIs ou outras fontes externas

Todos os services externos ficam centralizados em `src/services`, sem serem
duplicados dentro dos módulos de negócio.

```typescript
import { apiClient } from '@infrastructure/api/client'

export const contactsService = {
  async getAll() {
    const response = await apiClient.get('/contacts')

    return response.data
  }
}
```

Exemplo:

```text
app/services/authService.ts

app/services/advertisementService.ts
```

Já serviços puramente técnicos e compartilhados ficam na infraestrutura:

```text
infrastructure/
├── api/
│   └── client.ts
│
└── storage/
    └── storageService.ts
```

Exemplo:

```text
apiClient
AsyncStorage
interceptors
tokens
```

---

# 6. ViewModel

O ViewModel é responsável por conectar a View com os dados e regras da aplicação

Ele controla:

* Estado
* Loading
* Erros
* Efeitos
* Chamadas para Services
* Transformação dos dados recebidos
* Ações da tela

Exemplo:

```typescript
import { useEffect, useState } from 'react'

import {
  Contact,
  formatContact
} from './ContactsModel'

import { contactsService } from '@service-penelopec/contactsService'

export function useContactsViewModel() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadContacts() {
    try {
      setLoading(true)

      const rawContacts =
        await contactsService.getAll()

      const formattedContacts =
        rawContacts.map(formatContact)

      setContacts(formattedContacts)
    } catch (error) {
      setError('Não foi possível carregar os contatos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    loadContacts
  }
}
```

O ViewModel não deve:

```text
❌ Renderizar JSX
❌ Criar componentes visuais
❌ Definir estilos
❌ Conhecer detalhes da navegação visual
```

---

# 7. View

A View é responsável pela interface

Ela deve:

* Renderizar componentes
* Exibir dados
* Exibir loading
* Exibir erros
* Disparar ações do ViewModel

Exemplo:

```tsx
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from 'react-native'

import { useContactsViewModel } from './useContactsViewModel'

export function ContactsView() {
  const {
    contacts,
    loading,
    error,
    loadContacts
  } = useContactsViewModel()

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>

        <Button
          title="Tentar novamente"
          onPress={loadContacts}
        />
      </View>
    )
  }

  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ContactCard contact={item} />
      )}
    />
  )
}
```

Essa abordagem é uma implementação pragmática de MVVM para React Native

A View pode consumir diretamente o ViewModel

Não é necessário criar uma camada extra apenas para passar props caso isso não traga benefício real

---

# 8. Arquivo de entrada da Feature

Cada página possui um `index.ts`

Exemplo:

```text
Contacts/
├── ContactsModel.ts
├── ContactsView.tsx
├── useContactsViewModel.ts
└── index.ts
```

```typescript
// index.ts

export { ContactsView as Contacts }
from './ContactsView'
```

Assim, a importação fica:

```typescript
import { Contacts }
from '@institutional/pages/Contacts'
```

Em vez de:

```typescript
import { Contacts }
from '@institutional/pages/Contacts/ContactsView'
```

---

# 9. Components

## Componentes específicos

Se um componente pertence claramente a um módulo, ele permanece dentro do módulo

```text
institutional/
├── components/
│   └── AdvertisementCard/
```

Exemplo:

```text
AdvertisementCard
ContactCard
InstitutionalHeader
```

---

## Componentes compartilhados

Se um componente possui reutilização comprovada entre diferentes módulos, ele pode ir para `shared`

```text
shared/
└── components/
    ├── Button/
    ├── Input/
    ├── Modal/
    └── Loading/
```

A regra importante é:

> Não mover componentes para `shared` apenas porque talvez possam ser reutilizados no futuro

O fluxo deve ser:

```text
Criar dentro da feature
        ↓
Outro módulo precisa do mesmo componente
        ↓
Avaliar se comportamento e responsabilidade são realmente iguais
        ↓
Generalizar
        ↓
Mover para shared
```

Evitar abstração prematura

Um componente com 47 props para tentar atender todos os cenários não é reutilização

É um pedido de socorro arquitetural

---

# 10. Assets

Assets seguem a mesma regra dos componentes

```text
Específico do módulo
        ↓
modules/<modulo>/assets
```

```text
Global e compartilhado
        ↓
shared/assets
```

Exemplo:

```text
shared/assets/
├── logo.png
├── fonts/
└── icons/
```

```text
institutional/assets/
└── institutionalBanner.png
```

---

# 11. Styles e Theme

Valores visuais compartilhados não devem ficar espalhados pela aplicação

Evitar:

```typescript
padding: 17
color: '#123ABC'
marginTop: 13
```

Em vez disso:

```text
shared/
└── styles/
    ├── theme.ts
    └── index.ts
```

```typescript
export const theme = {
  colors: {
    primary: '#1E40AF',
    secondary: '#64748B',
    background: '#FFFFFF',
    text: '#0F172A',
    error: '#DC2626'
  },

  spacing: {
    xs: 4,
  export { ContactsView as Contacts } 
  from './ContactsView'
    lg: 24,
    xl: 32
  },

  typography: {
    title: {
      fontSize: 24,
      fontWeight: '700' as const
    },

    body: {
      fontSize: 16,
      fontWeight: '400' as const
    }
  }
}
```

Uso:
from '@institutional/pages/Contacts'
```typescript
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md
  },
from '@institutional/pages/Contacts/ContactsView'
  title: {
    color: theme.colors.text,
    ...theme.typography.title
  }
})
```

---

# 12. Infrastructure

A infraestrutura contém elementos técnicos que não pertencem a um domínio específico

```text
infrastructure/
├── api/
│   ├── client.ts
│   └── interceptors.ts
│
├── storage/
│   └── storageService.ts
│
└── config/
```

Exemplo:

```text
Axios
Fetch wrapper
AsyncStorage
Token management
Interceptors
Configurações globais
```

A infraestrutura não deve conhecer:

```text
❌ ContactsView
❌ AuthView
❌ AdvertisementCard
❌ Features específicas
```

O fluxo de dependência deve seguir:

```text
View
 ↓
ViewModel
 ↓
External Service
 ↓
Infrastructure
 ↓
API / Banco / Storage
```

Nunca o contrário

---

# 13. Fluxo para criar uma nova Feature

Sempre seguir esta ordem

## Passo 1 — Identificar o módulo

Perguntar:

> Essa funcionalidade pertence a qual domínio?

Exemplo:

```text
Login
        ↓
auth
```

```text
Anúncios
        ↓
institutional
```

---

## Passo 2 — Verificar se algo já existe

Antes de criar código novo, verificar:

```text
shared/components
shared/assets
shared/styles
utils existentes
components do módulo
```

A ideia é evitar duplicação

Mas sem sair movendo tudo para `shared` só porque bateu uma insegurança arquitetural

---

## Passo 3 — Criar a estrutura da página

```text
Feature/
├── FeatureModel.ts
├── FeatureView.tsx
├── useFeatureViewModel.ts
└── index.ts
```

Exemplo:

```text
Contacts/
├── ContactsModel.ts
├── ContactsView.tsx
├── useContactsViewModel.ts
└── index.ts
```

---

## Passo 4 — Definir o Model

Criar:

* Interfaces
* Tipos
* Transformações
* Validações

Exemplo:

```text
API Response
     ↓
Model
     ↓
Dados utilizados pela aplicação
```

---

## Passo 5 — Criar ou ajustar o Service

Se existir comunicação externa:

```text
External Service
       ↓
API Client
       ↓
API
```

O Service deve ficar em `src/services`, mesmo quando for usado por apenas um módulo.

---

## Passo 6 — Criar o ViewModel

Implementar:

```text
Estado
Loading
Erro
Ações
Chamadas ao Service
Transformação dos dados
```

---

## Passo 7 — Criar a View

A View deve apenas montar a interface e consumir o estado e ações necessários

```text
View
 ↓
Exibe dados
 ↓
Dispara ações
 ↓
Renderiza estados
```

---

## Passo 8 — Criar ou reutilizar componentes

Decisão:

```text
Usado apenas nesta feature?
        ↓
Sim → Feature ou módulo
        ↓
Não
        ↓
É realmente reutilizável?
        ↓
Sim → shared
```

---

## Passo 9 — Criar a rota

Adicionar um arquivo de rota dentro de `src/app` e exportar a View da feature:

```typescript
// src/app/contatos.tsx
export { ContactsView as default } from '@institutional/pages/Contacts'
```

O Expo Router registra a rota automaticamente pelo nome do arquivo. Ajustes globais
ou específicos de Stack devem ser feitos em `_layout.tsx`, sem criar um navigator
paralelo.

---

# 14. Workflow de Git

Toda alteração deve começar em uma branch

Estrutura:

```text
main
│
├── feature/login
├── feature/contacts
├── fix/login-validation
├── refactor/auth-service
└── chore/update-dependencies
```

Convenções:

```text
feature/
Nova funcionalidade

fix/
Correção de bug

refactor/
Refatoração sem alteração funcional

chore/
Tarefas técnicas ou manutenção

docs/
Alterações em documentação

test/
Criação ou alteração de testes
```

---

# 15. Fluxo completo de desenvolvimento

```text
Receber tarefa
      ↓
Entender requisito
      ↓
Verificar impacto nos módulos existentes
      ↓
Criar Issue/Task
      ↓
Criar Branch
      ↓
Verificar código reutilizável
      ↓
Criar ou alterar Model
      ↓
Criar ou alterar Service
      ↓
Criar ViewModel
      ↓
Criar View
      ↓
    Criar arquivo de rota no Expo Router
      ↓
Testar funcionalidade
      ↓
Revisar código
      ↓
Criar Pull Request
      ↓
Code Review
      ↓
Ajustes
      ↓
Merge
```

---

# 16. Checklist antes do Pull Request

* [ ] A funcionalidade pertence ao módulo correto
* [ ] O Model possui apenas responsabilidades relacionadas aos dados
* [ ] O Service externo está em `src/services`
* [ ] Infraestrutura técnica não está misturada com regras da feature
* [ ] O ViewModel concentra estado e lógica da tela
* [ ] A View não contém chamadas diretas para API
* [ ] Não existe JSX no Model ou ViewModel
* [ ] Componentes compartilhados foram reutilizados quando apropriado
* [ ] Nenhum componente foi movido para `shared` sem necessidade real
* [ ] Não existem valores visuais mágicos espalhados desnecessariamente
* [ ] A tela possui um arquivo de rota no `src/app`
* [ ] O `_layout.tsx` foi ajustado somente quando necessário
* [ ] Imports seguem os aliases configurados
* [ ] Estados de loading foram tratados
* [ ] Estados de erro foram tratados
* [ ] A funcionalidade foi testada manualmente
* [ ] Testes automatizados foram adicionados quando aplicável
* [ ] Não existem logs ou códigos temporários esquecidos
* [ ] O código foi revisado antes do Pull Request

---

# 17. Convenções de dependência

A aplicação deve respeitar esta direção:

```text
View
 ↓
ViewModel
 ↓
External Service
 ↓
Infrastructure
 ↓
External Systems
```

Evitar:

```text
Infrastructure
    ↓
Feature
    ↓
View
```

Ou:

```text
Service
    ↓
Importa componente
```

Ou:

```text
Model
    ↓
Faz chamada HTTP
```

Cada camada deve conhecer apenas o necessário para cumprir sua responsabilidade

---

# 18. Path Aliases

Para evitar:

```typescript
import { theme }
from '../../../../../shared/styles'
```

Utilizar aliases

Exemplo:

```typescript
import { theme } from '@shared/styles'

import { apiClient }
from '@infrastructure/api'

import { Contacts }
from '@modules/institutional/pages/Contacts'
```

Sugestão:

```text
@shared/*
@modules/*
@infrastructure/*
@types/*
```

---

# 19. Princípios do projeto

## Feature First

Organizar primeiro por domínio de negócio

Não espalhar arquivos relacionados pela aplicação sem necessidade

---

## Shared Later

Não criar abstrações genéricas antes de existir reutilização real

```text
Duplicação pequena
        ↓
Pode ser aceitável

Abstração ruim
        ↓
Pode virar um problema permanente
```

---

## Responsabilidade Clara

Cada camada precisa ter uma responsabilidade principal

```text
Model
Dados

ViewModel
Estado e comportamento

View
Interface

Service
Comunicação com domínio externo

Infrastructure
Recursos técnicos compartilhados
```

---

## Simplicidade antes de sofisticação

Não adicionar:

* Redux
* Zustand
* Context Global
* Repository Pattern
* Factory Pattern
* 14 camadas de abstração

Apenas porque a arquitetura ficaria com cara de apresentação corporativa

Uma nova camada só deve existir quando resolver um problema real

---

# 20. Resumo do fluxo oficial

```text
1. Entender a tarefa
        ↓
2. Identificar o módulo
        ↓
3. Criar branch
        ↓
4. Verificar reutilização existente
        ↓
5. Criar/alterar Model
        ↓
6. Criar/alterar Service
        ↓
7. Criar ViewModel
        ↓
8. Criar View
        ↓
9. Criar componentes necessários
        ↓
10. Criar arquivo de rota no Expo Router
        ↓
11. Testar
        ↓
12. Revisar
        ↓
13. Pull Request
        ↓
14. Code Review
        ↓
15. Merge
```

A regra principal é simples:

> O código deve ficar o mais próximo possível do domínio ao qual pertence, subir para `shared` apenas quando a reutilização for real e manter uma direção clara entre interface, lógica, serviços e infraestrutura