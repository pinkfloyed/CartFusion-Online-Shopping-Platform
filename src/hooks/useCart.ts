import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = { id: string; name: string; price: number; image?: string; quantity: number }

type CartState = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalPrice: () => number
  totalItems: () => number
}

export const useCart = create<CartState>()(persist((set, get) => ({
  cartItems: [],
  addToCart: (item) => {
    const existing = get().cartItems.find(i => i.id === item.id)
    if (existing) {
      set({ cartItems: get().cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i) })
    } else {
      set({ cartItems: [...get().cartItems, item] })
    }
  },
  removeFromCart: (id) => set({ cartItems: get().cartItems.filter(i => i.id !== id) }),
  updateQty: (id, qty) => set({ cartItems: get().cartItems.map(i => i.id === id ? { ...i, quantity: qty } : i).filter(i => i.quantity > 0) }),
  clearCart: () => set({ cartItems: [] }),
  totalPrice: () => get().cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
  totalItems: () => get().cartItems.reduce((s, i) => s + i.quantity, 0)
}), { name: 'cart-storage' }))
