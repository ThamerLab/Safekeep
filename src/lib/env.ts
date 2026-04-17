import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL must be a valid URL'),
  NEXTAUTH_SECRET: z.string().min(24, 'NEXTAUTH_SECRET must be at least 24 characters'),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal('')).default(''),
  SMTP_HOST: z.string().optional().or(z.literal('')).default(''),
  SMTP_PORT: z.string().optional().or(z.literal('587')).default('587'),
  SMTP_USER: z.string().optional().or(z.literal('')).default(''),
  SMTP_PASS: z.string().optional().or(z.literal('')).default(''),
  SMTP_FROM: z.string().optional().or(z.literal('')).default(''),
})

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
})

if (!parsed.success) {
  console.error('Invalid environment configuration', parsed.error.flatten().fieldErrors)
  throw new Error('Environment variables are invalid. Check server configuration.')
}

export const env = parsed.data
