import React, { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingCart, Tag, Percent, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { formatCurrency } from '../utils/calculateBill'

export default function Cart({ onCheckout }) {
  const {
    items, discount, discountType,
    updateQuantity, removeItem, setDiscount, getBill, clearCart
  } = useCartStore()
  const [discountInput, setDiscountInput] = useState('')
  const [discType, setDiscType] = useState('flat')
  const bill = getBill()

  const applyDiscount = () => {
    const val = parseFloat(discountInput)
    if (!isNaN(val) && val >= 0) {
      setDiscount(val, discType)
    }
  }

  const removeDiscount = () => {
    setDiscount(0, 'flat')
    setDiscountInput('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Cart Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-2">
          <ShoppingCart size={15} className="text-purple-glow" />
          <span className="font-display font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
            Cart
          </span>
          {items.length > 0 && (
            <span className="bg-purple-base text-white text-xs px-1.5 py-0.5 rounded-full font-mono">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button onClick={clearCart}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors hover:bg-red-500/10 hover:text-accent-red"
            style={{ color: 'var(--color-muted)' }}>
            <X size={12} />Clear
          </button>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
            <div className="w-16 h-16 rounded-2xl bg-purple-faint flex items-center justify-center">
              <ShoppingCart size={28} className="text-purple-dim opacity-60" />
            </div>
            <p className="text-sm font-medium" style={{ color: 'var(--color-muted)' }}>Cart is empty</p>
            <p className="text-xs text-center max-w-32" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
              Search and click products to add
            </p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {items.map(item => (
              <CartItem key={item._id} item={item}
                onUpdate={updateQuantity} onRemove={removeItem} />
            ))}
          </div>
        )}
      </div>

      {/* Discount Section */}
      {items.length > 0 && (
        <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex gap-1.5">
            {/* Type Toggle */}
            <div className="flex rounded-lg overflow-hidden border text-xs"
              style={{ borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setDiscType('flat')}
                className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors
                  ${discType === 'flat' ? 'bg-purple-base text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
                style={discType !== 'flat' ? { background: 'var(--color-panel)' } : {}}>
                <Tag size={10} /> ₹
              </button>
              <button
                onClick={() => setDiscType('percent')}
                className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors
                  ${discType === 'percent' ? 'bg-purple-base text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'}`}
                style={discType !== 'percent' ? { background: 'var(--color-panel)' } : {}}>
                <Percent size={10} /> %
              </button>
            </div>
            <input
              type="number"
              min="0"
              value={discountInput}
              onChange={e => setDiscountInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && applyDiscount()}
              placeholder={discType === 'flat' ? 'Amount off' : 'Percent off'}
              className="input-field flex-1 text-xs h-8"
            />
            <button onClick={applyDiscount} className="btn-primary text-xs px-3 h-8 rounded-lg">
              Apply
            </button>
            {discount > 0 && (
              <button onClick={removeDiscount}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-red hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all">
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bill Summary */}
      {items.length > 0 && (
        <BillSummary bill={bill} onCheckout={onCheckout} />
      )}
    </div>
  )
}

function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="card p-2.5 flex items-center gap-3 animate-slide-up">
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text)' }}>{item.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>₹{item.price}</span>
          <span className="text-xs" style={{ color: 'var(--color-muted)', opacity: 0.5 }}>×</span>
          <span className="text-xs text-purple-bright font-mono font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>

      {/* Qty Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdate(item._id, item.quantity - 1)}
          className="w-6 h-6 rounded-md flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-accent-red border"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
          <Minus size={10} />
        </button>
        <span className="w-7 text-center text-xs font-mono font-bold" style={{ color: 'var(--color-text)' }}>
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdate(item._id, item.quantity + 1)}
          className="w-6 h-6 rounded-md flex items-center justify-center transition-all hover:bg-purple-faint hover:text-purple-bright border"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
          <Plus size={10} />
        </button>
        <button
          onClick={() => onRemove(item._id)}
          className="w-6 h-6 rounded-md flex items-center justify-center ml-1 hover:bg-red-500/10 hover:text-accent-red transition-all"
          style={{ color: 'var(--color-muted)' }}>
          <Trash2 size={10} />
        </button>
      </div>
    </div>
  )
}

function BillSummary({ bill, onCheckout }) {
  return (
    <div className="px-4 pb-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="space-y-1.5 mb-3">
        <Row label="Subtotal" value={`₹${bill.subtotal.toFixed(2)}`} />
        {bill.discountAmount > 0 && (
          <Row label="Discount" value={`-₹${bill.discountAmount.toFixed(2)}`} accent="text-accent-green" />
        )}
        <Row label={`GST (${(bill.taxRate * 100).toFixed(0)}%)`} value={`₹${bill.taxAmount.toFixed(2)}`} muted />
        <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-sm" style={{ color: 'var(--color-text)' }}>Total</span>
            <span className="font-display font-bold text-lg text-purple-glow glow-text">₹{bill.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button onClick={onCheckout}
        className="w-full btn-primary py-3 text-sm font-display font-semibold rounded-xl">
        Proceed to Payment →
      </button>
    </div>
  )
}

function Row({ label, value, accent, muted }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span style={{ color: 'var(--color-muted)' }}>{label}</span>
      <span className={accent || (muted ? '' : '')} style={!accent ? { color: 'var(--color-text)' } : {}}>
        {value}
      </span>
    </div>
  )
}
