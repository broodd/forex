import { useQuery } from '@tanstack/react-query'
import { Collapse, CollapseProps, Image, Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { getLessons } from '~/lib/api/services'
import { EWeekType, IWeek, QueryKeys } from '~/lib/api/types'
import { VideoPreview } from '~/lib/components'
import { ArrowDownIcon, ArrowRightIcon, DoneIcon } from '~/shared/ui/icon'
import { Spin } from '~/shared/ui/spin'
import { Title } from '~/shared/ui/title'
import cls from './week-preview.module.scss'
import { ETextSizes, Text } from '~/shared/ui/text'

interface IWeekPreviewProps {
  className?: string
  week: IWeek | undefined
}

export const WeekPreview: FC<IWeekPreviewProps> = ({ className, week }) => {
  const isVideo = week && week.cover?.mimetype === 'video/mp4'
  const isBonus = week && week.type === EWeekType.BONUS

  const {
    data: lessons,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeys.GET_LESSONS],
    queryFn: () =>
      getLessons({
        weekId: week?.id || '',
        page: 1,
        take: 100,
      }),
    enabled: !!week?.id,
  })

  const collapseItems: CollapseProps['items'] | undefined = lessons?.result.map((item) => ({
    key: item.id,
    label: (
      <Space>
        <DoneIcon style={{ fontSize: 24 }} />
        <Text size={ETextSizes.H7} className={cls.lessonTitle}>
          {item.title}
        </Text>
      </Space>
    ),
  }))

  return (
    <Spin spinning={isFetching || isLoading}>
      <div className={classNames(cls.wrapper, [className])}>
        {isVideo ? (
          <VideoPreview
            videoUrl={week?.cover?.src}
            width={372}
            height={224}
            placeholder={week.titleCover?.src}
          />
        ) : (
          <Image preview={false} src={week?.cover?.src} alt='cover' width={372} height={224} />
        )}
        {week?.title && (
          <Title level={5} className={cls.title}>
            {week?.title}
          </Title>
        )}
        {!isBonus && (
          <Collapse
            items={collapseItems}
            className={cls.collapse}
            bordered={false}
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
