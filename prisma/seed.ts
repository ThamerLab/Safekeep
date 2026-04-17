import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@safekeep.app'
const adminPasswordPlain = process.env.SEED_ADMIN_PASSWORD || 'Admin@2025'
const demoEmail = process.env.SEED_DEMO_EMAIL || 'demo@safekeep.app'
const demoPasswordPlain = process.env.SEED_DEMO_PASSWORD || 'User@2025'

async function main() {
  console.log('🌱 Seeding database...')

  const adminPassword = await bcrypt.hash(adminPasswordPlain, 12)
  const userPassword = await bcrypt.hash(demoPasswordPlain, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'مدير النظام',
      email: adminEmail,
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.upsert({
    where: { email: demoEmail },
    update: {},
    create: {
      name: 'أحمد محمد',
      email: demoEmail,
      password: userPassword,
      role: 'USER',
    },
  })

  const products = [
    {
      name: 'آيفون 15 برو ماكس',
      category: 'ELECTRONICS' as const,
      store: 'اكسترا',
      purchaseDate: new Date('2024-01-15'),
      price: 5499,
      serialNumber: 'IMEI-123456789',
      warrantyMonths: 12,
    },
    {
      name: 'ثلاجة سامسونج ٣٢٠ لتر',
      category: 'APPLIANCES' as const,
      store: 'ساكو',
      purchaseDate: new Date('2023-08-20'),
      price: 2800,
      warrantyMonths: 24,
    },
    {
      name: 'لابتوب ديل XPS',
      category: 'ELECTRONICS' as const,
      store: 'جرير',
      purchaseDate: new Date('2022-06-10'),
      price: 4200,
      warrantyMonths: 12,
    },
  ]

  for (const p of products) {
    const endDate = new Date(p.purchaseDate)
    endDate.setMonth(endDate.getMonth() + p.warrantyMonths)

    await prisma.product.create({
      data: {
        userId: user.id,
        name: p.name,
        category: p.category,
        store: p.store,
        purchaseDate: p.purchaseDate,
        price: p.price,
        serialNumber: p.serialNumber,
        warranty: {
          create: {
            durationMonths: p.warrantyMonths,
            startDate: p.purchaseDate,
            endDate,
            status: endDate > new Date() ? 'ACTIVE' : 'EXPIRED',
          },
        },
      },
    })
  }

  console.log('✅ Seed completed!')
  console.log(`👤 Admin: ${adminEmail} / ${adminPasswordPlain}`)
  console.log(`👤 Demo:  ${demoEmail} / ${demoPasswordPlain}`)
}

main().finally(() => prisma.$disconnect())
