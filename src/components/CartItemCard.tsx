'use client'
import { useCart } from '@/hooks/useCart'

type Props = {
  item: {
    id: string
    name: string
    price: number
    image?: string
    quantity: number
  }
}

export default function CartItemCard({ item }: Props) {
  const updateQty = useCart(s => s.updateQty)
  const removeFromCart = useCart(s => s.removeFromCart)

  return (
    <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
      {item.image && (
        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm text-gray-600">${(item.price / 100).toFixed(2)}</div>
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => updateQty(item.id, Number(e.target.value))}
          className="w-20 p-1 mt-1 border rounded"
        />
      </div>
      <button
        className="px-3 py-1 border rounded text-red-600"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  )
}
