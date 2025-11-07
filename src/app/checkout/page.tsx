'use client'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CheckoutPage() {
  const items = useCart(s => s.cartItems)
  const total = useCart(s => s.totalPrice)()
  const clearCart = useCart(s => s.clearCart)
  const [form, setForm] = useState({ address: '', phone: '' })
  const router = useRouter()

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: form.address, phone: form.phone, items, total })
    })
    if (res.ok) {
      clearCart()
      router.push('/success')
    } else {
      alert('Order failed')
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-4">Checkout (Cash on Delivery)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" required/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" required/>
        <div className="text-right font-semibold">Total: ${(total/100).toFixed(2)}</div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Place Order (COD)</button>
      </form>
    </div>
  )
}
