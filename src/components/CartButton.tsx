'use client'
import Link from 'next/link'
import { useCartStore } from '../stores/cartStore'

export default function CartButton() {
  const items = useCartStore(s => s.items)
  const count = items.reduce((s, i) => s + i.quantity, 0)
  return (
    <Link href="/cart" className="relative inline-block">
      <span>Cart</span>
      {count > 0 && <span className="absolute -top-2 -right-4 bg-red-600 text-white rounded-full px-2 text-xs">{count}</span>}
    </Link>
  )
}
