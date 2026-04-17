import { AppShell } from '@/components/layout/app-shell'

export default function SettingsPage() {
  return (
    <AppShell title="الإعدادات" showBack>
      <div className="page-container py-10">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">إعدادات الحساب</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            هذه صفحة مؤقتة حتى يتم إرجاع شاشات الإعدادات الأصلية إلى المشروع.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
