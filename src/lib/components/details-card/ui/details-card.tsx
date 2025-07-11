import { Flex, Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { ESchemaType } from '~/lib/api/types'
import { Image } from '~/shared/ui/image'
import { Paragraph } from '~/shared/ui/paragraph'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import { SchemaTypeTag } from '../../schema-type-tag'
import cls from './details-card.module.scss'
import { VideoPreview } from '../../video-preview/video-preview'

interface IDetailsCardProps {
  className?: string
  cover?: string
  title?: string
  type?: ESchemaType
  price?: number | null
  salePrice?: number | null
  description?: string
  coverType?: string
  videoPlaceholder?: string | null
}

export const DetailsCard: FC<IDetailsCardProps> = ({
  className,
  cover,
  title,
  type,
  price,
  salePrice,
  description,
  coverType,
  videoPlaceholder,
}) => {
  const isVideo = coverType && coverType === 'video/mp4'
  return (
    <Flex gap={16} align='center' className={classNames(cls.wrapper, [className])}>
      {cover && (
        <>
          {isVideo ? (
            <VideoPreview
              width={150}
              height={150}
              videoUrl={cover}
              placeholder={videoPlaceholder ? videoPlaceholder : undefined}
            />
          ) : (
            <Image
              alt='image'
              src={cover}
              width={150}
              height={150}
              preview={false}
              className={cls.image}
            />
          )}
        </>
      )}

      <Flex vertical gap={8} className={cls.body}>
        {title && (
          <Title level={4} className={cls.title}>
            {title}
          </Title>
        )}
        {type && <SchemaTypeTag type={type} />}
        {description && (
          <Paragraph type='secondary' ellipsis={{ tooltip: description, rows: 2 }}>
            {description}
          </Paragraph>
        )}
        {price && !salePrice && <Text className={cls.price}>{`€ ${price}`}</Text>}
        {price && salePrice && (
          <Space>
            <Text className={cls.price}>{`€ ${salePrice}`}</Text>
            <Text
              type='secondary'
              size={ETextSizes.PGR}
              className={cls.salePrice}
            >{`€ ${price}`}</Text>
          </Space>
        )}
      </Flex>
    </Flex>
  )
}
