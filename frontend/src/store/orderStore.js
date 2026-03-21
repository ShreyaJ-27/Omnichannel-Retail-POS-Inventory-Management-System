import { create } from 'zustand'

export const useOrderStore = create((set, get) => ({
  orders: [],
  addOrder: (order) => set({ orders: [order, ...get().orders] }),
  setOrders: (orders) => set({ orders }),
}))
