import { env } from '@/lib/env'

export async function sendWelcomeEmail(email: string, name: string) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    console.info(`Skipping welcome email for ${email}; SMTP is not configured.`)
    return
  }

  const nodemailer = await import('nodemailer')
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 587),
    secure: Number(env.SMTP_PORT || 587) === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: env.SMTP_FROM || env.SMTP_USER,
    to: email,
    subject: 'مرحباً بك في Safekeep',
    text: `أهلاً ${name}، تم إنشاء حسابك بنجاح في Safekeep.`,
  })
}
