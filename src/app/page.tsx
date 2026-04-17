import Link from 'next/link'

import { AppShell } from '@/components/layout/app-shell'

export default function HomePage() {
  return (
    <AppShell title="الرئيسية">
      <div className="page-container py-10">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900">مرحباً بك في Safekeep</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            هذه نسخة أساسية قابلة للتشغيل لإدارة حفظ الفواتير والضمانات. يمكنك البدء بتسجيل الدخول أو مراجعة صفحة
            الإدارة والواجهات الأساسية بعد إكمال إعداد قاعدة البيانات والمتغيرات البيئية.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white" href="/auth/login">
              تسجيل الدخول
            </Link>
            <Link className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" href="/about">
              عن التطبيق
            </Link>
            <Link className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700" href="/admin">
              لوحة الإدارة
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
