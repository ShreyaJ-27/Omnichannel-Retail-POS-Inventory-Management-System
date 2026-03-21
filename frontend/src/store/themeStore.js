import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: 'dark',
  toggle: () => set(s => {
    const next = s.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('light', next === 'light')
    return { theme: next }
  }),
  init: () => {
    const saved = localStorage.getItem('pos-theme') || 'dark'
    document.documentElement.classList.toggle('light', saved === 'light')
    set({ theme: saved })
  }
}))
