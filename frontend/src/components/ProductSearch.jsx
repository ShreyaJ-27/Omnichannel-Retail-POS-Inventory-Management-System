import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Search, ScanLine, Plus, Package, AlertTriangle } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { MOCK_PRODUCTS } from '../services/api'

const CATEGORY_COLORS = {
  Grocery: 'bg-accent-green/10 text-accent-green',
  'Home Care': 'bg-accent-cyan/10 text-accent-cyan',
  Dairy: 'bg-accent-amber/10 text-accent-amber',
  Snacks: 'bg-purple-bright/10 text-purple-bright',
  Beverages: 'bg-accent-cyan/10 text-accent-cyan',
  'Personal Care': 'bg-pink-400/10 text-pink-400',
  Bakery: 'bg-orange-400/10 text-orange-400',
}

export default function ProductSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [barcodeMode, setBarcodeMode] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const searchRef = useRef(null)

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))]

  const doSearch = useCallback((q, cat) => {
    setLoading(true)
    setTimeout(() => {
      let res = MOCK_PRODUCTS
      if (q.trim()) {
        const lower = q.toLowerCase()
        res = res.filter(p =>
          p.name.toLowerCase().includes(lower) ||
          p.sku.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
        )
      }
      if (cat !== 'All') res = res.filter(p => p.category === cat)
      setResults(res)
      setLoading(false)
    }, 100)
  }, [])

  useEffect(() => {
    doSearch(query, selectedCategory)
  }, [query, selectedCategory, doSearch])

  // Keyboard shortcut: F2 to focus search
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'F2') { e.preventDefault(); searchRef.current?.focus() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleAdd = (product) => {
    addItem(product)
    // Flash feedback is handled in cart
  }

  const handleBarcodeScan = (e) => {
    if (e.key === 'Enter' && barcodeMode && query) {
      const found = MOCK_PRODUCTS.find(p => p.sku.toLowerCase() === query.toLowerCase())
      if (found) { addItem(found); setQuery('') }
      else alert(`SKU "${query}" not found`)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleBarcodeScan}
              placeholder={barcodeMode ? "Scan barcode / Enter SKU..." : "Search product name, SKU... (F2)"}
              className="input-field pl-9 pr-4 text-sm h-9"
              autoFocus
            />
          </div>
          <button
            onClick={() => setBarcodeMode(b => !b)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all
              ${barcodeMode
                ? 'bg-purple-base border-purple-base text-white shadow-glow-sm'
                : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-purple-dim hover:text-[var(--color-text)]'
              }`}>
            <ScanLine size={13} />
            Scan
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all
                ${selectedCategory === cat
                  ? 'bg-purple-base text-white'
                  : 'border text-[var(--color-muted)] hover:text-[var(--color-text)]'
                }`}
              style={selectedCategory !== cat ? { borderColor: 'var(--color-border)', background: 'var(--color-panel)' } : {}}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card p-3 h-20 animate-pulse opacity-40" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3" style={{ color: 'var(--color-muted)' }}>
            <Package size={32} className="opacity-40" />
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 animate-fade-in">
            {results.map(product => (
              <ProductCard key={product._id} product={product} onAdd={handleAdd} />
            ))}
          </div>
        )}
      </div>

      {/* Footer count */}
      <div className="px-4 py-2 border-t text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
        {results.length} products · Press F2 to search
      </div>
    </div>
  )
}

function ProductCard({ product, onAdd }) {
  const [added, setAdded] = useState(false)
  const catColor = CATEGORY_COLORS[product.category] || 'bg-gray-500/10 text-gray-400'
  const lowStock = product.stock < 10

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 600)
  }

  return (
    <button
      onClick={handleAdd}
      className={`card p-3 text-left flex flex-col gap-2 cursor-pointer transition-all duration-150 active:scale-95 group
        ${added ? 'border-purple-base shadow-glow-sm' : 'hover:border-purple-dim/50'}`}>
      
      <div className="flex items-start justify-between gap-1">
        <p className="text-xs font-medium leading-tight line-clamp-2 flex-1" style={{ color: 'var(--color-text)' }}>
          {product.name}
        </p>
        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-all
          ${added ? 'bg-purple-base text-white' : 'bg-purple-faint text-purple-glow group-hover:bg-purple-base group-hover:text-white'}`}>
          <Plus size={12} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-display font-bold text-sm" style={{ color: 'var(--color-text)' }}>
          ₹{product.price}
        </span>
        <span className={`tag ${catColor}`}>{product.category}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>{product.sku}</span>
        {lowStock && (
          <span className="flex items-center gap-1 text-accent-amber text-xs">
            <AlertTriangle size={10} />
            {product.stock} left
          </span>
        )}
      </div>
    </button>
  )
}
