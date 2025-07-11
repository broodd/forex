import { lazy } from 'react'

export const AccountPageAsync = lazy(async () => await import('./account-page'))
