import { Flex } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerDaysKeys } from '../../types'
import { useActions, useLessonDetails } from './hooks'
import cls from './day-view.module.scss'

export const DayView = () => {
  const { t } = useTranslation()
  const { lesson, isLoading } = useLessonDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerDaysKeys.DAY_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.DAYS.DETAILS.TITLE_DAY')}
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
                  ]}
                />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
