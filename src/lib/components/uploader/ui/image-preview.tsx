import { Image } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { Button } from '~/shared/ui/button'
import { DeleteIcon, FilePDFIcon, VideoFileIcon } from '~/shared/ui/icon'
import { ETextSizes, Text } from '~/shared/ui/text'
import { formatFileSize } from '~/shared/utils/upload'
import cls from './image-preview.module.scss'

interface IImagePreviewProps {
  className?: string
  previewImage: string
  name?: string
  size?: number
  onDeletePreview: () => void
  type?: string
}

export const ImagePreview: FC<IImagePreviewProps> = ({
  className,
  previewImage,
  name,
  size,
  onDeletePreview,
  type,
}) => {
  const fileType = type?.split('/')[1]

  return (
    <div className={classNames(cls.preview, [className])}>
      <div className={cls.flex}>
        <div className={cls.iconBox}>
          {fileType === 'pdf' ? (
            <FilePDFIcon className={cls.icon} />
          ) : fileType === 'mp4' || fileType === 'mov' || fileType === 'avi' ? (
            <VideoFileIcon className={cls.icon} />
          ) : (
            <Image
              src={previewImage}
              height={59}
              width={59}
              preview={false}
              className={cls.image}
            />
          )}
        </div>

        <div className={cls.image_info}>
          {name && <Text size={ETextSizes.PGS}>{name}</Text>}
          {size && (
            <Text size={ETextSizes.PSR} type='secondary'>
              {formatFileSize(size)}
            </Text>
          )}
        </div>
      </div>
      <Button
        danger
        type='link'
        icon={<DeleteIcon style={{ fontSize: 24 }} />}
        onClick={onDeletePreview}
      />
    </div>
  )
}
