import { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { ROUTES } from '~/lib/constants/routes'
import { PageLoader } from '~/shared/ui/page-loader'
import { ProtectedRoute } from './protected-route'

/* LAYOUTS */
import { AuthLayout, MainLayout } from '~/layouts'

/* PAGES */
import { DashboardPage } from '~/pages/dashboard-page'
import { ErrorPage } from '~/pages/error-page'
import { SignInPage } from '~/pages/sign-in-page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route
        element={
          <AuthLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </AuthLayout>
        }
      >
        <Route path={ROUTES.ROOT.route} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_IN.route} element={<SignInPage />} />
      </Route>
      <Route
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute />
            </Suspense>
          </MainLayout>
        }
      >
        <Route path={ROUTES.DASHBOARD.route} element={<DashboardPage />} />
      </Route>
    </Route>,
  ),
)
