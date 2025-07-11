import { lazy } from 'react'

export const LessonsPageAsync = lazy(async () => await import('./lessons-page'))
