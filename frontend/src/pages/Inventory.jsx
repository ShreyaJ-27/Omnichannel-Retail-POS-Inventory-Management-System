import React, { useState } from 'react'
import { Package, AlertTriangle, TrendingDown, Search, ArrowUpDown } from 'lucide-react'
import { MOCK_PRODUCTS } from '../services/api'
import { useCartStore } from '../store/cartStore'

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const addItem = useCartStore(s => s.addItem)

  const filtered = MOCK_PRODUCTS
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'stock') return a.stock - b.stock
      return 0
    })

  const lowStockCount = MOCK_PRODUCTS.filter(p => p.stock < 10).length
  const outOfStock = MOCK_PRODUCTS.filter(p => p.stock === 0).length

  return (
    <div className="h-[calc(100vh-56px)] overflow-y-auto page-enter">
      <div className="max-w-5xl mx-auto px-5 py-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>Inventory</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Stock levels across all products</p>
          </div>
          <div className="flex gap-2">
            {lowStockCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-accent-amber"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <AlertTriangle size={12} />
                {lowStockCount} Low Stock
              </div>
            )}
            {outOfStock > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-accent-red"
                style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}>
                <TrendingDown size={12} />
                {outOfStock} Out of Stock
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..." className="input-field pl-9 text-sm" />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className="input-field w-36 text-sm cursor-pointer">
            <option value="name">Sort: Name</option>
            <option value="price">Sort: Price</option>
            <option value="stock">Sort: Stock</option>
          </select>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--color-border)', background: 'var(--color-panel)' }}>
                {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--color-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const stockStatus = product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'ok'
                return (
                  <tr key={product._id}
                    className="border-b transition-colors hover:bg-purple-faint/20"
                    style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text)' }}>{product.name}</td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-muted)' }}>{product.sku}</td>
                    <td className="px-4 py-3">
                      <span className="tag bg-purple-faint text-purple-bright">{product.category}</span>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold" style={{ color: 'var(--color-text)' }}>₹{product.price}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                          <div className={`h-full rounded-full transition-all ${stockStatus === 'out' ? 'bg-accent-red' : stockStatus === 'low' ? 'bg-accent-amber' : 'bg-accent-green'}`}
                            style={{ width: `${Math.min(100, (product.stock / 200) * 100)}%` }} />
                        </div>
                        <span className={`text-xs font-mono font-bold ${stockStatus === 'out' ? 'text-accent-red' : stockStatus === 'low' ? 'text-accent-amber' : 'text-accent-green'}`}>
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => addItem(product)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:shadow-glow-sm"
                        style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                        onMouseEnter={e => e.target.style.borderColor = '#7c3aed'}
                        onMouseLeave={e => e.target.style.borderColor = 'var(--color-border)'}>
                        + Add to Cart
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-muted)' }}>
          {filtered.length} of {MOCK_PRODUCTS.length} products shown
        </p>
      </div>
    </div>
  )
}
