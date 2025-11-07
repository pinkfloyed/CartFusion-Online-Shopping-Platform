import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { createStripeCheckoutSession } from '../../../lib/stripe'

export async function POST(req: Request) {
  const body = await req.json()
  const items = body.items || []
  if (!items.length) return NextResponse.json({ error: 'No items' }, { status: 400 })

  const productIds = items.map((i: any) => i.productId)
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } })

  const lineItems = items.map((it: any) => {
    const p = products.find(x => x.id === it.productId)
    return { name: p?.name || 'Product', price: p?.price || 0, quantity: it.quantity || 1 }
  })

  const origin = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const session = await createStripeCheckoutSession(lineItems, `${origin}/success`, `${origin}/cancel`)
  return NextResponse.json({ id: session.id })
}
