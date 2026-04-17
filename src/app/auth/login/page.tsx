'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { AppShell } from '@/components/layout/app-shell'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@safekeep.app')
  const [password, setPassword] = useState('Admin@2025')
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
      setError('تعذر تسجيل الدخول. تأكد من تهيئة البيانات التجريبية أو أن الحساب صحيح.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <AppShell title="تسجيل الدخول" showBack>
      <div className="page-container py-10">
        <form className="card mx-auto max-w-md space-y-4 p-6" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">البريد الإلكتروني</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">كلمة المرور</label>
            <input
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button className="w-full rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white" disabled={loading}>
            {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </AppShell>
  )
}
