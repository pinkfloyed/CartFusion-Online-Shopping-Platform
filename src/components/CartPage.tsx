'use client';
import CartItemCard from '@/components/CartItemCard';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';

export default function CartPage() {
  const cartItems = useCart((s) => s.cartItems);
  const totalPrice = useCart((s) => s.totalPrice);

  if (cartItems.length === 0) {
    return <div className="text-center py-20 text-gray-600">Your cart is empty</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Total and Checkout */}
      <div className="flex flex-col md:flex-row md:justify-between items-center bg-white p-6 rounded shadow mt-6">
        <div className="text-xl font-semibold">
          Total: ${(totalPrice() / 100).toFixed(2)}
        </div>

        <Link
          href="/checkout"
          className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
