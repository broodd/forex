import classNames from 'classnames'
import { FC } from 'react'
import cls from './drag-and-drop-uploader.module.scss'

import type { UploadProps } from 'antd'
import { Upload } from 'antd'
import { Trans } from 'react-i18next'
import { ETextSizes, Text } from '../../text'

const { Dragger } = Upload

interface IDragAndDropUploaderProps extends UploadProps {
  className?: string
  description?: string
}

export const DragAndDropUploader: FC<IDragAndDropUploaderProps> = ({
  className,
  description,
  ...props
}) => {
  return (
    <Dragger {...props} className={classNames(cls.dragger, [className])}>
      <Trans
        i18nKey={description ? description : 'FORM.UPLOADER.PLACEHOLDER'}
        components={{
          p: <Text size={ETextSizes.PGR} className={cls.description}></Text>,
          br: <br />,
        }}
      />
    </Dragger>
  )
}
