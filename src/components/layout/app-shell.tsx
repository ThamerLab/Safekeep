import Link from 'next/link'
import type { ReactNode } from 'react'
import { Bell, ChevronRight, CreditCard, LayoutDashboard, Settings, ShieldCheck } from 'lucide-react'

type AppShellProps = {
  title: string
  children: ReactNode
  showBack?: boolean
  backHref?: string
}

const navItems = [
  { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
  { href: '/about', label: 'عن الخدمة', icon: ShieldCheck },
]

export function AppShell({ title, children, showBack = false, backHref = '/' }: AppShellProps) {
  return (
    <div className="min-h-screen py-5">
      <div className="page-container">
        <div className="card overflow-hidden">
          <div className="grid min-h-[calc(100vh-2.5rem)] lg:grid-cols-[260px_1fr]">
            <aside className="border-b border-slate-200/60 bg-slate-950 px-5 py-6 text-white lg:border-b-0 lg:border-l lg:border-slate-800/70">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow text-[11px] text-cyan-300">Safekeep Cloud</p>
                  <h2 className="mt-2 text-2xl font-bold">Receipt OS</h2>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <CreditCard className="h-5 w-5 text-cyan-200" />
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-300">مساحة العمل الحالية</p>
                <p className="mt-1 text-lg font-semibold">Safekeeper.t4mer</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  متابعة الضمانات، الفواتير، والتنبيهات من لوحة واحدة بأسلوب SaaS واضح.
                </p>
              </div>

              <nav className="mt-8 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-white/10 hover:bg-white/10"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-cyan-300" />
                        {item.label}
                      </span>
                      <ChevronRight className="h-4 w-4 opacity-60" />
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-8 rounded-3xl bg-gradient-to-br from-cyan-400/20 to-blue-400/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-2">
                    <Bell className="h-4 w-4 text-cyan-100" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">قريبًا ينتهي 12 ضمان</p>
                    <p className="text-xs text-slate-300">أقرب تنبيه خلال 3 أيام</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="relative overflow-hidden bg-white/55">
              <div className="hero-orb right-[-4rem] top-[-3rem] h-44 w-44 bg-cyan-300/70" />
              <div className="hero-orb bottom-[-5rem] left-[-3rem] h-56 w-56 bg-blue-300/50" />

              <header className="border-b border-slate-200/70 bg-white/60 backdrop-blur-xl">
                <div className="page-container flex flex-wrap items-center justify-between gap-3 py-5">
                  <div>
                    {showBack ? (
                      <Link
                        href={backHref}
                        className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                        رجوع
                      </Link>
                    ) : null}
                    <p className="eyebrow text-[11px] text-slate-500">Operations Console</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-right">
                      <p className="text-xs text-slate-500">خطة العمل</p>
                      <p className="text-sm font-semibold text-slate-900">Growth Workspace</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                      ST
                    </div>
                  </div>
                </div>
              </header>

              <main className="page-container py-8">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
