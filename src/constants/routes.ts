export const APP_ROUTES = {
    auth: {
        login: 'login',
        cadastro: 'cadastro',
    },
    root: '',
    perfil: 'perfil',
    conta: 'perfil/configuracoes/conta',
    dashboard: 'dashboard',
    configuracoes: 'perfil/configuracoes',
    sobre: 'perfil/configuracoes/sobre',
    contato: 'perfil/configuracoes/contato',
    senha: 'perfil/configuracoes/senha',
    imoveis: 'imoveis',
    detalhes: 'imoveis/detalhes-imovel',
    favoritos: 'imoveis/favoritos',
} as const

export type AppRouteKey = keyof typeof APP_ROUTES
export type AppRoutePath =
  | (typeof APP_ROUTES.auth)[keyof typeof APP_ROUTES.auth]
  | Exclude<(typeof APP_ROUTES)[keyof typeof APP_ROUTES], typeof APP_ROUTES.auth>

const normalizePathname = (pathname: string) => pathname.replace(/^\/+|\/+$/g, '')

const getRouteCandidates = (route: string) => {
  const normalizedRoute = normalizePathname(route)

  return normalizedRoute.startsWith('auth/')
    ? [normalizedRoute]
    : [normalizedRoute, `app/${normalizedRoute}`]
}

export function isAppRouteActive(pathname: string, route: AppRoutePath) {
  const normalizedPathname = normalizePathname(pathname)

  return getRouteCandidates(route).some((candidate) => normalizedPathname === candidate)
}

export function isAuthRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)

  return normalizedPathname === 'auth' || normalizedPathname.startsWith('auth/')
}

export function isEntryRoute(pathname: string) {
  return normalizePathname(pathname) === ''
}

export function isSettingsRoute(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)

  return getRouteCandidates(APP_ROUTES.configuracoes).some(
    (candidate) => normalizedPathname === candidate || normalizedPathname.startsWith(`${candidate}/`),
  )
}

export function isProfileRoute(pathname: string) {
  return isAppRouteActive(pathname, APP_ROUTES.perfil)
}
