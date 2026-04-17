import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
  }

  const { id } = await context.params
  const body = await req.json()
  const user = await prisma.user.update({
    where: { id },
    data: {
      isActive: body.isActive !== undefined ? body.isActive : undefined,
      role: body.role || undefined,
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
  }

  const { id } = await context.params
  if (id === (session?.user as any)?.id) {
    return NextResponse.json({ error: 'لا يمكنك حذف حسابك' }, { status: 400 })
  }

  await prisma.user.delete({ where: { id } })
  return NextResponse.json({ message: 'تم حذف المستخدم' })
}
