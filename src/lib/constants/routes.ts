export enum ERoutes {
  ROOT = 'ROOT',
  ACCOUNT = 'ACCOUNT',
  ACCESS_CODE = 'ACCESS_CODE',
  CREATE_NEW_PASSWORD = 'CREATE_NEW_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  SUCCESS_RESET = 'SUCCESS_RESET',
  SIGN_IN = 'SIGN_IN',
  COURSES = 'COURSES',
  WEEKS = 'WEEKS',
  LESSONS = 'LESSONS',
  BONUSES = 'BONUSES',
  DAYS = 'DAYS',
  RECIPES = 'RECIPES',
  NOTIFICATIONS = 'NOTIFICATIONS',
  DASHBOARD = 'DASHBOARD',
}
export interface IOneRouteConfig {
  route: string
  getPath: (id?: string | number, name?: string, secondId?: string) => string
  testRegExp: RegExp
}

export type TRoutesConfig = { [key in ERoutes]: IOneRouteConfig }

export const ROUTES: TRoutesConfig = {
  [ERoutes.ACCESS_CODE]: {
    route: 'reset-password',
    getPath: () => '/reset-password',
    testRegExp: /^\/reset-password$/,
  },
  [ERoutes.SUCCESS_RESET]: {
    route: 'success-reset',
    getPath: () => '/success-reset',
    testRegExp: /^\/success-reset$/,
  },
  [ERoutes.ACCOUNT]: {
    route: 'account',
    getPath: () => '/account',
    testRegExp: /^\/account$/,
  },
  [ERoutes.CREATE_NEW_PASSWORD]: {
    route: 'create-new-password',
    getPath: () => '/create-new-password',
    testRegExp: /^\/create-new-password$/,
  },
  [ERoutes.RESET_PASSWORD]: {
    route: 'reset-password-send-email',
    getPath: () => '/reset-password-send-email',
    testRegExp: /^\/reset-password-send-email$/,
  },
  [ERoutes.ROOT]: {
    route: '/',
    getPath: () => '/',
    testRegExp: /^\/$/,
  },
  [ERoutes.SIGN_IN]: {
    route: 'sign-in',
    getPath: () => '/sign-in',
    testRegExp: /^\/sign-in$/,
  },
  [ERoutes.NOTIFICATIONS]: {
    route: 'notifications',
    getPath: () => '/notifications',
    testRegExp: /^\/notifications$/,
  },
  [ERoutes.COURSES]: {
    route: 'courses',
    getPath: () => '/courses',
    testRegExp: /^\/courses$/,
  },
  [ERoutes.DASHBOARD]: {
    route: 'dashboard',
    getPath: () => '/dashboard',
    testRegExp: /^\/dashboard$/,
  },
  [ERoutes.WEEKS]: {
    route: 'courses/weeks/:id/:name',
    getPath: (id, name) => `/courses/weeks/${id}/${name}`,
    testRegExp: /^\/weeks$/,
  },
  [ERoutes.LESSONS]: {
    route: 'courses/week/lessons/:id/:name/:secondId',
    getPath: (id, name, secondId) => `/courses/week/lessons/${id}/${name}/${secondId}`,
    testRegExp: /^\/weeks$/,
  },
  [ERoutes.BONUSES]: {
    route: 'courses/week/bonuses/:id/:name/:secondId',
    getPath: (id, name, secondId) => `/courses/week/bonuses/${id}/${name}/${secondId}`,
    testRegExp: /^\/weeks$/,
  },
  [ERoutes.DAYS]: {
    route: 'courses/challenge/:id/:name',
    getPath: (id, name) => `/courses/challenge/${id}/${name}`,
    testRegExp: /^\/course$/,
  },
  [ERoutes.RECIPES]: {
    route: 'recipes',
    getPath: () => '/recipes',
    testRegExp: /^\/recipes$/,
  },
}
