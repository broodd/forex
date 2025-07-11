import { Image, Space } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { ILesson } from '~/lib/api/types'
import { VideoPreview } from '~/lib/components'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Title } from '~/shared/ui/title'
import cls from './lesson-preview.module.scss'
import { DownloadIcon, FilePDFIcon } from '~/shared/ui/icon'
import { Link } from '~/shared/ui/link'

interface ILessonPreviewProps {
  className?: string
  lesson: ILesson | undefined
}

export const LessonPreview: FC<ILessonPreviewProps> = ({ className, lesson }) => {
  const isVideo = lesson && lesson.cover?.mimetype === 'video/mp4'
  return (
    <div className={classNames(cls.wrapper, [className])}>
      {isVideo ? (
        <VideoPreview
          videoUrl={lesson?.cover?.src}
          width={372}
          height={224}
          placeholder={lesson?.coverPlaceholder?.src}
        />
      ) : (
        <Image preview={false} src={lesson?.cover?.src} alt='cover' width={372} height={224} />
      )}
      {lesson?.title && (
        <Title level={5} className={cls.title}>
          {lesson?.title}
        </Title>
      )}
      {lesson?.description && (
        <Text size={ETextSizes.H7} className={cls.description}>
          {lesson?.description}
        </Text>
      )}

      <div className={cls.files}>
        {lesson?.files?.map((item) => (
          <Link key={item.id} to={item.src} target='_blank'>
            <div className={cls.fileItem}>
              <Space size={12}>
                <FilePDFIcon style={{ fontSize: 32 }} />
                <Text
                  size={ETextSizes.H7}
                  className={cls.fileDescription}
                  ellipsis={{ tooltip: item.filename }}
                >
                  {item.filename}
                </Text>
              </Space>
              <DownloadIcon style={{ fontSize: 20 }} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
