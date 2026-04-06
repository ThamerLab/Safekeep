import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if ((session?.user as any)?.role !== 'ADMIN') return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })

  const [totalUsers, totalProducts, totalDocuments, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.document.count(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true,
        _count: { select: { products: true } } },
    }),
  ])

  return NextResponse.json({ totalUsers, totalProducts, totalDocuments, recentUsers })
}
