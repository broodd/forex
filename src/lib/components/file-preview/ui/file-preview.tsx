import { FC } from 'react'
import classNames from 'classnames'
import cls from './file-preview.module.scss'
import { FilePDFIcon } from '~/shared/ui/icon'
import { ETextSizes, Text } from '~/shared/ui/text'
import { Link } from 'react-router-dom'

interface IFilePreviewProps {
  className?: string
  name?: string
  size?: string
  src: string
}

export const FilePreview: FC<IFilePreviewProps> = ({ className, name, size, src }) => {
  return (
    <Link target='_blank' to={src} className={cls.link}>
      <div className={classNames(cls.wrapper, [className])}>
        <div className={cls.iconBox}>
          <FilePDFIcon style={{ fontSize: 32 }} />
        </div>
        <div className={cls.textBox}>
          {name && <Text size={ETextSizes.PGS}>{name}</Text>}
          {size && (
            <Text size={ETextSizes.PSR} type='secondary'>
              {size}
            </Text>
          )}
        </div>
      </div>
    </Link>
  )
}
