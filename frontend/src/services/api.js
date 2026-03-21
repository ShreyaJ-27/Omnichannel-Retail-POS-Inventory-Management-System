import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Auth token injection
api.interceptors.request.use(config => {
  const token = localStorage.getItem('pos-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Products ──────────────────────────────
export const searchProducts = (query) =>
  api.get(`/products?search=${encodeURIComponent(query)}&limit=20`)

export const getProductBySKU = (sku) =>
  api.get(`/products/sku/${sku}`)

export const getProducts = (params) =>
  api.get('/products', { params })

// ── Orders ────────────────────────────────
export const createOrder = (payload) =>
  api.post('/orders', payload)

export const getOrders = (params) =>
  api.get('/orders', { params })

export const getOrderById = (id) =>
  api.get(`/orders/${id}`)

// ── Mock data for offline / dev mode ──────
export const MOCK_PRODUCTS = [
  { _id: 'p1', name: 'Basmati Rice 5kg', sku: 'GRC-001', price: 450, category: 'Grocery', stock: 120, unit: 'bag' },
  { _id: 'p2', name: 'Tata Salt 1kg', sku: 'GRC-002', price: 24, category: 'Grocery', stock: 300, unit: 'pack' },
  { _id: 'p3', name: 'Surf Excel 1kg', sku: 'HOM-001', price: 195, category: 'Home Care', stock: 85, unit: 'pack' },
  { _id: 'p4', name: 'Amul Milk 1L', sku: 'DAI-001', price: 68, category: 'Dairy', stock: 60, unit: 'litre' },
  { _id: 'p5', name: 'Lay\'s Classic 78g', sku: 'SNK-001', price: 20, category: 'Snacks', stock: 200, unit: 'pack' },
  { _id: 'p6', name: 'Colgate 300g', sku: 'PER-001', price: 115, category: 'Personal Care', stock: 140, unit: 'tube' },
  { _id: 'p7', name: 'Ariel Liquid 1L', sku: 'HOM-002', price: 310, category: 'Home Care', stock: 45, unit: 'bottle' },
  { _id: 'p8', name: 'Maggi Noodles 70g', sku: 'SNK-002', price: 14, category: 'Snacks', stock: 500, unit: 'pack' },
  { _id: 'p9', name: 'Dettol Soap 75g', sku: 'PER-002', price: 45, category: 'Personal Care', stock: 220, unit: 'bar' },
  { _id: 'p10', name: 'Sunflower Oil 1L', sku: 'GRC-003', price: 180, category: 'Grocery', stock: 90, unit: 'bottle' },
  { _id: 'p11', name: 'Bisleri 1L', sku: 'BEV-001', price: 20, category: 'Beverages', stock: 400, unit: 'bottle' },
  { _id: 'p12', name: 'Red Label Tea 500g', sku: 'BEV-002', price: 290, category: 'Beverages', stock: 75, unit: 'pack' },
  { _id: 'p13', name: 'Britannia Bread', sku: 'BAK-001', price: 55, category: 'Bakery', stock: 30, unit: 'loaf' },
  { _id: 'p14', name: 'Lays Cream&Onion 78g', sku: 'SNK-003', price: 20, category: 'Snacks', stock: 180, unit: 'pack' },
  { _id: 'p15', name: 'Pantene Shampoo 340ml', sku: 'PER-003', price: 349, category: 'Personal Care', stock: 55, unit: 'bottle' },
  { _id: 'p16', name: 'Haldiram Bhujia 400g', sku: 'SNK-004', price: 110, category: 'Snacks', stock: 95, unit: 'pack' },
]

export const MOCK_ORDERS = []

export default api
