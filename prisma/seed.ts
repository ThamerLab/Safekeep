import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const adminPassword = await bcrypt.hash('Admin@2025', 12)
  const userPassword = await bcrypt.hash('User@2025', 12)

  // Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@safekeep.app' },
    update: {},
    create: {
      name: 'مدير النظام',
      email: 'admin@safekeep.app',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Demo User
  const user = await prisma.user.upsert({
    where: { email: 'demo@safekeep.app' },
    update: {},
    create: {
      name: 'أحمد محمد',
      email: 'demo@safekeep.app',
      password: userPassword,
      role: 'USER',
    },
  })

  // Sample Products
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
  console.log('👤 Admin: admin@safekeep.app / Admin@2025')
  console.log('👤 Demo:  demo@safekeep.app  / User@2025')
}

main().finally(() => prisma.$disconnect())
