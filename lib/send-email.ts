// Изпращане на известия по имейл чрез Resend REST API (без допълнителни пакети).
// Настройка: задайте RESEND_API_KEY, BOOKING_TO_EMAIL и BOOKING_FROM_EMAIL в .env
// (вижте .env.example). Домейнът на подателя трябва да е верифициран в Resend.
// Без зададен ключ съобщението се логва в конзолата - удобно при разработка.

type EmailPayload = {
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendNotificationEmail({ subject, html, replyTo }: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.log(`[форма | dev режим] ${subject}\n${html}`);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend отговори с грешка:", res.status, await res.text());
    }
    return res.ok;
  } catch (error) {
    console.error("Неуспешно изпращане на имейл:", error);
    return false;
  }
}
