import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return NextResponse.json({ error: 'البريد الإلكتروني مستخدم بالفعل' }, { status: 409 })
    }

    const userCount = await prisma.user.count()
    const isFirstUser = userCount === 0
    const isAdminEmail = process.env.ADMIN_EMAIL && email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: isFirstUser || isAdminEmail ? 'ADMIN' : 'USER',
      },
    })

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.name || 'عزيزي العميل').catch(console.error)

    return NextResponse.json({ message: 'تم إنشاء الحساب بنجاح', userId: user.id }, { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 })
  }
}
