// src/app/api/users/update.ts
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'

export default async function handler(req: any, res: any) {
  if (req.method !== 'PUT') return res.status(405).end()

  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ message: 'Unauthorized' })

  const { name, email, gender, dob, password } = req.body

  try {
    const updateData: any = {
      name,
      email,
      gender,
      dob: dob ? new Date(dob) : null,
    }

    // ✅ Update password only if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateData.password = hashedPassword
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    })

    return res.status(200).json({ ok: true, user: updatedUser })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}
