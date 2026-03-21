import React, { useState } from 'react'
import { Search, ShoppingBag, Clock, CreditCard, Banknote, Smartphone, Eye, ChevronDown, TrendingUp, DollarSign, Package } from 'lucide-react'
import { MOCK_ORDERS } from '../services/api'
import { formatDate } from '../utils/calculateBill'

const METHOD_ICON = { cash: Banknote, card: CreditCard, upi: Smartphone }
const METHOD_COLOR = { cash: 'text-accent-green', card: 'text-accent-cyan', upi: 'text-purple-bright' }

export default function Orders() {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [orders, setOrders] = useState(() => MOCK_ORDERS)

  // Refresh every time we visit (since MOCK_ORDERS mutates)
  const filtered = orders.filter(o =>
    !search || o.id.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = orders.reduce((s, o) => s + o.bill.total, 0)
  const totalItems = orders.reduce((s, o) => s + o.bill.itemCount, 0)
  const avgOrder = orders.length ? totalRevenue / orders.length : 0

  // Poll for new orders
  React.useEffect(() => {
    const t = setInterval(() => setOrders([...MOCK_ORDERS]), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="h-[calc(100vh-56px)] overflow-y-auto page-enter">
      <div className="max-w-4xl mx-auto px-5 py-6">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>Order History</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>All transactions from current session</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard icon={ShoppingBag} label="Total Orders" value={orders.length} color="text-purple-bright" bg="bg-purple-bright/10" />
          <StatCard icon={DollarSign} label="Revenue" value={`₹${totalRevenue.toFixed(0)}`} color="text-accent-green" bg="bg-accent-green/10" />
          <StatCard icon={TrendingUp} label="Avg Order" value={`₹${avgOrder.toFixed(0)}`} color="text-accent-cyan" bg="bg-accent-cyan/10" />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by Order ID..."
            className="input-field pl-9 text-sm"
          />
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="card flex flex-col items-center py-16 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-purple-faint flex items-center justify-center">
              <ShoppingBag size={28} className="text-purple-dim opacity-50" />
            </div>
            <p className="font-medium" style={{ color: 'var(--color-muted)' }}>
              {orders.length === 0 ? 'No orders yet' : 'No matching orders'}
            </p>
            <p className="text-sm text-center" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>
              Complete a transaction on the POS screen to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(order => (
              <OrderRow
                key={order.id}
                order={order}
                expanded={expanded === order.id}
                onToggle={() => setExpanded(expanded === order.id ? null : order.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrderRow({ order, expanded, onToggle }) {
  const Icon = METHOD_ICON[order.paymentMethod] || CreditCard
  const color = METHOD_COLOR[order.paymentMethod] || 'text-purple-glow'

  return (
    <div className={`card overflow-hidden transition-all ${expanded ? 'border-purple-dim/40' : ''}`}>
      <button onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-purple-faint/30 transition-colors">
        {/* Status dot */}
        <div className="w-2 h-2 rounded-full bg-accent-green shrink-0 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
        
        {/* Order info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-mono font-medium" style={{ color: 'var(--color-text)' }}>{order.id}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
            <Clock size={10} className="inline mr-1" />{formatDate(new Date(order.createdAt))}
          </p>
        </div>

        {/* Items count */}
        <div className="text-center hidden sm:block">
          <p className="text-xs font-mono font-bold" style={{ color: 'var(--color-text)' }}>{order.bill.itemCount}</p>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>items</p>
        </div>

        {/* Payment Method */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium`}
          style={{ background: 'var(--color-panel)' }}>
          <Icon size={12} className={color} />
          <span className="capitalize" style={{ color: 'var(--color-text)' }}>{order.paymentMethod}</span>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="font-display font-bold text-sm text-purple-glow">₹{order.bill.total.toFixed(2)}</p>
        </div>

        <ChevronDown size={14} className={`transition-transform shrink-0 ${expanded ? 'rotate-180 text-purple-glow' : ''}`}
          style={!expanded ? { color: 'var(--color-muted)' } : {}} />
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t px-4 pb-4 animate-slide-up" style={{ borderColor: 'var(--color-border)' }}>
          <div className="pt-3 space-y-1.5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span style={{ color: 'var(--color-text)' }}>{item.name}</span>
                <span className="font-mono" style={{ color: 'var(--color-muted)' }}>
                  {item.quantity} × ₹{item.price} =
                  <span className="text-purple-bright font-medium ml-1">₹{(item.quantity * item.price).toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t flex flex-wrap gap-x-6 gap-y-1.5 text-xs"
            style={{ borderColor: 'var(--color-border)' }}>
            <span style={{ color: 'var(--color-muted)' }}>Subtotal: <span style={{ color: 'var(--color-text)' }}>₹{order.bill.subtotal.toFixed(2)}</span></span>
            {order.bill.discountAmount > 0 && (
              <span style={{ color: 'var(--color-muted)' }}>Discount: <span className="text-accent-green">-₹{order.bill.discountAmount.toFixed(2)}</span></span>
            )}
            <span style={{ color: 'var(--color-muted)' }}>Tax: <span style={{ color: 'var(--color-text)' }}>₹{order.bill.taxAmount.toFixed(2)}</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon size={17} className={color} />
      </div>
      <div>
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{label}</p>
        <p className="font-display font-bold text-sm mt-0.5" style={{ color: 'var(--color-text)' }}>{value}</p>
      </div>
    </div>
  )
}
