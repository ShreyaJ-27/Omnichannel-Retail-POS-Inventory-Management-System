import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, BarChart2, Package, Sun, Moon, Zap, Wifi, WifiOff } from 'lucide-react'
import { useThemeStore } from '../store/themeStore'
import { useCartStore } from '../store/cartStore'

export default function Navbar({ online }) {
  const { theme, toggle } = useThemeStore()
  const itemCount = useCartStore(s => s.itemCount())
  const location = useLocation()

  const nav = [
    { path: '/', icon: ShoppingCart, label: 'POS' },
    { path: '/orders', icon: BarChart2, label: 'Orders' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
  ]

  return (
    <header className="h-14 flex items-center justify-between px-5 border-b"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-purple-base flex items-center justify-center shadow-glow-sm">
          <Zap size={15} className="text-white" />
        </div>
        <span className="font-display font-bold text-base tracking-tight" style={{ color: 'var(--color-text)' }}>
          Nexus<span className="text-purple-glow">POS</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-1">
        {nav.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path
          return (
            <Link key={path} to={path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                ${active
                  ? 'bg-purple-faint text-purple-bright border border-purple-dim/40'
                  : 'hover:bg-purple-faint/50 text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}>
              <Icon size={14} />
              {label}
              {label === 'POS' && itemCount > 0 && (
                <span className="bg-purple-base text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Online Status */}
        <div className={`flex items-center gap-1.5 text-xs font-mono ${online ? 'text-accent-green' : 'text-accent-amber'}`}>
          {online ? <Wifi size={12} /> : <WifiOff size={12} />}
          <span>{online ? 'Online' : 'Offline'}</span>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggle}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-purple-faint border border-transparent hover:border-purple-dim/30"
          style={{ color: 'var(--color-muted)' }}>
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Cashier Tag */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
          <div className="w-5 h-5 rounded-full bg-purple-base flex items-center justify-center text-white text-xs font-bold">C</div>
          <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Cashier</span>
        </div>
      </div>
    </header>
  )
}
