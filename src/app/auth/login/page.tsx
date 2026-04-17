'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError('تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="page-container grid min-h-screen items-center py-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative hidden min-h-[680px] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-950 p-10 text-white shadow-[0_35px_100px_rgba(15,23,42,0.32)] lg:block">
        <div className="hero-orb right-[-3rem] top-[-3rem] h-56 w-56 bg-cyan-300/45" />
        <div className="hero-orb bottom-[-4rem] left-[-2rem] h-72 w-72 bg-blue-500/30" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Workspace Authentication
          </div>
          <h1 className="mt-8 max-w-md text-5xl font-bold leading-tight">ادخل إلى منصة تحفظ منتجاتك وفواتيرك بثقة.</h1>
          <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
            واجهة أقرب لمنتج SaaS فعلي: وصول سريع للداشبورد، تنبيهات الضمان، وإدارة الأصول من مكان واحد.
          </p>

          <div className="mt-10 space-y-4">
            {[
              'تنبيهات ذكية حسب تاريخ انتهاء الضمان',
              'تنظيم الفواتير والمرفقات لكل منتج',
              'مسار إدارة واضح للفريق والمشرف',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
                <span className="text-sm text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-0 py-6 lg:px-10">
        <div className="mx-auto max-w-md">
          <p className="eyebrow text-[11px] text-slate-500">Safekeep Cloud</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950">تسجيل الدخول</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            استخدم بياناتك للدخول إلى لوحة التحكم ومتابعة الفواتير، الضمانات، والتنبيهات.
          </p>

          <form className="card mt-8 space-y-5 p-6" onSubmit={onSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">البريد الإلكتروني</label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-cyan-400"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">كلمة المرور</label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-cyan-400"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
            </div>
            {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
            <button
              className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'دخول إلى المنصة'}
            </button>
          </form>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 text-sm text-slate-600">
            لا تملك حسابًا بعد؟
            <Link className="mr-2 font-bold text-slate-950 underline underline-offset-4" href="/auth/register">
              أنشئ مساحة عمل جديدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
