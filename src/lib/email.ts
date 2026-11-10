import type { Payload } from 'payload'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function sendLeadNotification({
  payload,
  lead,
}: {
  payload: Payload
  lead: {
    name: string
    email: string
    organization?: string | null
    position?: string | null
    phone?: string | null
    message: string
  }
}): Promise<boolean> {
  const smtpConfigured = Boolean(process.env.SMTP_HOST)
  const recipient = process.env.EMAIL_TO || 'admin@example.com'

  if (!smtpConfigured) {
    payload.logger.info('[email] SMTP is not configured, skipping notification.')
    return false
  }

  try {
    const safeName = escapeHtml(lead.name)
    const safeEmail = escapeHtml(lead.email)
    const safeOrg = escapeHtml(lead.organization || 'Не вказано')
    const safePos = escapeHtml(lead.position || 'Не вказано')
    const safePhone = escapeHtml(lead.phone || 'Не вказано')
    const safeMessage = escapeHtml(lead.message).replace(/\n/g, '<br />')

    await payload.sendEmail({
      to: recipient,
      subject: `Нова заявка з сайту MedHelper: ${safeName} (${safePos})`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #101B2B; max-width: 600px;">
          <h2 style="color: #17B8A6; border-bottom: 2px solid #17B8A6; padding-bottom: 8px;">
            Нова заявка на сайті MedHelper
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Імʼя:</td>
              <td style="padding: 8px 0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Посада:</td>
              <td style="padding: 8px 0;">${safePos}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Заклад:</td>
              <td style="padding: 8px 0;">${safeOrg}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Телефон:</td>
              <td style="padding: 8px 0;">${safePhone}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #F7F9FC; border-radius: 8px; border: 1px solid #E9EEF3;">
            <p style="font-weight: bold; margin-top: 0;">Повідомлення:</p>
            <p style="margin-bottom: 0;">${safeMessage}</p>
          </div>
          <p style="font-size: 11px; color: #66768A; margin-top: 24px;">
            Цей лист згенеровано автоматично сервером вебсайту MedHelper.
          </p>
        </div>
      `,
    })

    payload.logger.info(`[email] Notification sent successfully to ${recipient}`)
    return true
  } catch (err) {
    payload.logger.error(`[email] Failed to send notification: ${(err as Error).message}`)
    return false
  }
}
