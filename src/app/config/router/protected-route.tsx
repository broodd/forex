import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface IProtectedRouteProps {
  isSuper?: boolean
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ isSuper }) => {
  console.log(isSuper)
  // const { client } = useAuth()
  // const isAdmin = client.data?.role === EProfileRole.ADMIN

  // if (!client.isAuthorized && client.isClientLoaded) {
  //   return <Navigate to={ROUTES.SIGN_IN.getPath()} replace />
  // }

  // if (client.isAuthorized && isSuper && !isAdmin) {
  //   return <Navigate to='/__not_found__' replace />
  // }

  return <Outlet />
}
