import { useTranslation } from 'react-i18next'

import { useParams } from 'react-router-dom'
import { PageLayout } from '~/layouts'
import {
  EDrawerLessonKeys,
  LessonCreation,
  LessonEdit,
  LessonsTable,
  LessonView,
} from '~/modules/lessons'
import { Button } from '~/shared/ui/button'
import { Drawer, DrawerProvider } from '~/shared/ui/drawer'
import { AddIcon } from '~/shared/ui/icon'
import cls from './lessons-page.module.scss'
import { useDrawerContext } from '~/shared/ui/drawer/hooks'

const LessonsBasePage = () => {
  const { name } = useParams()
  const { openDrawer } = useDrawerContext()
  const { t } = useTranslation()

  return (
    <>
      <PageLayout
        className={cls.wrapper}
        header={{
          title: name,
          backBtn: true,
          extra: (
            <Button
              icon={<AddIcon />}
              type='primary'
              onClick={() => openDrawer(EDrawerLessonKeys.LESSON_CREATION)}
            >
              {t('PAGES.LESSONS.BTN_ADD')}
            </Button>
          ),
        }}
      >
        <LessonsTable />
      </PageLayout>
      <Drawer elements={[LessonView, LessonCreation, LessonEdit]} />
    </>
  )
}

export const LessonsPage = () => (
  <DrawerProvider>
    <LessonsBasePage />
  </DrawerProvider>
)

export default LessonsPage
