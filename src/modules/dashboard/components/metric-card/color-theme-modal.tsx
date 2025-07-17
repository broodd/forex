/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Switch, Tooltip, Typography } from 'antd'
import { useState } from 'react'
import { THEME_PALETTES } from '~/lib/constants/theme-pallets'

const { Title, Text } = Typography

export const ColorThemeModal = ({
  visible,
  onCancel,
  onApplyTheme,
  currentMenuColor,
}: {
  visible: boolean
  onCancel: any
  onApplyTheme: any
  currentMenuColor: string
}) => {
  const [useWhiteMenu, setUseWhiteMenu] = useState(currentMenuColor === '#FFFFFF')
  const [form] = Form.useForm()

  const handleApply = (selectedTheme: any) => {
    // Determine the menu color based on the switch state
    const menuColor = useWhiteMenu ? '#FFFFFF' : '#212529'
    // Call the parent's onApplyTheme with both the selected theme and the chosen menu color
    onApplyTheme({ ...selectedTheme, menu: menuColor })
  }

  const onSwitchChange = (checked: any) => {
    setUseWhiteMenu(checked)
    // No need to re-apply theme here, it applies when a color palette is clicked.
    // If you want instant feedback for menu color, you'd call onApplyTheme here too,
    // but it might not be the desired UX (theme changes on palette click).
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ color: '#f3c75d', margin: 0 }}>
          Select Color Theme
        </Title>
      }
      visible={visible}
      onCancel={onCancel}
      width={700}
      footer={null} // No footer buttons, as applying is done by clicking a theme
      bodyStyle={{ background: '#2a2a2a', padding: 24 }}
      style={{ top: 50 }}
    >
      <Form
        form={form}
        layout='vertical'
        name='theme_settings_form'
        initialValues={{ menuWhite: useWhiteMenu }} // Initial value from state
      >
        <Form.Item
          name='menuWhite'
          label={<span style={{ color: 'var(--text-color-primary)' }}>Use White Menu Text</span>}
          valuePropName='checked'
          tooltip='Toggle to switch menu text color between white and dark.'
        >
          <Switch onChange={onSwitchChange} />
        </Form.Item>
      </Form>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {THEME_PALETTES.map((theme, index) => (
          <Tooltip key={index} title={theme.name}>
            <div
              onClick={() => handleApply(theme)}
              style={{
                backgroundColor: theme.brand,
                borderRadius: 8,
                padding: 16,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 120,
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <Text
                style={{
                  color: theme.menu,
                  fontWeight: 'bold',
                  fontSize: '1.1em',
                  marginBottom: 8,
                }}
              >
                {theme.name}
              </Text>
            </div>
          </Tooltip>
        ))}
      </div>
    </Modal>
  )
}
