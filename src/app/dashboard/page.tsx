import { ArrowUpLeft, BellDot, Boxes, Clock3, FileText, ShieldAlert } from 'lucide-react'

import { AppShell } from '@/components/layout/app-shell'

const metrics = [
  { label: 'إجمالي الفواتير', value: '2,184', hint: '+128 هذا الأسبوع', icon: FileText },
  { label: 'ضمانات فعالة', value: '624', hint: '89 تنتهي خلال 30 يوم', icon: ShieldAlert },
  { label: 'عناصر تحت المراجعة', value: '41', hint: '9 تحتاج تعديل OCR', icon: Boxes },
  { label: 'متوسط زمن المعالجة', value: '2.4m', hint: 'أسرع 18% من الشهر الماضي', icon: Clock3 },
]

const pipelines = [
  { title: 'تنبيهات مستحقة اليوم', value: '18', color: 'from-amber-200 to-orange-300' },
  { title: 'فواتير مرفوعة حديثًا', value: '74', color: 'from-cyan-200 to-blue-300' },
  { title: 'تطابق OCR ناجح', value: '91%', color: 'from-emerald-200 to-teal-300' },
]

export default function DashboardPage() {
  return (
    <AppShell title="لوحة التحكم">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200/70 px-6 py-5">
            <p className="eyebrow text-[11px] text-slate-500">Executive Snapshot</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-950">مركز التشغيل اليومي</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  رؤية سريعة على الفواتير، الضمانات، والتنبيهات الحرجة بأسلوب أقرب لداشبورد SaaS تشغيلي.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950 px-4 py-3 text-white">
                <p className="text-xs text-slate-300">Health Score</p>
                <p className="mt-1 text-2xl font-bold">94/100</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2">
            {metrics.map((metric) => {
              const Icon = metric.icon
              return (
                <div key={metric.label} className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-slate-100 p-3">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <ArrowUpLeft className="h-3.5 w-3.5" />
                      مستقر
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-500">{metric.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{metric.hint}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-800">
                <BellDot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Alert Feed</p>
                <h3 className="text-xl font-bold text-slate-950">التزامات قريبة</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                '6 أجهزة تنتهي ضماناتها خلال 7 أيام',
                '3 فواتير تحتاج تصنيف يدوي',
                'مستخدم جديد فعّل مساحة العمل اليوم',
              ].map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">أولوية {index === 0 ? 'عالية' : index === 1 ? 'متوسطة' : 'منخفضة'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <p className="eyebrow text-[11px] text-slate-500">Pipeline</p>
            <div className="mt-4 space-y-3">
              {pipelines.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                    <p className="text-xl font-bold text-slate-950">{item.value}</p>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className={`h-full w-[72%] rounded-full bg-gradient-to-r ${item.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
