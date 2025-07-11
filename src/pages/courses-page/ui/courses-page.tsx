import { useTranslation } from 'react-i18next'
import { PageLayout } from '~/layouts'
import { CoursesTable, CourseView, CreateCourseDrawer } from '~/modules'
import { EditCourseDrawer } from '~/modules/courses/components/edit-course-drawer/edit-course-drawer'
import { EDrawerKeys } from '~/modules/courses/types'
import { Button } from '~/shared/ui/button'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'
import { AddIcon } from '~/shared/ui/icon'

const CoursesBasePage = () => {
  const { t } = useTranslation()
  const { openDrawer } = useDrawerContext()

  return (
    <>
      <PageLayout
        header={{
          title: t('PAGES.COURSES.TITLE')!,
          extra: (
            <Button
              icon={<AddIcon />}
              type='primary'
              onClick={() => openDrawer(EDrawerKeys.COURSE_CREATION)}
            >
              {t('PAGES.COURSES.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <CoursesTable />
      </PageLayout>
      <Drawer elements={[CreateCourseDrawer, CourseView, EditCourseDrawer]} />
    </>
  )
}

export const CoursesPage = () => (
  <DrawerProvider>
    <CoursesBasePage />
  </DrawerProvider>
)

export default CoursesPage
