/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Table, Typography } from 'antd'
import cls from './table.module.scss'

const { Text } = Typography

const CustomTable = ({
  title,
  data,
  columns,
}: {
  title: string
  columns: { title: string; dataIndex: string; key: string; render?: any }[]
  data: any[]
}) => {
  return (
    <Col span={24} className={cls.wrapper}>
      <Text className={cls.title}>{title}</Text>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        style={{ backgroundColor: '#1E1E1E' }}
        className={cls.customTable}
        scroll={{ x: 'max-content' }}
      />
    </Col>
  )
}

export default CustomTable
