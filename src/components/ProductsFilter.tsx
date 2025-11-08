'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  categories: string[]
  defaultSearch?: string
  defaultCategory?: string
  defaultSort?: string
}

export default function ProductsFilter({ categories, defaultSearch = '', defaultCategory = '', defaultSort = 'createdAt_desc' }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(defaultSearch)
  const [category, setCategory] = useState(defaultCategory)
  const [sort, setSort] = useState(defaultSort)

  const updateQuery = () => {
    const params = new URLSearchParams(searchParams as any)
    if (search) params.set('search', search)
    else params.delete('search')

    if (category) params.set('category', category)
    else params.delete('category')

    if (sort) params.set('sort', sort)
    else params.delete('sort')

    params.set('page', '1') // reset page when filtering

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded flex-1"
      />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded">
        <option value="createdAt_desc">Newest</option>
        <option value="createdAt_asc">Oldest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
      <button onClick={updateQuery} className="bg-blue-600 text-white px-4 py-2 rounded">Apply</button>
    </div>
  )
}
