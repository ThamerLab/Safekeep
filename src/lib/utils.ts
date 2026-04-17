import { clsx } from 'clsx'

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs)
}

export function formatDateAr(value: string | Date) {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'medium',
  }).format(date)
}
