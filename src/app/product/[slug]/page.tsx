import AddToCartButton from '@/components/AddToCartButton'
import { prisma } from '@/lib/prisma'
import Link from "next/link";

interface ProductPageProps {
  params: { slug: string } | Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  if (!slug) return <div>Product not found</div>

  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return <div>Product not found</div>

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto py-12 px-4">
      {/* Product Image */}
      <div className="flex items-center justify-center bg-gray-100 p-4 rounded">
        {product.image ? (
          <img src={product.image} alt={product.name} className="object-cover max-h-96" />
        ) : (
          <div className="h-64 w-full flex items-center justify-center bg-gray-200">
            No image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl text-gray-700 mb-4">${(product.price / 100).toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Add to Cart Button */}
        <AddToCartButton product={product} />
      </div>
      <div className="mt-3">
        <Link
          href="/"
          className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-center font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
