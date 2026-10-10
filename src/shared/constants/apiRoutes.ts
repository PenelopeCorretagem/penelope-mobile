export const API_ROUTES = {
  auth: {
    login: '/v1/auth/login',
    register: '/v1/auth/register',
    forgotPassword: '/v1/auth/forgot-password',
    validateAccessToken: '/v1/auth/validate-access-token',
  },
  advertisements: {
    collection: '/v1/advertisements',
    byId: (id: number) => `/v1/advertisements/${id}`,
  },
  users: {
    me: '/v1/users/me',
    favorites: '/v1/users/me/favorites',
    favoriteByAdvertisementId: (advertisementId: number) =>
      `/v1/users/me/favorites/${advertisementId}`,
    notifications: '/v1/users/me/notifications',
    notificationById: (userNotificationId: number) =>
      `/v1/users/me/notifications/${userNotificationId}`,
    notificationRead: (userNotificationId: number) =>
      `/v1/users/me/notifications/${userNotificationId}/read`,
  },
  propertyMedia: {
    collection: '/imagem_empreendimento',
    types: '/tipo_imagem',
  },
} as const