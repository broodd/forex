/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditTableModal.js
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import cls from './metric-card.module.scss'

const { Title } = Typography

export const EditStatsTableModal = ({
  visible,
  onCancel,
  onSave,
  initialTableData,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialTableData: any
}) => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [editingKey, setEditingKey] = useState('') // To track which row is being edited

  useEffect(() => {
    // When the modal becomes visible or initialTableData changes, update the internal dataSource
    if (visible && initialTableData) {
      // Add a unique key to each item if not already present, for Ant Design Table
      const dataWithKeys = initialTableData.map((item: { key: any }, index: any) => ({
        ...item,
        key: item.key || `row-${index}-${Math.random().toString(36).substr(2, 9)}`,
      }))
      setDataSource(dataWithKeys)
    }
  }, [visible, initialTableData])

  const isEditing = (record: { key: string }) => record.key === editingKey

  const edit = (record: { key?: any }) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: any) => {
    try {
      const row = await form.validateFields()
      const newData: any = [...dataSource]
      const index = newData.findIndex((item: any) => key === item.key)

      if (index > -1) {
        const item: any = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setDataSource(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setDataSource(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const handleDelete = (key: any) => {
    setDataSource(dataSource.filter((item: any) => item.key !== key))
  }

  const handleAddRow = () => {
    const newKey = `new-row-${Math.random().toString(36).substr(2, 9)}`
    // Define default empty values based on the table type
    const newRow = {
      key: newKey,
      name: '2958058',
      id: '2958058',
      impressions: '1457',
      clicks: '1196',
      ctr: '82.09%',
      leads: '1120',
      ctl: '99.55%',
      ftds: '0',
      c2ftd: '23',
      cr: '0%',
      total: '$0',
      softFail: '225',
      hardFail: '0',
      unassigned: '36',
      payout: '$0',
      dynamicLevel: '',
    }
    setDataSource([...dataSource, newRow] as any)
    edit(newRow) // Immediately put the new row into edit mode
  }

  // Define columns based on tableType
  const getColumns = () => {
    let cols: { title: string; dataIndex: string; key: string; editable: boolean }[] = []
    cols = [
      { title: 'Name', dataIndex: 'name', key: 'name', editable: true },
      { title: 'ID', dataIndex: 'id', key: 'id', editable: true },
      { title: 'Impressions', dataIndex: 'impressions', key: 'impressions', editable: true },
      { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', editable: true },
      { title: 'CTR', dataIndex: 'ctr', key: 'ctr', editable: true },
      { title: 'Leads', dataIndex: 'leads', key: 'leads', editable: true },
      { title: 'CTL', dataIndex: 'ctl', key: 'ctl', editable: true },
      { title: 'FTDS', dataIndex: 'ftds', key: 'ftds', editable: true },
      { title: 'C2FTD', dataIndex: 'c2ftd', key: 'c2ftd', editable: true },
      { title: 'CR', dataIndex: 'cr', key: 'cr', editable: true },
      { title: 'Total Payout', dataIndex: 'total', key: 'total', editable: true },
      { title: 'Soft Failures', dataIndex: 'softFail', key: 'softFail', editable: true },
      { title: 'Hard Failures', dataIndex: 'hardFail', key: 'hardFail', editable: true },
      { title: 'Unassigned', dataIndex: 'unassigned', key: 'unassigned', editable: true },
      { title: 'Payout', dataIndex: 'payout', key: 'payout', editable: true },
      { title: 'dynamicLevel', dataIndex: 'dynamicLevel', key: 'dynamicLevel', editable: true },
    ]

    return [
      ...cols,
      {
        title: 'Action',
        dataIndex: 'operation',
        width: 150,
        render: (_: any, record: { key: any }) => {
          const editable = isEditing(record)
          return editable ? (
            <Space>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{ width: 100, marginRight: 8, color: '#f3c75d' }}
              >
                Save
              </Typography.Link>
              <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
                <a style={{ color: '#ff4d4f' }}>Cancel</a>
              </Popconfirm>
            </Space>
          ) : (
            <Space>
              <Typography.Link
                disabled={editingKey !== ''}
                onClick={() => edit(record)}
                style={{ color: '#52c41a' }}
              >
                Edit
              </Typography.Link>
              <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
                <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
              </Popconfirm>
            </Space>
          )
        },
      },
    ]
  }

  const mergedColumns = getColumns().map((col: any) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const EditableCell = ({ editing, dataIndex, title, inputType, children, ...restProps }: any) => {
    const inputNode =
      inputType === 'number' ? (
        <InputNumber
          style={{
            width: '100%',
            backgroundColor: '#4a4a4a',
            borderColor: '#6a6a6a',
            color: 'white',
          }}
        />
      ) : (
        <Input style={{ backgroundColor: '#4a4a4a', borderColor: '#6a6a6a', color: 'white' }} />
      )
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Edit table
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      width='95%'
      // width={tableType === 'affiliates' ? 900 : 700} // Adjust width based on table type
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => onSave(dataSource)}
          style={{ backgroundColor: '#f3c75d', borderColor: '#f3c75d', color: '#1a1a1a' }}
        >
          Save All Changes
        </Button>,
      ]}
      styles={{ body: { background: '#2a2a2a', padding: 12 } }}
      style={{ top: 50 }}
    >
      <Button
        onClick={handleAddRow}
        type='primary'
        style={{
          marginBottom: 16,
          backgroundColor: '#52c41a',
          borderColor: '#52c41a',
          color: 'white',
        }}
        icon={<PlusOutlined />}
      >
        Add a row
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          scroll={{ x: true }}
          dataSource={dataSource}
          columns={mergedColumns}
          pagination={false} // Or configure pagination as needed
          rowClassName='editable-row'
          style={{ background: '#2a2a2a', color: 'white' }}
          className={cls.hardTable}
        />
      </Form>
    </Modal>
  )
}
