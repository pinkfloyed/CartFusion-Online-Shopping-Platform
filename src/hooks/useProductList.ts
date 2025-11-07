'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useProductList() {
  const { data, error, mutate } = useSWR('/api/products', fetcher, { revalidateOnFocus: false })
  return {
    products: data || [],
    loading: !error && !data,
    error,
    mutate
  }
}
