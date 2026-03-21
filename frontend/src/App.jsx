import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import POS from './pages/POS'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import { useThemeStore } from './store/themeStore'

export default function App() {
  const init = useThemeStore(s => s.init)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    init()
    const onOnline  = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [init])

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navbar online={online} />
      <Routes>
        <Route path="/" element={<POS />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-panel)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
          },
          success: { iconTheme: { primary: '#4ade80', secondary: '#14141f' } },
          error:   { iconTheme: { primary: '#f87171', secondary: '#14141f' } },
        }}
      />
    </div>
  )
}
