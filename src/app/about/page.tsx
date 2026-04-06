import { AppShell } from '@/components/layout/app-shell'
import { Shield, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <AppShell title="عن التطبيق" showBack backHref="/settings">
      <div className="page-container pt-6 space-y-5">
        <div className="card p-6 text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center shadow-lg shadow-primary-200 mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Safekeep</h1>
          <p className="text-slate-500 text-sm mt-1">الإصدار 1.0.0</p>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            تطبيق مفتوح المصدر لحفظ الفواتير وتتبع ضمانات المنتجات بطريقة ذكية وآمنة
          </p>
        </div>
        <div className="card p-4">
          <h2 className="section-title mb-3">التقنيات المستخدمة</h2>
          <div className="space-y-2">
            {[
              ['Next.js 15','إطار العمل'],['PostgreSQL','قاعدة البيانات'],['Prisma ORM','طبقة البيانات'],
              ['AWS S3','تخزين الملفات'],['Google Vision','استخراج بيانات الفواتير'],['NextAuth.js','المصادقة'],['TailwindCSS','التصميم'],
            ].map(([tech, desc]) => (
              <div key={tech} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm font-medium text-slate-800">{tech}</span>
                <span className="text-xs text-slate-400">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-4 flex items-center justify-center gap-2 text-slate-500">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-sm">صُنع بكل حب للمجتمع العربي</span>
        </div>
      </div>
    </AppShell>
  )
}
