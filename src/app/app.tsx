import '@ant-design/v5-patch-for-react-19'
import { App as AntdApp, ConfigProvider } from 'antd'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ClientProvider } from '~/shared/providers/client/client-provider'
import ReactQueryProvider from '~/shared/providers/react-query/react-query-provider'
import AntdStaticFunctions from '~/shared/utils/antd-static-functions'
import { form, router, theme } from './config'
import './styles/index.scss'

export const App = () => {
  return (
    <ReactQueryProvider>
      <ConfigProvider theme={theme} form={form}>
        <AntdApp>
          <AntdStaticFunctions />
          <Suspense>
            <ClientProvider>
              <RouterProvider router={router} />
            </ClientProvider>
          </Suspense>
        </AntdApp>
      </ConfigProvider>
    </ReactQueryProvider>
  )
}
