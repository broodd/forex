import { Flex } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerBonusKeys } from '../../types'
import { useActions, useLessonDetails } from './hooks'
import cls from './bonus-view.module.scss'
import { BonusPreview } from '../bonus-preview/bonus-preview'

export const BonusView = () => {
  const { t } = useTranslation()
  const { lesson, isLoading } = useLessonDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerBonusKeys.BONUS_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.BONUSES.DETAILS.TITLE_BONUS')}
          onDelete={onDeleteClick}
          onEdit={onEdit}
        />
        <DrawerBody className={cls.body}>
          <Spin spinning={isLoading}>
            {lesson && (
              <Flex vertical gap={24} className={classNames(cls.wrapper)}>
                <DetailsCard cover={lesson.cover?.src} title={lesson.title} />
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
                      label: t('TABLE.COLUMNS.WORKOUT_PREVIEW'),
                      value: '',
                    },
                  ]}
                />
                <BonusPreview lesson={lesson} />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
