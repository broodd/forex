import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '~/lib/constants/routes'
import { useAuth } from '~/shared/hooks/useAuth'

interface IProtectedRouteProps {
  isSuper?: boolean
}

export const ProtectedRoute: FC<IProtectedRouteProps> = () => {
  const { client } = useAuth()

  if (!client.data || !client.isAuthorized) {
    return <Navigate to={ROUTES.SIGN_IN.getPath()} replace />
  }

  return <Outlet />
}
