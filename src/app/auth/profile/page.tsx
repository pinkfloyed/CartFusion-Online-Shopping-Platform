import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div className="p-8 text-center">Please login to view your profile.</div>
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } },
  })


  const formattedOrders = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
  }))

  return (
    <ProfileClient
      user={{
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        gender: user?.gender || '',
        dob: user?.dob ? new Date(user.dob).toISOString() : '',
        createdAt: user?.createdAt ? new Date(user.createdAt).toISOString() : '',
      }}
      orders={formattedOrders}
    />
  )
}

