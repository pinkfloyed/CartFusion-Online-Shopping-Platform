'use client'

import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const items = useCart(s => s.cartItems)
  const updateQty = useCart(s => s.updateQty)
  const removeFromCart = useCart(s => s.removeFromCart)
  const total = useCart(s => s.totalPrice)()
  const router = useRouter()

  if (!items.length)
    return <div className="text-center p-8">Your cart is empty</div>

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">No Image</div>
              )}
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => updateQty(item.id, Number(e.target.value))}
                className="w-16 p-1 border rounded text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 border rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold mb-4 md:mb-0">
          Total: ${(total / 100).toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
