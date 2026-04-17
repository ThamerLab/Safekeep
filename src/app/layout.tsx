import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

import { AppSessionProvider } from '@/components/providers/session-provider'
import { ToastProvider } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Safekeep',
  description: 'نظام ذكي لحفظ الفواتير وتتبع الضمانات',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AppSessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </AppSessionProvider>
      </body>
    </html>
  )
}
