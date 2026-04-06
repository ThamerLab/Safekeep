import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  const { currentPassword, newPassword } = await req.json()
  const user = await prisma.user.findUnique({ where: { id: (session.user as any).id } })

  if (!user?.password) return NextResponse.json({ error: 'لا يوجد كلمة مرور' }, { status: 400 })

  const valid = await bcrypt.compare(currentPassword, user.password)
  if (!valid) return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 400 })

  const hashed = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({ where: { id: user.id }, data: { password: hashed } })

  return NextResponse.json({ message: 'تم تغيير كلمة المرور' })
}
