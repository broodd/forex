import { Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom'
import { SplashLoader } from '~/lib/components'
import { ROUTES } from '~/lib/constants/routes'
import { PageLoader } from '~/shared/ui/page-loader'
import { ProtectedRoute } from './protected-route'

/* LAYOUTS */
import { AuthLayout, MainLayout } from '~/layouts'

/* PAGES */
import { AccessCodePage } from '~/pages/access-code-page'
import { AccountPage } from '~/pages/account-page'
import { BonusesPage } from '~/pages/bonuses-page'
import { CoursesPage } from '~/pages/courses-page'
import { CreateNewPasswordPage } from '~/pages/create-new-password-page'
import { DashboardPage } from '~/pages/dashboard-page'
import { DaysPage } from '~/pages/days-page'
import { LessonsPage } from '~/pages/lessons-page'
import { ResetPasswordPage } from '~/pages/reset-password'
import { SignInPage } from '~/pages/sign-in-page'
import { WeeksPage } from '~/pages/weeks-page'
import { RecipesPage } from '~/pages/recipes-page'
import { ErrorPage } from '~/pages/error-page'
import { NotificationPage } from '~/pages/notification-page'
import { SuccessResetPage } from '~/pages/success-reset-page'

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
        <Route path={ROUTES.RESET_PASSWORD.route} element={<ResetPasswordPage />} />
        <Route path={ROUTES.ACCESS_CODE.route} element={<AccessCodePage />} />
        <Route path={ROUTES.CREATE_NEW_PASSWORD.route} element={<CreateNewPasswordPage />} />
        <Route path={ROUTES.SUCCESS_RESET.route} element={<SuccessResetPage />} />
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
        <Route path={ROUTES.COURSES.route} element={<CoursesPage />} />
        <Route path={ROUTES.WEEKS.route} element={<WeeksPage />} />
        <Route path={ROUTES.DAYS.route} element={<DaysPage />} />
        <Route path={ROUTES.LESSONS.route} element={<LessonsPage />} />
        <Route path={ROUTES.BONUSES.route} element={<BonusesPage />} />
        <Route path={ROUTES.RECIPES.route} element={<RecipesPage />} />
        <Route path={ROUTES.ACCOUNT.route} element={<AccountPage />} />
        <Route path={ROUTES.NOTIFICATIONS.route} element={<NotificationPage />} />
      </Route>
    </Route>,
  ),
)
