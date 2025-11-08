'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Props = { children: React.ReactNode, adminOnly?: boolean }

export default function ProtectedRoute({ children, adminOnly = false }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    if (!session) router.replace('/login')
    else if (adminOnly && (session as any).user?.role !== 'admin') {
      router.replace('/')
    }
  }, [session, status, adminOnly, router])

  if (status === 'loading' || !session) return <div className="p-8 text-center">Checking session...</div>

  if (adminOnly && (session as any).user?.role !== 'admin') {
    return <div className="p-8 text-center">Not authorized</div>
  }

  return <>{children}</>
}
