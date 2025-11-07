import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || (session as any).user?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(users)
}
