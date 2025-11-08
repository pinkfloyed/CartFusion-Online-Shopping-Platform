'use client'

import { useCart } from '@/hooks/useCart'
import { useSession } from 'next-auth/react'

export default function AddToCartButton({ product }: any) {
  const { data: session } = useSession()
  const addToCart = useCart(s => s.addToCart)

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    alert(`${product.name} added to cart`)
  }

  if (session?.user?.role === 'admin') return null

  return (
    <button
      onClick={handleAdd}
      className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
    >
      Add to Cart
    </button>
  )
}
