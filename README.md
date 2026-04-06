<div align="center" dir="rtl">

# 🔐 Safekeep

### نظام ذكي لحفظ الفواتير وتتبع ضمانات المنتجات

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 🌟 المميزات

- 📄 **حفظ الفواتير** - ارفع صور الفواتير أو ملفات PDF
- 🤖 **OCR ذكي** - استخراج بيانات الفاتورة تلقائياً (Google Vision)
- 🛡️ **تتبع الضمانات** - احتساب تلقائي لتاريخ انتهاء الضمان
- 🔔 **تنبيهات ذكية** - إشعارات قبل 30/14/7/1 يوم من انتهاء الضمان
- 📊 **لوحة تحكم** - إحصائيات شاملة لمنتجاتك
- 🔍 **بحث متقدم** - بحث وفلترة فوري
- 👨‍💼 **لوحة مدير** - إدارة المستخدمين والإحصائيات
- 📱 **تصميم موبايل** - واجهة عربية RTL محسّنة للهاتف
- 🔒 **أمان عالي** - مصادقة آمنة وعزل البيانات

## 🚀 تشغيل سريع

```bash
git clone https://github.com/ThamerLab/Safekeep
cd safekeep
npm install
cp .env.example .env
# عدّل .env
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

افتح http://localhost:3000

## 📋 المتطلبات

- Node.js 20+
- PostgreSQL 14+
- حساب AWS (S3)
- حساب Google Cloud (Vision API) — اختياري

## 🏗️ هيكل المشروع

```
safekeep/
├── src/
│   ├── app/                  # صفحات Next.js App Router
│   │   ├── (auth)/          # صفحات تسجيل الدخول
│   │   ├── dashboard/       # لوحة التحكم الرئيسية
│   │   ├── products/        # قائمة وتفاصيل المنتجات
│   │   ├── admin/           # لوحة المدير
│   │   └── api/             # API Routes
│   ├── components/          # مكونات واجهة المستخدم
│   └── lib/                 # مكتبات مساعدة
├── prisma/                  # Schema + Migrations + Seed
├── public/                  # ملفات عامة (manifest, icons)
├── Dockerfile
├── docker-compose.yml
└── DEPLOYMENT.md
```

## 🔑 حسابات تجريبية (بعد Seed)

| الدور | البريد | كلمة المرور |
|-------|--------|------------|
| مدير | admin@safekeep.app | Admin@2025 |
| مستخدم | demo@safekeep.app | User@2025 |

## 📖 دليل النشر

راجع [DEPLOYMENT.md](DEPLOYMENT.md) للحصول على التعليمات الكاملة.

## 📄 الرخصة

MIT — مفتوح المصدر بالكامل
