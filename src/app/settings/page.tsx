import { Bell, Database, Shield, SlidersHorizontal } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'

const settingsCards = [
  {
    title: 'إشعارات الضمان',
    text: 'حدد متى يرسل النظام تنبيهات 30 و14 و7 و1 يوم قبل انتهاء الضمان.',
    icon: Bell,
  },
  {
    title: 'أمان الحساب',
    text: 'إدارة البريد الإداري، سياسات كلمة المرور، وصلاحيات الوصول للمشرفين.',
    icon: Shield,
  },
  {
    title: 'التكاملات',
    text: 'راجع S3 والبريد وبيانات OCR حتى تكون بيئة التشغيل أوضح وأسهل للصيانة.',
    icon: Database,
  },
]

export default function SettingsPage() {
  return (
    <AppShell title="الإعدادات" showBack backHref="/dashboard">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-800">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="eyebrow text-[11px] text-slate-500">Workspace Controls</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">لوحة إعدادات تشغيلية</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {settingsCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <p className="eyebrow text-[11px] text-slate-500">Environment</p>
            <div className="mt-4 space-y-3">
              {[
                ['NEXTAUTH_URL', 'https://safekeeper.t4mer.com'],
                ['DATABASE_URL', 'PostgreSQL / db:5432 / safekeep'],
                ['SMTP', 'مفعّل عند توفير القيم'],
                ['S3', 'جاهز للتوصيل عند استبدال القيم التجريبية'],
              ].map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs font-semibold tracking-wide text-slate-500">{key}</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-bold text-slate-950">اقتراحات سريعة</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <li>استبدل القيم التجريبية لـ S3 والبريد قبل التشغيل الفعلي.</li>
              <li>فعّل HTTPS دائمًا مع NextAuth لتفادي مشاكل الجلسات.</li>
              <li>ثبّت جدول التنبيهات بعد التأكد من عمل الهجرات وقاعدة البيانات.</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
