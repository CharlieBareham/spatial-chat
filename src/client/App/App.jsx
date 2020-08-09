import React from 'react'
import AppContent from '../AppContent'
import AppStateProvider from './AppStateProvider'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'

const App = () => {
  const { Header, Footer, Content } = Layout

  return (
    <AppStateProvider>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>Chat box</Menu.Item>
            <Menu.Item>nav 2</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <AppContent />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Charlie Bareham</Footer>
      </Layout>
    </AppStateProvider>
  )
}

export default App
