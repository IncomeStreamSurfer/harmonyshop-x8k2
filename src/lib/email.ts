const RESEND_API_KEY = import.meta.env.RESEND_API_KEY || '';
const FROM = 'onboarding@resend.dev';

export async function sendOrderConfirmation(opts: { to: string; orderAmount: number; currency: string; items: any[]; }): Promise<void> {
  const { to, orderAmount, currency, items } = opts;
  const currencySymbol = currency.toUpperCase() === 'USD' ? '$' : currency.toUpperCase() + ' ';
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: `Harmony Threads <${FROM}>`,
      to,
      subject: `Your Harmony Threads order is confirmed! 🎸`,
      html: `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0f0f0f;color:#f5f5f5;border-radius:8px;"><h1 style="color:#E8472A;">Order confirmed!</h1><p style="color:#9a9a9a;">Thanks for supporting the music. Your tee is on its way.</p><p style="font-size:1.1rem;font-weight:bold;">Total: ${currencySymbol}${(orderAmount/100).toFixed(2)}</p></div>`,
    }),
  });
}

export async function sendContactNotification(opts: { name: string; email: string; message: string; }): Promise<void> {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: `Harmony Threads Contact <${FROM}>`, to: FROM, subject: `New contact from ${opts.name}`, html: `<p><strong>From:</strong> ${opts.name} (${opts.email})</p><p>${opts.message}</p>` }),
  });
}
