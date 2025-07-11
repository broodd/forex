import { FC } from 'react'
import { Input as AntdInput, InputProps } from 'antd'
import classNames from 'classnames'
import cls from './search.module.scss'
import { SearchIcon } from '../../icon/ui/search-icon'
import { CloseIcon } from '../../icon'
import { useTranslation } from 'react-i18next'

interface ISearchProps extends InputProps {
  className?: string
}

export const Search: FC<ISearchProps> = ({ className, allowClear, ...props }) => {
  const { t } = useTranslation()
  return (
    <AntdInput
      className={classNames(cls.wrapper, [className])}
      {...props}
      prefix={<SearchIcon style={{ fontSize: 24 }} />}
      allowClear={allowClear ? { clearIcon: <CloseIcon style={{ fontSize: 24 }} /> } : false}
      placeholder={t('ACTIONS.SEARCH')}
    />
  )
}
