import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/ProductForm'
import ProtectedRoute from '@/components/ProtectedRoute'
import { prisma } from '@/lib/prisma'

export default async function EditProductPage({ params }: { params: { id: string }}) {
  const { id } = await params

  if (!id) {
    return <div className="p-8 text-red-500">❌ No product ID provided</div>
  }

  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    return <div className="p-8">Product not found</div>
  }

  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto py-8 flex gap-6">
        <AdminSidebar />

          <div className="flex-1 bg-white/90 backdrop-blur p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            ✏️ Edit Product
          </h2>
          <ProductForm
            initial={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              description: product.description || '',
              price: product.price,
              stock: product.stock,
              image: product.image || '',
              category: product.category || '',
            }}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}