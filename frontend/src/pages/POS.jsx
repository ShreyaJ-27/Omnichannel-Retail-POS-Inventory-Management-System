import React, { useState } from 'react'
import ProductSearch from '../components/ProductSearch'
import Cart from '../components/Cart'
import PaymentModal from '../components/PaymentModal'
import Receipt from '../components/Receipt'

export default function POS() {
  const [modal, setModal] = useState(null) // null | 'payment' | 'receipt'
  const [lastOrder, setLastOrder] = useState(null)

  const handlePaymentSuccess = (order) => {
    setLastOrder(order)
    setModal('receipt')
  }

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden page-enter">
      {/* Left: Product Search */}
      <div className="flex-1 min-w-0 border-r overflow-hidden flex flex-col"
        style={{ borderColor: 'var(--color-border)' }}>
        <ProductSearch />
      </div>

      {/* Right: Cart + Billing */}
      <div className="w-80 xl:w-96 shrink-0 flex flex-col overflow-hidden"
        style={{ background: 'var(--color-surface)' }}>
        <Cart onCheckout={() => setModal('payment')} />
      </div>

      {/* Payment Modal */}
      {modal === 'payment' && (
        <PaymentModal
          onClose={() => setModal(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Receipt Modal */}
      {modal === 'receipt' && lastOrder && (
        <Receipt
          order={lastOrder}
          onClose={() => setModal(null)}
          onNewSale={() => setModal(null)}
        />
      )}
    </div>
  )
}
