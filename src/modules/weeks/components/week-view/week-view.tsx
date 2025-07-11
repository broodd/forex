import { Flex } from 'antd'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { ESchemaType, EWeekType } from '~/lib/api/types'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerKeys } from '../../types'
import { useActions, useWeekDetails } from './hooks'
import cls from './week-view.module.scss'
import { WeekPreview } from '../week-preview/week-preview'

export const WeekView = () => {
  const { t } = useTranslation()
  const { week, isLoading } = useWeekDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerKeys.WEEK_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.WEEKS.DETAILS.TITLE_WEEK')}
          onDelete={onDeleteClick}
          onEdit={onEdit}
        />
        <DrawerBody className={cls.body}>
          <Spin spinning={isLoading}>
            {week && (
              <Flex vertical gap={24} className={classNames(cls.wrapper)}>
                <DetailsCard
                  cover={week.cover?.src}
                  title={week.title}
                  type={week.type as unknown as ESchemaType}
                  videoPlaceholder={week.titleCover?.src}
                  coverType={week.cover?.mimetype}
                />
                <InfoList
                  options={[
                    { label: t('TABLE.COLUMNS.NAME'), value: week.title },
                    {
                      label: t('TABLE.COLUMNS.TYPE'),
                      value: t(`ACTIONS.COURSE_TYPE.${week.type}`),
                    },
                    {
                      label: t('TABLE.COLUMNS.VISIBLE_FOR_CUSTOMERS'),
                      value: week.isVisible ? t('ACTIONS.IS_VISIBLE') : t('ACTIONS.IS_NOT_VISIBLE'),
                    },
                    {
                      label: t('TABLE.COLUMNS.COURSE'),
                      value: week.course?.title || '',
                    },
                    ...(week.type === EWeekType.BONUS
                      ? [
                          {
                            label: t('TABLE.COLUMNS.FILES'),
                            value: `${week.__lessons_files_count || 0}`,
                          },
                        ]
                      : []),
                    {
                      label: t('TABLE.COLUMNS.DATE'),
                      value: dayjs(week.createdAt).format('MMM DD, YYYY'),
                    },
                    {
                      label:
                        week.type === EWeekType.BONUS
                          ? t('TABLE.COLUMNS.BONUS_PREVIEW')
                          : t('TABLE.COLUMNS.WEEK_PREVIEW'),
                      value: '',
                    },
                  ]}
                />
                <WeekPreview week={week} />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
