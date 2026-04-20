import type { APIRoute } from 'astro';
import { stripe } from '../../../lib/stripe';
import { supabaseAdmin } from '../../../lib/supabase';
import { sendOrderConfirmation } from '../../../lib/email';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get('stripe-signature') || '';
  const webhookSecret = import.meta.env.STRIPE_WEBHOOK_SECRET || '';
  let event;
  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    await supabaseAdmin.from('orders').upsert({ stripe_session_id: session.id, email: session.customer_details?.email, amount_total: session.amount_total, currency: session.currency, status: 'paid', shipping: session.shipping_details, items: session.metadata }, { onConflict: 'stripe_session_id' });
    if (session.customer_details?.email) {
      try { await sendOrderConfirmation({ to: session.customer_details.email, orderAmount: session.amount_total, currency: session.currency, items: [session.metadata] }); } catch (e) { console.error(e); }
    }
  }
  return new Response(JSON.stringify({ received: true }), { status: 200 });
};
