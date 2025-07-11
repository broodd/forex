import { Flex } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerLessonKeys } from '../../types'
import { useActions, useLessonDetails } from './hooks'
import cls from './lesson-view.module.scss'
import { LessonPreview } from '../lesson-preview/lesson-preview'

export const LessonView = () => {
  const { t } = useTranslation()
  const { lesson, isLoading } = useLessonDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerLessonKeys.LESSON_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.LESSONS.DETAILS.TITLE_LESSON')}
          onDelete={onDeleteClick}
          onEdit={onEdit}
        />
        <DrawerBody className={cls.body}>
          <Spin spinning={isLoading}>
            {lesson && (
              <Flex vertical gap={24} className={classNames(cls.wrapper)}>
                <DetailsCard
                  cover={lesson.cover?.src}
                  title={lesson.title}
                  coverType={lesson.cover?.mimetype}
                  videoPlaceholder={lesson.coverPlaceholder?.src}
                />
                <InfoList
                  options={[
                    { label: t('TABLE.COLUMNS.NAME'), value: lesson.title },
                    {
                      label: t('TABLE.COLUMNS.VISIBLE_FOR_CUSTOMERS'),
                      value: lesson.isVisible
                        ? t('ACTIONS.IS_VISIBLE')
                        : t('ACTIONS.IS_NOT_VISIBLE'),
                    },
                    {
                      label: t('TABLE.COLUMNS.COURSE'),
                      value: lesson.course?.title || '',
                    },
                    {
                      label: t('TABLE.COLUMNS.WEEK'),
                      value: lesson.week?.title || '',
                    },
                    {
                      label: t('TABLE.COLUMNS.FILES'),
                      value: `${lesson.files?.length || 0}`,
                    },
                    {
                      label: t('TABLE.COLUMNS.LESSON_PREVIEW'),
                      value: lesson.week?.title || '',
                    },
                  ]}
                />
                <LessonPreview lesson={lesson} />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
