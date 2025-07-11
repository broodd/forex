import { FC, useRef, useState } from 'react'
import classNames from 'classnames'
import cls from './video-preview.module.scss'
import { PlayIcon } from './views'
import { Card } from '~/shared/ui/card'
import Modal from 'antd/es/modal/Modal'

interface IVideoPreviewProps {
  className?: string
  placeholder?: string | null
  videoUrl?: string
  width?: number | string
  height?: number | string
}

export const VideoPreview: FC<IVideoPreviewProps> = ({
  className,
  placeholder,
  videoUrl,
  width = 352,
  height = 224,
}) => {
  const [open, setOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setOpen((prev) => !prev)
  }

  return (
    <>
      <Card
        onClick={() => setOpen((prev) => !prev)}
        hoverable
        className={classNames(cls.wrapper, [className])}
        cover={
          <img
            src={placeholder ? placeholder : undefined}
            alt='Video Thumbnail'
            style={{ width, height }}
          />
        }
        style={{ width, height, minHeight: height, minWidth: width, objectFit: 'cover' }}
      >
        <PlayIcon />
      </Card>

      <Modal open={open} onCancel={handleClose} footer={null} width={800}>
        <video ref={videoRef} controls width='100%'>
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  )
}
