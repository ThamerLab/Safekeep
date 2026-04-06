import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })

  const { name } = await req.json()
  const user = await prisma.user.update({
    where: { id: (session.user as any).id },
    data: { name },
  })
  return NextResponse.json({ name: user.name })
}
