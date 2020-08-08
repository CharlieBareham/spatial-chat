import React from 'react'
import AppContent from '../AppContent'
import AppStateProvider from './AppStateProvider'

const App = () => {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  )
}

export default App
