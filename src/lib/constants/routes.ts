export enum ERoutes {
  ROOT = 'ROOT',
  SIGN_IN = 'SIGN_IN',
  DASHBOARD = 'DASHBOARD',
}
export interface IOneRouteConfig {
  route: string
  getPath: (id?: string | number, name?: string, secondId?: string) => string
  testRegExp: RegExp
}

export type TRoutesConfig = { [key in ERoutes]: IOneRouteConfig }

export const ROUTES: TRoutesConfig = {
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
  [ERoutes.DASHBOARD]: {
    route: 'dashboard',
    getPath: () => '/dashboard',
    testRegExp: /^\/dashboard$/,
  },
}
