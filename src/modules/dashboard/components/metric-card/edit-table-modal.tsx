/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/EditTableModal.js
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title } = Typography

export const EditTableModal = ({
  visible,
  onCancel,
  onSave,
  initialTableData,
  tableType,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialTableData: any
  tableType: any
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
    let newRow = {}
    if (tableType === 'affiliates') {
      newRow = {
        key: newKey,
        name: '',
        impressions: 0,
        leads: 0,
        ftds: 0,
        conversionRate: '0%',
        clicks: 0,
      }
    } else if (tableType === 'insights') {
      newRow = { key: newKey, day: '', value: 0, percentage: '0%' }
    }
    setDataSource([...dataSource, newRow] as any)
    edit(newRow) // Immediately put the new row into edit mode
  }

  // Define columns based on tableType
  const getColumns = () => {
    let cols: { title: string; dataIndex: string; key: string; editable: boolean }[] = []
    if (tableType === 'affiliates') {
      cols = [
        { title: 'Name', dataIndex: 'name', key: 'name', editable: true },
        { title: 'Impressions', dataIndex: 'impressions', key: 'impressions', editable: true },
        { title: 'Leads', dataIndex: 'leads', key: 'leads', editable: true },
        { title: 'FTDs', dataIndex: 'ftds', key: 'ftds', editable: true },
        {
          title: 'Conversion Rate',
          dataIndex: 'conversionRate',
          key: 'conversionRate',
          editable: true,
        },
        { title: 'Clicks', dataIndex: 'clicks', key: 'clicks', editable: true },
      ]
    } else if (tableType === 'insights') {
      cols = [
        { title: 'Day', dataIndex: 'day', key: 'day', editable: true },
        { title: 'Value', dataIndex: 'value', key: 'value', editable: true },
        { title: 'Percentage', dataIndex: 'percentage', key: 'percentage', editable: true },
      ]
    }

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
        inputType:
          col.dataIndex === 'impressions' ||
          col.dataIndex === 'leads' ||
          col.dataIndex === 'ftds' ||
          col.dataIndex === 'clicks' ||
          col.dataIndex === 'value'
            ? 'number'
            : 'text',
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

  const modalTitle = tableType === 'affiliates' ? 'Edit Top 10 Affiliates' : 'Edit Insights'

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          {modalTitle}
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      width='90%'
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
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          pagination={false} // Or configure pagination as needed
          rowClassName='editable-row'
          style={{ background: '#2a2a2a', color: 'white' }}
          className='dark-table-modal' // Custom class for CSS
        />
      </Form>
    </Modal>
  )
}
