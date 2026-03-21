import React, { useState } from 'react'
import { X, CreditCard, Banknote, Smartphone, CheckCircle, Loader2, ChevronRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { MOCK_ORDERS } from '../services/api'

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: Banknote, color: 'text-accent-green', bg: 'bg-accent-green/10' },
  { id: 'card', label: 'Card', icon: CreditCard, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' },
  { id: 'upi', label: 'UPI', icon: Smartphone, color: 'text-purple-bright', bg: 'bg-purple-bright/10' },
]

export default function PaymentModal({ onClose, onSuccess }) {
  const { items, paymentMethod, setPaymentMethod, getBill, clearCart } = useCartStore()
  const bill = getBill()
  const [cashGiven, setCashGiven] = useState('')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const cashChange = paymentMethod === 'cash'
    ? Math.max(0, parseFloat(cashGiven || 0) - bill.total)
    : 0

  const canPay = paymentMethod !== 'cash' || parseFloat(cashGiven || 0) >= bill.total

  const handlePay = async () => {
    if (!canPay) return
    setProcessing(true)

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))

    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      bill,
      paymentMethod,
      cashGiven: paymentMethod === 'cash' ? parseFloat(cashGiven) : null,
      change: paymentMethod === 'cash' ? cashChange : 0,
      createdAt: new Date().toISOString(),
      status: 'completed',
    }
    MOCK_ORDERS.unshift(newOrder)
    setOrderId(newOrder.id)
    setProcessing(false)
    setDone(true)

    setTimeout(() => {
      clearCart()
      onSuccess(newOrder)
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
      <div className="card w-full max-w-md animate-slide-up overflow-hidden"
        style={{ background: 'var(--color-surface)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}>
          <h2 className="font-display font-bold text-base" style={{ color: 'var(--color-text)' }}>
            Payment
          </h2>
          {!processing && !done && (
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 hover:text-accent-red transition-all"
              style={{ color: 'var(--color-muted)' }}>
              <X size={14} />
            </button>
          )}
        </div>

        {done ? (
          /* Success State */
          <div className="flex flex-col items-center py-10 gap-4 animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-accent-green/15 flex items-center justify-center">
              <CheckCircle size={36} className="text-accent-green" />
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                Payment Successful!
              </p>
              <p className="text-sm mt-1 font-mono" style={{ color: 'var(--color-muted)' }}>{orderId}</p>
            </div>
            <div className="text-2xl font-display font-bold text-purple-glow glow-text">
              ₹{bill.total.toFixed(2)}
            </div>
            {paymentMethod === 'cash' && cashChange > 0 && (
              <div className="px-4 py-2 rounded-lg text-sm font-medium text-accent-amber"
                style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                Return Change: ₹{cashChange.toFixed(2)}
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Amount */}
            <div className="card p-4 text-center" style={{ background: 'var(--color-panel)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--color-muted)' }}>Total Payable</p>
              <p className="font-display font-bold text-3xl text-purple-glow glow-text">₹{bill.total.toFixed(2)}</p>
              <p className="text-xs mt-1 font-mono" style={{ color: 'var(--color-muted)' }}>
                {bill.itemCount} item{bill.itemCount !== 1 ? 's' : ''} · GST ₹{bill.taxAmount.toFixed(2)}
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>SELECT METHOD</p>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map(({ id, label, icon: Icon, color, bg }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id)}
                    className={`flex flex-col items-center gap-2 py-3 rounded-xl border transition-all
                      ${paymentMethod === id
                        ? 'border-purple-base bg-purple-faint shadow-glow-sm'
                        : 'hover:border-purple-dim/40'}`}
                    style={paymentMethod !== id ? { borderColor: 'var(--color-border)', background: 'var(--color-panel)' } : {}}>
                    <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center`}>
                      <Icon size={16} />
                    </div>
                    <span className={`text-xs font-medium ${paymentMethod === id ? 'text-purple-bright' : ''}`}
                      style={paymentMethod !== id ? { color: 'var(--color-text)' } : {}}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cash Input */}
            {paymentMethod === 'cash' && (
              <div className="animate-slide-up">
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>CASH RECEIVED</p>
                <input
                  type="number"
                  value={cashGiven}
                  onChange={e => setCashGiven(e.target.value)}
                  placeholder={`Min ₹${bill.total.toFixed(2)}`}
                  className="input-field text-lg font-mono text-center"
                  autoFocus
                />
                {cashGiven && parseFloat(cashGiven) >= bill.total && (
                  <div className="flex justify-between items-center mt-2 px-1 animate-fade-in">
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>Change to return</span>
                    <span className="text-sm font-mono font-bold text-accent-green">₹{cashChange.toFixed(2)}</span>
                  </div>
                )}
                {/* Quick Cash Buttons */}
                <div className="flex gap-1.5 mt-2">
                  {[500, 1000, 2000].map(amt => (
                    <button key={amt} onClick={() => setCashGiven(String(amt))}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-all
                        ${parseFloat(cashGiven) === amt ? 'bg-purple-base text-white border-purple-base' : 'hover:border-purple-dim/40'}`}
                      style={parseFloat(cashGiven) !== amt ? { borderColor: 'var(--color-border)', color: 'var(--color-muted)', background: 'var(--color-panel)' } : {}}>
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* UPI QR Placeholder */}
            {paymentMethod === 'upi' && (
              <div className="animate-slide-up flex flex-col items-center gap-2 py-2">
                <div className="w-28 h-28 rounded-xl bg-white p-2 flex items-center justify-center">
                  <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5 opacity-70">
                    {[...Array(49)].map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : ''}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Scan QR to pay ₹{bill.total.toFixed(2)}</p>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={!canPay || processing}
              className={`w-full py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all
                ${canPay ? 'btn-primary' : 'opacity-40 cursor-not-allowed bg-purple-base text-white'}`}>
              {processing ? (
                <><Loader2 size={16} className="animate-spin" /> Processing...</>
              ) : (
                <>Confirm Payment <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
