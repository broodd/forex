import { lazy } from 'react'

export const CreateNewPasswordPageAsync = lazy(
  async () => await import('./create-new-password-page'),
)
