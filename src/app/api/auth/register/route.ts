import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
})

export async function POST(req: NextRequest) {
  try {
    const parsed = registerSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json({ error: 'البيانات المدخلة غير صالحة' }, { status: 400 })
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'البريد الإلكتروني مستخدم بالفعل' }, { status: 409 })
    }

    const userCount = await prisma.user.count()
    const isFirstUser = userCount === 0
    const isAdminEmail = env.ADMIN_EMAIL && email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: isFirstUser || isAdminEmail ? 'ADMIN' : 'USER',
      },
    })

    sendWelcomeEmail(user.email, user.name || 'عزيزي العميل').catch(console.error)

    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح', userId: user.id }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 })
  }
}
