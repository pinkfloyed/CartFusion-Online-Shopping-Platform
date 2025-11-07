// src/app/api/orders/route.ts

import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { address, phone, items } = body

  if (!items?.length)
    return NextResponse.json({ error: 'No items' }, { status: 400 })

  // ✅ FIX — Correct backend total calculation
  const calculatedTotal = items.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  )

  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        address,
        phone,
        total: calculatedTotal, // ✅ SAVE REAL TOTAL
        paymentType: 'COD',
        status: 'PENDING',
        items: {
          create: items.map((it: any) => ({
            product: { connect: { id: it.id } },
            quantity: Number(it.quantity),
            price: Number(it.price), // ✅ price must already be 24, NOT 0.24
          })),
        },
      },
      include: {
        items: { include: { product: true } },
      },
    })

    return NextResponse.json(order)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Order failed' }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'admin')
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const orders = await prisma.order.findMany({
    include: {
      items: { include: { product: true } },
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(orders)
}
