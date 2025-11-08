'use client';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import { useSession } from 'next-auth/react';

type Props = {
  product: any;
  featured?: boolean;
};

export default function ProductCard({ product, featured }: Props) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const isCustomer = session && !isAdmin;

  return (
    <div
      className={`border rounded p-12 flex flex-col bg-white shadow hover:shadow-lg transition
        ${featured ? 'w-100 md:w-110' : 'w-70 md:w-80'}`}
    >
      <div className="h-55 w-full bg-gray-100 mb-8 flex items-center justify-center overflow-hidden rounded">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-500">No image</div>
        )}
      </div>

      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
      <p className="mt-2 text-sm text-gray-600">${(product.price / 100).toFixed(2)}</p>

      <div className="mt-auto flex gap-2 pt-4">
        {/* View button always visible */}
        <Link
          href={`/product/${product.slug}`}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center font-semibold transition"
        >
          View
        </Link>

        {/* Only visible to logged-in customers */}
        {isCustomer && (
          <>
            <AddToCartButton product={product} />
            <Link
              href={`/product/${product.slug}/review`}
              className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-center font-semibold transition"
            >
              Add Review
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
