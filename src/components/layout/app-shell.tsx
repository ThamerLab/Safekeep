import Link from 'next/link'
import type { ReactNode } from 'react'

type AppShellProps = {
  title: string
  children: ReactNode
  showBack?: boolean
  backHref?: string
}

export function AppShell({ title, children, showBack = false, backHref = '/' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="page-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {showBack ? (
              <Link
                href={backHref}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                رجوع
              </Link>
            ) : null}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Safekeep</p>
              <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            </div>
          </div>
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link className="rounded-xl px-3 py-2 transition hover:bg-slate-100" href="/">
              الرئيسية
            </Link>
            <Link className="rounded-xl px-3 py-2 transition hover:bg-slate-100" href="/about">
              عن التطبيق
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
