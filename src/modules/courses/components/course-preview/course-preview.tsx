import { useQuery } from '@tanstack/react-query'
import { Collapse, CollapseProps, Flex } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { getLessons } from '~/lib/api/services'
import { ECourseType, ICourse, QueryKeys } from '~/lib/api/types'
import { VideoPreview } from '~/lib/components'
import { ArrowDownIcon, ArrowRightIcon, DoneIcon } from '~/shared/ui/icon'
import { Image } from '~/shared/ui/image'
import { Spin } from '~/shared/ui/spin'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import cls from './course-preview.module.scss'

interface ICoursePreviewProps {
  className?: string
  course?: ICourse
}

export const CoursePreview: FC<ICoursePreviewProps> = ({ className, course }) => {
  const isVideo = course && course.cover?.mimetype === 'video/mp4'
  const isChallenge = course?.type === ECourseType.CHALLENGE

  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_LESSONS],
    queryFn: () =>
      getLessons({
        challangeId: course?.id || '',
        page: 1,
        take: 100,
      }),
    enabled: !!course?.id,
  })

  const collapseItems: CollapseProps['items'] | undefined = lessons?.result.map((item) => ({
    key: item.id,
    label: (
      <Flex align='center' gap={8}>
        <DoneIcon style={{ fontSize: 24 }} />
        <Text size={ETextSizes.H7} className={cls.lessonTitle}>
          {item.title}
        </Text>
      </Flex>
    ),
  }))

  return (
    <Spin spinning={isFetching || isLoading}>
      <div className={classNames(cls.wrapper, [className])}>
        {isVideo ? (
          <VideoPreview
            videoUrl={course?.cover?.src}
            width={372}
            height={224}
            placeholder={course?.coverPlaceholder?.src}
          />
        ) : (
          <Image
            preview={false}
            src={course?.cover?.src}
            alt='course cover'
            width={372}
            height={224}
          />
        )}

        <Title level={5} className={cls.title}>
          {course?.title}
        </Title>
        <Text size={ETextSizes.H7} className={cls.description}>
          {course?.description}
        </Text>
        {isChallenge && (
          <Collapse
            items={collapseItems}
            className={cls.collapse}
            bordered={false}
            onChange={() => {}}
            expandIconPosition='end'
            expandIcon={({ isActive }) => {
              if (isActive) {
                return <ArrowDownIcon style={{ fontSize: 20 }} />
              } else {
                return <ArrowRightIcon style={{ fontSize: 20 }} />
              }
            }}
          />
        )}
      </div>
    </Spin>
  )
}
