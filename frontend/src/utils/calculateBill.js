export const calculateBill = (items, discount = 0, discountType = 'flat', taxRate = 0.18) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  let discountAmount = 0
  if (discountType === 'percent') {
    discountAmount = (subtotal * Math.min(discount, 100)) / 100
  } else {
    discountAmount = Math.min(discount, subtotal)
  }

  const taxableAmount = subtotal - discountAmount
  const taxAmount = taxableAmount * taxRate
  const total = taxableAmount + taxAmount

  return {
    subtotal: round(subtotal),
    discountAmount: round(discountAmount),
    taxAmount: round(taxAmount),
    taxRate,
    total: round(total),
    itemCount: items.reduce((s, i) => s + i.quantity, 0),
  }
}

const round = (n) => Math.round(n * 100) / 100

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium', timeStyle: 'short'
  }).format(date || new Date())
