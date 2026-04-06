# دليل نشر Safekeep

## 1. الإعداد المحلي

```bash
# استنساخ المشروع
git clone https://github.com/ThamerLab/Safekeep
cd safekeep

# تثبيت الحزم
npm install

# إعداد المتغيرات
cp .env.example .env
# عدّل .env بإضافة قيمك الخاصة

# إعداد قاعدة البيانات
npx prisma migrate dev --name init
npx prisma db seed

# تشغيل التطبيق
npm run dev
```

## 2. تشغيل Docker

```bash
# إنشاء ملف .env من المثال
cp .env.example .env

# تشغيل الكل
docker-compose up -d

# تهيئة قاعدة البيانات
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed
```

## 3. متغيرات البيئة

| المتغير | الوصف | مطلوب |
|---------|--------|-------|
| DATABASE_URL | رابط قاعدة البيانات PostgreSQL | ✅ |
| NEXTAUTH_SECRET | مفتاح سري (32 حرف على الأقل) | ✅ |
| NEXTAUTH_URL | رابط التطبيق | ✅ |
| AWS_ACCESS_KEY_ID | مفتاح AWS | ✅ |
| AWS_SECRET_ACCESS_KEY | المفتاح السري AWS | ✅ |
| AWS_REGION | منطقة AWS (مثل us-east-1) | ✅ |
| AWS_S3_BUCKET | اسم Bucket في S3 | ✅ |
| GOOGLE_CREDENTIALS_JSON | بيانات Google Vision API (JSON) | اختياري |
| SMTP_HOST | خادم البريد | اختياري |
| SMTP_USER | بريد الإرسال | اختياري |
| SMTP_PASS | كلمة مرور البريد | اختياري |
| ADMIN_EMAIL | البريد الذي سيكون مديراً تلقائياً | اختياري |

## 4. النشر على Vercel

```bash
# تثبيت Vercel CLI
npm i -g vercel

# نشر
vercel --prod
```

أضف متغيرات البيئة في لوحة تحكم Vercel.

## 5. إعداد S3

1. أنشئ Bucket في AWS S3
2. فعّل الوصول العام للقراءة أو استخدم Signed URLs
3. أضف CORS policy:
```json
[{
  "AllowedHeaders": ["*"],
  "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
  "AllowedOrigins": ["https://yourdomain.com"],
  "MaxAgeSeconds": 3000
}]
```

## 6. إعداد Google Vision OCR

1. اذهب إلى Google Cloud Console
2. أنشئ مشروعاً جديداً
3. فعّل Vision API
4. أنشئ Service Account
5. حمّل ملف JSON
6. أضف محتواه في GOOGLE_CREDENTIALS_JSON

## 7. إعداد التنبيهات (Cron)

أضف Cron job يستدعي كل يوم:
```
POST /api/cron/check-warranties
Authorization: Bearer YOUR_CRON_SECRET
```

على Vercel يمكنك إضافة في vercel.json:
```json
{
  "crons": [{
    "path": "/api/cron/check-warranties",
    "schedule": "0 8 * * *"
  }]
}
```

## حسابات تجريبية (بعد Seed)

- **المدير:** admin@safekeep.app / Admin@2025
- **المستخدم:** demo@safekeep.app / User@2025
