import { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { SplashLoader } from '~/lib/components'
import { ROUTES } from '~/lib/constants/routes'
import { PageLoader } from '~/shared/ui/page-loader'
import { ProtectedRoute } from './protected-route'

/* LAYOUTS */
import { AuthLayout, MainLayout } from '~/layouts'

/* PAGES */
import { DashboardPage } from '~/pages/dashboard-page'
import { SignInPage } from '~/pages/sign-in-page'
import { ErrorPage } from '~/pages/error-page'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route
        element={
          <AuthLayout>
            <Suspense fallback={<SplashLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        }
      >
        <Route path={ROUTES.SIGN_IN.route} element={<SignInPage />} />
      </Route>
      <Route
        element={
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute isSuper />
            </Suspense>
          </MainLayout>
        }
      >
        {/* <Route path={ROUTES.ROOT.route} element={<DashboardPage />} /> */}
        <Route path={ROUTES.DASHBOARD.route} element={<DashboardPage />} />
      </Route>
    </Route>,
  ),
)
