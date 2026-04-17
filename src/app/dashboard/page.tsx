import { AppShell } from '@/components/layout/app-shell'

export default function DashboardPage() {
  return (
    <AppShell title="لوحة التحكم">
      <div className="page-container py-10">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">لوحة تحكم مبدئية</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            تم إنشاء هذه الصفحة كواجهة أساسية قابلة للبناء حتى يكتمل المشروع وتتم إضافة الشاشات الأصلية لاحقًا.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
