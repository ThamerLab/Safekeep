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

## 2.1 النشر عبر Portainer

### قبل البدء

1. ارفع المشروع الكامل إلى السيرفر، وليس فقط الملفات الجزئية.
2. تأكد من وجود الملفات التالية داخل المشروع:
   - `src/components`
   - `src/lib`
   - `src/app/layout.tsx`
   - `src/app/page.tsx`
3. جهز الدومين الذي سيعمل عليه التطبيق.
4. فعّل SSL إذا أمكن، ويفضل استخدام `https` مع NextAuth.

### خطوات Portainer

1. افتح Portainer.
2. اذهب إلى `Stacks`.
3. اضغط `Add stack`.
4. اختر اسماً مثل `safekeep`.
5. الصق محتوى `docker-compose.yml` في خانة الـ Web editor أو ارفع الملف.
6. في قسم المتغيرات أضف القيم الموجودة في `.env.example`.
7. اضبط القيم التالية قبل النشر:
   - `NEXTAUTH_URL=https://safekeeper.t4mer.com`
   - `POSTGRES_PASSWORD` بكلمة مرور قوية
   - `NEXTAUTH_SECRET` بمفتاح عشوائي طويل
   - مفاتيح `AWS_*` إذا كنت ستستخدم رفع الملفات إلى S3
8. اضغط `Deploy the stack`.

### بعد النشر

1. افتح Logs الخاصة بخدمة `app`.
2. تأكد من عدم وجود أخطاء أثناء `prisma migrate deploy`.
3. تأكد أن التطبيق أصبح متاحاً على الدومين.
4. إذا كنت تستخدم Reverse Proxy مثل Nginx Proxy Manager، وجّهه إلى المنفذ `3000`.
5. إذا أردت الحسابات التجريبية بعد نجاح التشغيل، نفّذ:

```bash
docker compose exec app npx prisma db seed
```

### ملاحظات مهمة

- لا تستخدم `http://localhost:3000` في `NEXTAUTH_URL` على السيرفر.
- يفضل استخدام `https://safekeeper.t4mer.com` بدلاً من `http://safekeeper.t4mer.com`.
- إذا لم تكن تستخدم OCR الآن، اترك `GOOGLE_CREDENTIALS_JSON` فارغاً.
- إذا لم تكن تحتاج البريد الإلكتروني حالياً، يمكنك ترك إعدادات SMTP فارغة.

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
