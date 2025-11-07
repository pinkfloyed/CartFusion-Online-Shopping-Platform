import ProductCard from '@/components/ProductCard'
import ProductsFilter from '@/components/ProductsFilter'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

interface ProductsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const PAGE_SIZE = 9

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams

  const page = parseInt((params?.page as string) || '1')
  const search = (params?.search as string) || ''
  const category = (params?.category as string) || ''
  const sort = (params?.sort as string) || 'createdAt_desc'

  // Build filter
  const where: any = {}
  if (search) where.name = { contains: search } // Case-insensitive default
  if (category) where.category = category

  // Build sort
  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'createdAt_asc') orderBy = { createdAt: 'asc' }
  if (sort === 'price_asc') orderBy = { price: 'asc' }
  if (sort === 'price_desc') orderBy = { price: 'desc' }

  // Count total items
  const totalItems = await prisma.product.count({ where })
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)

  // Get products
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE
  })

  // Get unique categories
  const categories = await prisma.product.findMany({
    distinct: ['category'],
    select: { category: true }
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      {/* Filter / Search */}
      <ProductsFilter
        categories={categories.map(c => c.category).filter(Boolean) as string[]}
        defaultSearch={search}
        defaultCategory={category}
        defaultSort={sort}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1
          const query = new URLSearchParams(params as any)
          query.set('page', pageNum.toString())
          return (
            <Link
              key={pageNum}
              href={`/products?${query.toString()}`}
              className={`px-3 py-1 border rounded ${pageNum === page ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
