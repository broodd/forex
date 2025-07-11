import { Flex, List } from 'antd'
import classNames from 'classnames'
import { FC } from 'react'
import { ETextSizes, Text } from '~/shared/ui/text'
import cls from './info-list.module.scss'

interface IInfoListProps {
  className?: string
  options?: { label: string; value: string }[]
}

export const InfoList: FC<IInfoListProps> = ({ className, options }) => {
  return (
    <List
      className={classNames(cls.wrapper, [className])}
      dataSource={options}
      renderItem={(item) => (
        <List.Item className={cls.item}>
          <Flex className={cls.row} align='center' justify='space-between'>
            <Flex className={cls.left}>
              <Text size={ETextSizes.PGR} type='secondary'>
                {item.label}
              </Text>
            </Flex>
            <Flex className={cls.right}>
              <Text size={ETextSizes.PGS}>{item.value}</Text>
            </Flex>
          </Flex>
        </List.Item>
      )}
    />
  )
}
