import { create } from 'zustand'
import { calculateBill } from '../utils/calculateBill'

export const useCartStore = create((set, get) => ({
  items: [],
  discount: 0,
  discountType: 'flat', // 'flat' | 'percent'
  taxRate: 0.18,
  customerId: null,
  customerName: '',
  paymentMethod: 'cash',

  addItem: (product) => {
    const items = get().items
    const existing = items.find(i => i._id === product._id)
    if (existing) {
      set({
        items: items.map(i =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),

  updateQuantity: (id, qty) => {
    if (qty <= 0) { get().removeItem(id); return }
    set({ items: get().items.map(i => i._id === id ? { ...i, quantity: qty } : i) })
  },

  setDiscount: (value, type) => set({ discount: value, discountType: type }),

  setTaxRate: (rate) => set({ taxRate: rate }),

  setCustomer: (id, name) => set({ customerId: id, customerName: name }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  clearCart: () => set({
    items: [], discount: 0, discountType: 'flat',
    customerId: null, customerName: '', paymentMethod: 'cash'
  }),

  getBill: () => {
    const { items, discount, discountType, taxRate } = get()
    return calculateBill(items, discount, discountType, taxRate)
  },

  itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
}))
