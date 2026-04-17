import Link from 'next/link'
import { ArrowLeft, BellRing, ChartNoAxesCombined, CircleCheckBig, FolderLock, Sparkles } from 'lucide-react'

const stats = [
  { label: 'فاتورة محفوظة', value: '24K+' },
  { label: 'تنبيه ضمان', value: '1.8K' },
  { label: 'نسبة تفعيل العملاء', value: '92%' },
]

const features = [
  {
    title: 'مخزن ذكي للفواتير',
    body: 'جمع تلقائي للصور والملفات وربطها بالمنتج والضمان والمتجر داخل سجل واحد نظيف.',
    icon: FolderLock,
  },
  {
    title: 'تنبيهات قبل انتهاء الضمان',
    body: 'جدولة رسائل وتنبيهات عملية قبل 30 و14 و7 و1 يوم مع لوحة أولويات يومية.',
    icon: BellRing,
  },
  {
    title: 'تحليلات تشغيلية',
    body: 'واجهة أقرب لمنتج SaaS تعرض حالة المحفظة، المخاطر القريبة، ومؤشرات النشاط اليومي.',
    icon: ChartNoAxesCombined,
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="page-container py-6">
        <header className="card flex flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="eyebrow text-[11px] text-slate-500">Safekeep Cloud</p>
            <h1 className="mt-2 font-['Space_Grotesk'] text-2xl font-bold text-slate-950">Receipt & Warranty OS</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100" href="/about">
              عن الخدمة
            </Link>
            <Link className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white" href="/auth/login">
              دخول المنصة
            </Link>
          </div>
        </header>

        <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 px-6 py-10 text-white shadow-[0_30px_100px_rgba(15,23,42,0.3)] md:px-10">
          <div className="hero-orb left-0 top-0 h-56 w-56 bg-cyan-300/40" />
          <div className="hero-orb bottom-[-4rem] right-[10%] h-64 w-64 bg-blue-500/30" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100">
                <Sparkles className="h-4 w-4" />
                تجربة SaaS أوضح وأرتب لإدارة الضمانات والفواتير
              </div>
              <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
                شغّل منصة تحفظ الفواتير
                <span className="block text-cyan-300">وتنظم الضمانات مثل منتج SaaS حقيقي</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Safekeep يحول الفواتير المبعثرة إلى workspace واحد مرتب: تخزين، تصنيف، تنبيهات انتهاء الضمان،
                وتقارير تشغيلية سريعة للفريق أو للاستخدام الشخصي.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950"
                  href="/dashboard"
                >
                  افتح اللوحة
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white"
                  href="/auth/login"
                >
                  ابدأ بتسجيل الدخول
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">حالة المحفظة</p>
                    <p className="mt-2 text-3xl font-bold">98.4%</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/20 px-3 py-2 text-sm font-semibold text-emerald-200">
                    +12% هذا الشهر
                  </div>
                </div>
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
                </div>
              </div>

              <div className="shelf-grid">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <p className="text-sm text-slate-300">{stat.label}</p>
                    <p className="mt-3 text-3xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 shelf-grid">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{feature.body}</p>
              </div>
            )
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card p-6">
            <p className="eyebrow text-[11px] text-slate-500">لماذا هذه النسخة أفضل</p>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">واجهة فيها إحساس منتج، لا مجرد صفحات مؤقتة</h3>
            <ul className="mt-5 space-y-4">
              {[
                'شِل جانبي واضح بدل أعلى صفحة فارغ.',
                'بطاقات مؤشرات وكتل معلومات تدعم طابع SaaS.',
                'لغة بصرية متناسقة بين الصفحة الرئيسية والدخول والداشبورد.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-600">
                  <CircleCheckBig className="mt-1 h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <p className="eyebrow text-[11px] text-slate-500">Quick Launch</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Link className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-0.5" href="/dashboard">
                <p className="text-sm text-slate-500">المسار اليومي</p>
                <p className="mt-2 text-lg font-bold text-slate-950">لوحة التحكم</p>
              </Link>
              <Link className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-0.5" href="/settings">
                <p className="text-sm text-slate-500">الإدارة</p>
                <p className="mt-2 text-lg font-bold text-slate-950">الإعدادات</p>
              </Link>
              <Link className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 transition hover:-translate-y-0.5" href="/admin">
                <p className="text-sm text-slate-500">التحكم</p>
                <p className="mt-2 text-lg font-bold text-slate-950">لوحة المشرف</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
