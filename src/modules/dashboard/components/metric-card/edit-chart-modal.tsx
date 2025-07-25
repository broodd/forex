/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'

const { Title } = Typography

// --- Helper Functions for Data Transformation ---
const transformChartJSToRows = (chartjsData: any) => {
  const rows: { date: any }[] = []
  const { labels, datasets } = chartjsData

  if (!labels || !datasets || datasets.length === 0) return []

  // Map dataset labels (e.g., "Impressions 131") to simple keys (e.g., "impressions")
  const metricKeys = datasets.map((dataset: any) => {
    // This extracts the first word and converts to lowercase
    return dataset.label.split(' ')[0].toLowerCase()
  })

  labels.forEach((date: any, index: string | number) => {
    const row = { date }

    datasets.forEach((dataset: { data: { [x: string]: any } }, datasetIndex: string | number) => {
      const key = metricKeys[datasetIndex]
      ;(row as any)[key] = dataset.data[index]
    })
    // Add a unique key for Ant Design Table
    ;(row as any).key = `chart-row-${date}-${index}`
    rows.push(row)
  })
  return rows
}

const transformRowsToChartJS = (rows: any[], originalChartJsDatasets: any[]) => {
  if (!rows || rows.length === 0) {
    // Return empty chart data structure if no rows
    return {
      labels: [],
      datasets: originalChartJsDatasets.map((ds: any) => ({ ...ds, data: [] })),
    }
  }

  const labels = rows.map((row: { date: any }) => row.date)
  const newDatasets = originalChartJsDatasets.map((datasetTemplate: { label: string }) => {
    const metricKey = datasetTemplate.label.split(' ')[0].toLowerCase()
    const newData = rows.map((row: { [x: string]: any }) => row[metricKey] || 0) // Ensure value is number, default to 0 if undefined

    // Optional: Update the label with new total if it's dynamic
    // const newTotal = newData.reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
    // const newLabel = `${datasetTemplate.label.split(' ')[0]} ${newTotal}`;

    return {
      ...datasetTemplate,
      data: newData,
      // label: newLabel, // Uncomment if you want dynamic totals in labels
    }
  })

  return { labels, datasets: newDatasets }
}

const EditChartModal = ({
  visible,
  onCancel,
  onSave,
  initialChartData,
}: {
  visible: boolean
  onCancel: any
  onSave: any
  initialChartData: any
}) => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [editingKey, setEditingKey] = useState('')

  // When the modal becomes visible or initialChartData changes,
  // transform Chart.js data to row-based data for the table
  useEffect(() => {
    if (visible && initialChartData) {
      const rows = transformChartJSToRows(initialChartData)
      setDataSource(rows as any)
    }
  }, [visible, initialChartData])

  const isEditing = (record: { key: string }) => record.key === editingKey

  const edit = (record: {
    key: any
    date?: string
    impressions?: number
    leads?: number
    ftds?: number
  }) => {
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
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setDataSource(newData)
        setEditingKey('')
      } else {
        // This case should ideally be handled by handleAddRow
        // but included for completeness if a new row isn't immediately edited.
        newData.push({ ...row, key: `temp-key-${Math.random().toString(36).substr(2, 5)}` })
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
    const newKey = `new-chart-row-${Math.random().toString(36).substr(2, 9)}`
    const newRow = {
      key: newKey,
      date: `New Date ${dataSource.length + 1}`,
      impressions: 0,
      leads: 0,
      ftds: 0,
    }
    setDataSource([...dataSource, newRow] as any)
    edit(newRow) // Immediately put the new row into edit mode
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      editable: true,
      render: (text: any) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
      key: 'impressions',
      width: 120,
      editable: true,
      render: (text: any) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Leads',
      dataIndex: 'leads',
      key: 'leads',
      width: 120,
      editable: true,
      render: (text: any) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'FTDs',
      dataIndex: 'ftds',
      key: 'ftds',
      width: 120,
      editable: true,
      render: (text: any) => <span style={{ color: 'white' }}>{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
      render: (_: any, record: { key: any }) => {
        const editable = isEditing(record)
        return editable ? (
          <Space>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8, color: '#f3c75d' }}
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        // Determine input type based on dataIndex
        inputType: ['impressions', 'leads', 'ftds'].includes(col.dataIndex) ? 'number' : 'text',
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

  const handleSaveAllChanges = () => {
    // Transform the edited row data back to Chart.js format
    const newChartData = transformRowsToChartJS(dataSource, initialChartData.datasets)
    onSave(newChartData) // Pass the transformed data to the parent
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Edit Chart Data
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      width='90%' // Adjust width as needed
      footer={[
        <Button key='back' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={handleSaveAllChanges}
          style={{ backgroundColor: '#f3c75d', borderColor: '#f3c75d', color: '#1a1a1a' }}
        >
          Save All Changes
        </Button>,
      ]}
      styles={{ body: { background: '#2a2a2a', padding: 24 } }}
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
          pagination={false}
          rowClassName='editable-row'
          style={{ background: '#2a2a2a', color: 'white' }}
          className='dark-table-modal'
        />
      </Form>
    </Modal>
  )
}

export default EditChartModal
