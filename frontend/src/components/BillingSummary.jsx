import React from 'react'
import { Receipt, ChevronRight, Trash2 } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { calculateBill, formatCurrency } from '../utils/calculateBill'

export default function BillingSummary({ onCheckout }) {
  const { items, discount, discountType, taxRate, clearCart } = useCartStore()
  const bill = calculateBill(items, discount, discountType, taxRate)
  const hasItems = items.length > 0

  return (
    <div
      className="rounded-2xl p-4 space-y-3"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-bright)',
      }}
    >
      {/* Title */}
      <div className="flex items-center gap-2 mb-1">
        <Receipt size={15} style={{ color: 'var(--accent)' }} />
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          Bill Summary
        </span>
      </div>

      {/* Line items */}
      <div className="space-y-2 text-sm">
        <Row label="Subtotal" value={bill.subtotal} />
        {bill.discountAmount > 0 && (
          <Row
            label={`Discount ${discountType === 'percent' ? `(${discount}%)` : ''}`}
            value={-bill.discountAmount}
            valueStyle={{ color: 'var(--success)' }}
          />
        )}
        <Row
          label={`GST (${(taxRate * 100).toFixed(0)}%)`}
          value={bill.taxAmount}
          valueStyle={{ color: 'var(--warning)' }}
        />
        <div
          className="border-t pt-3 mt-1"
          style={{ borderColor: 'var(--border-bright)' }}
        />
        <div className="flex justify-between items-center">
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>
            Total
          </span>
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: '1.3rem',
              color: 'var(--accent-light)',
            }}
          >
            {formatCurrency(bill.total)}
          </span>
        </div>
        {hasItems && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif' }}>
            {bill.itemCount} item{bill.itemCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        {hasItems && (
          <button
            onClick={clearCart}
            className="btn-ghost flex-shrink-0"
            style={{ padding: '0.5rem' }}
            title="Clear cart"
          >
            <Trash2 size={15} style={{ color: 'var(--danger)' }} />
          </button>
        )}
        <button
          disabled={!hasItems}
          onClick={onCheckout}
          className="btn-primary flex-1 justify-center"
          style={{
            opacity: hasItems ? 1 : 0.4,
            cursor: hasItems ? 'pointer' : 'not-allowed',
            fontSize: '0.9rem',
            padding: '0.65rem',
          }}
        >
          Proceed to Pay
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

function Row({ label, value, valueStyle = {} }) {
  return (
    <div className="flex justify-between items-center">
      <span style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>{label}</span>
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 500,
          color: 'var(--text-primary)',
          ...valueStyle,
        }}
      >
        {value < 0 ? `−${formatCurrency(Math.abs(value))}` : formatCurrency(value)}
      </span>
    </div>
  )
}
