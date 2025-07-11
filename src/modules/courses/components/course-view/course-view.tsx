import { Flex } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { ECourseType, ESchemaType } from '~/lib/api/types'
import { DetailsCard, InfoList } from '~/lib/components'
import { DrawerBody, DrawerCard, DrawerElement, DrawerHeader } from '~/shared/ui/drawer'
import { Spin } from '~/shared/ui/spin'
import { EDrawerKeys } from '../../types'
import cls from './course-view.module.scss'
import { useActions, useCourseDetails } from './hooks'
import { CoursePreview } from '../course-preview/course-preview'

export const CourseView = () => {
  const { t } = useTranslation()
  const { course, isLoading } = useCourseDetails()
  const { onDeleteClick, onEdit } = useActions()
  return (
    <DrawerElement drawerKey={EDrawerKeys.COURSE_VIEW}>
      <DrawerCard>
        <DrawerHeader
          title={t('PAGES.COURSES.DETAILS.TITLE_COURSE')}
          onDelete={onDeleteClick}
          onEdit={onEdit}
        />
        <DrawerBody className={cls.body}>
          <Spin spinning={isLoading}>
            {course && (
              <Flex vertical gap={24} className={classNames(cls.wrapper)}>
                <DetailsCard
                  coverType={course.cover?.mimetype}
                  cover={course.cover?.src}
                  title={course.title}
                  type={course.type as unknown as ESchemaType}
                  price={Number(course.price) || null}
                  salePrice={Number(course.salePrice) || null}
                  videoPlaceholder={course?.coverPlaceholder?.src}
                />
                <InfoList
                  options={[
                    { label: t('TABLE.COLUMNS.TITLE'), value: course.title },
                    {
                      label: t('TABLE.COLUMNS.TYPE'),
                      value: t(`ACTIONS.COURSE_TYPE.${course.type}`),
                    },
                    {
                      label: t('TABLE.COLUMNS.VISIBLE_FOR_CUSTOMERS'),
                      value: course.isVisible
                        ? t('ACTIONS.IS_VISIBLE')
                        : t('ACTIONS.IS_NOT_VISIBLE'),
                    },
                    {
                      label: t('TABLE.COLUMNS.SUBSCRIBERS'),
                      value: course.__subscribers_count || '0',
                    },
                    {
                      label:
                        course?.type === ECourseType.COURSE
                          ? t('TABLE.COLUMNS.COURSE_PREVIEW')
                          : t('TABLE.COLUMNS.CHALLENGE_PREVIEW'),
                      value: '',
                    },
                  ]}
                />
                <CoursePreview course={course} />
              </Flex>
            )}
          </Spin>
        </DrawerBody>
      </DrawerCard>
    </DrawerElement>
  )
}
