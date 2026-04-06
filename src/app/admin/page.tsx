'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout/app-shell'
import { PageLoader } from '@/components/ui/loading'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toaster'
import { Users, Package, FileText, Shield, Ban, Trash2, CheckCircle } from 'lucide-react'
import { formatDateAr } from '@/lib/utils'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { addToast } = useToast()
  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [confirmAction, setConfirmAction] = useState<{ type: string; userId: string; userName: string } | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/auth/login'); return }
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') {
      router.push('/dashboard'); return
    }
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/admin/users').then(r => r.json()),
      ]).then(([s, u]) => {
        setStats(s)
        setUsers(Array.isArray(u) ? u : [])
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [status])

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive }),
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive } : u))
      addToast(isActive ? 'تم تفعيل الحساب' : 'تم تعطيل الحساب', 'success')
    } catch { addToast('خطأ في تحديث الحساب', 'error') }
  }

  const handleDelete = async (userId: string) => {
    try {
      await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      setUsers(prev => prev.filter(u => u.id !== userId))
      addToast('تم حذف المستخدم', 'success')
    } catch { addToast('خطأ في الحذف', 'error') }
    setConfirmAction(null)
  }

  if (loading || status === 'loading') return <PageLoader />

  return (
    <AppShell title="لوحة التحكم" showBack backHref="/settings">
      <div className="page-container pt-4 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'المستخدمون', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600 bg-blue-100' },
            { label: 'المنتجات', value: stats?.totalProducts || 0, icon: Package, color: 'text-primary-600 bg-primary-100' },
            { label: 'المستندات', value: stats?.totalDocuments || 0, icon: FileText, color: 'text-purple-600 bg-purple-100' },
          ].map(item => (
            <div key={item.label} className="card p-3 text-center">
              <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center mx-auto mb-2`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-slate-900">{item.value}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <Shield className="w-4 h-4 text-slate-500" />
            <h2 className="font-semibold text-slate-800 text-sm">المستخدمون ({users.length})</h2>
          </div>

          <div className="divide-y divide-slate-50">
            {users.map(user => (
              <div key={user.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0
                      ${user.role === 'ADMIN' ? 'bg-primary-600' : 'bg-slate-400'}`}>
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{user.name || 'بدون اسم'}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {user.role === 'ADMIN' && <span className="badge badge-active text-[10px]">مدير</span>}
                        <span className={`badge text-[10px] ${user.isActive ? 'badge-active' : 'badge-expired'}`}>
                          {user.isActive ? 'مفعّل' : 'معطّل'}
                        </span>
                        <span className="text-[10px] text-slate-400">{user._count?.products || 0} منتج</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleActive(user.id, !user.isActive)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors
                        ${user.isActive ? 'hover:bg-amber-50 text-amber-500' : 'hover:bg-green-50 text-green-500'}`}
                      title={user.isActive ? 'تعطيل' : 'تفعيل'}
                    >
                      {user.isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setConfirmAction({ type: 'delete', userId: user.id, userName: user.name || user.email })}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-slate-300 mt-2">انضم في {formatDateAr(user.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmAction}
        title="حذف المستخدم"
        message={`هل أنت متأكد من حذف "${confirmAction?.userName}"؟ سيتم حذف جميع بياناته.`}
        confirmLabel="نعم، احذف"
        onConfirm={() => confirmAction && handleDelete(confirmAction.userId)}
        onCancel={() => setConfirmAction(null)}
        danger
      />
    </AppShell>
  )
}
