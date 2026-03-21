import React, { useRef } from 'react'
import { X, Printer, Download, RotateCcw } from 'lucide-react'
import { formatDate } from '../utils/calculateBill'

export default function Receipt({ order, onClose, onNewSale }) {
  const receiptRef = useRef(null)

  const handlePrint = () => window.print()

  const PAYMENT_LABELS = { cash: 'Cash', card: 'Card', upi: 'UPI' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-sm animate-slide-up" style={{ color: 'var(--color-text)' }}>
        
        {/* Actions */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Transaction Receipt</span>
          <div className="flex gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all hover:border-purple-dim"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)', background: 'var(--color-panel)' }}>
              <Printer size={12} /> Print
            </button>
            <button onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 hover:text-accent-red transition-all"
              style={{ color: 'var(--color-muted)', background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Receipt Paper */}
        <div ref={receiptRef} className="receipt-font text-xs rounded-xl overflow-hidden"
          style={{
            background: '#fafafa',
            color: '#1a1a1a',
            fontFamily: '"JetBrains Mono", monospace',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
          
          {/* Header */}
          <div className="px-5 pt-6 pb-4 text-center border-b-2 border-dashed" style={{ borderColor: '#ccc' }}>
            <div className="w-10 h-10 rounded-xl bg-purple-base flex items-center justify-center mx-auto mb-2">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h2 className="font-bold text-base tracking-widest uppercase text-gray-900">NexusPOS</h2>
            <p className="text-gray-500 text-xs mt-0.5">Omnichannel Retail</p>
            <p className="text-gray-400 text-xs mt-1">{formatDate(new Date(order.createdAt))}</p>
          </div>

          {/* Order ID */}
          <div className="px-5 py-3 text-center border-b-2 border-dashed" style={{ borderColor: '#ccc' }}>
            <p className="text-gray-400 text-xs">ORDER ID</p>
            <p className="font-bold text-sm text-gray-900 tracking-wider">{order.id}</p>
          </div>

          {/* Items */}
          <div className="px-5 py-3 border-b-2 border-dashed" style={{ borderColor: '#ccc' }}>
            <div className="flex justify-between text-gray-400 text-xs mb-2 uppercase tracking-wider">
              <span>Item</span>
              <span>Qty × Price</span>
            </div>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-start py-1 text-xs">
                <span className="text-gray-800 flex-1 pr-2 leading-tight">{item.name}</span>
                <span className="text-gray-600 shrink-0">
                  {item.quantity} × ₹{item.price} = <span className="font-bold text-gray-900">₹{(item.quantity * item.price).toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Bill Totals */}
          <div className="px-5 py-3 border-b-2 border-dashed space-y-1.5" style={{ borderColor: '#ccc' }}>
            <BillRow label="Subtotal" value={`₹${order.bill.subtotal.toFixed(2)}`} />
            {order.bill.discountAmount > 0 && (
              <BillRow label="Discount" value={`-₹${order.bill.discountAmount.toFixed(2)}`} />
            )}
            <BillRow label={`GST (${(order.bill.taxRate * 100).toFixed(0)}%)`} value={`₹${order.bill.taxAmount.toFixed(2)}`} />
            <div className="flex justify-between items-center pt-1.5 border-t" style={{ borderColor: '#bbb' }}>
              <span className="font-bold text-sm text-gray-900 uppercase tracking-wider">Total</span>
              <span className="font-bold text-base text-gray-900">₹{order.bill.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="px-5 py-3 border-b-2 border-dashed space-y-1" style={{ borderColor: '#ccc' }}>
            <BillRow label="Payment Method" value={PAYMENT_LABELS[order.paymentMethod] || order.paymentMethod} />
            {order.paymentMethod === 'cash' && (
              <>
                <BillRow label="Cash Given" value={`₹${(order.cashGiven || 0).toFixed(2)}`} />
                <BillRow label="Change" value={`₹${(order.change || 0).toFixed(2)}`} />
              </>
            )}
            <BillRow label="Status" value="PAID ✓" />
          </div>

          {/* Footer */}
          <div className="px-5 py-4 text-center">
            <p className="text-gray-400 text-xs">Thank you for shopping!</p>
            <p className="text-gray-300 text-xs mt-0.5">Powered by NexusPOS</p>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(30)].map((_, i) => (
                <div key={i} className={`w-0.5 bg-gray-300 rounded`} style={{ height: i % 3 === 0 ? 12 : 7 }} />
              ))}
            </div>
          </div>
        </div>

        {/* New Sale Button */}
        <button onClick={onNewSale}
          className="w-full mt-3 py-3 btn-primary rounded-xl flex items-center justify-center gap-2 font-display font-semibold text-sm">
          <RotateCcw size={15} />
          New Sale
        </button>
      </div>
    </div>
  )
}

function BillRow({ label, value }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  )
}
