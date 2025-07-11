import { Image } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { ILesson } from '~/lib/api/types'
import { VideoPreview } from '~/lib/components'
import cls from './bonus-preview.module.scss'
import { FilePreview } from '~/lib/components/file-preview'
import { formatFileSize } from '~/shared/utils/upload'

interface IBonusPreviewProps {
  className?: string
  lesson: ILesson | undefined
}

export const BonusPreview: FC<IBonusPreviewProps> = ({ className, lesson }) => {
  return (
    <div className={classNames(cls.wrapper, [className])}>
      {lesson?.files?.map((item) => {
        const isVideo = item.mimetype === 'video/mp4'
        const isPDF = item.mimetype === 'application/pdf'

        return (
          <>
            {isVideo ? (
              <VideoPreview
                videoUrl={item.src}
                width={372}
                height={224}
                placeholder={lesson.cover?.src}
              />
            ) : isPDF ? (
              <FilePreview
                name={item.filename}
                size={formatFileSize(Number(item.fileSize))}
                src={item.src}
              />
            ) : (
              <Image preview={false} src={item.src} alt='cover' width={372} height={224} />
            )}
          </>
        )
      })}
    </div>
  )
}
