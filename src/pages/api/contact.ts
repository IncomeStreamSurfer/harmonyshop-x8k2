import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import { sendContactNotification } from '../../lib/email';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const body = await request.formData();
  const name = body.get('name')?.toString() || '';
  const email = body.get('email')?.toString() || '';
  const message = body.get('message')?.toString() || '';
  if (!name || !email || !message) { return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 }); }
  await supabaseAdmin.from('contact_messages').insert({ name, email, message });
  try { await sendContactNotification({ name, email, message }); } catch (e) { console.error(e); }
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'harmonyshop-x8k2.vercel.app';
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  const origin = import.meta.env.PUBLIC_SITE_URL || `${proto}://${host}`;
  return new Response(null, { status: 303, headers: { Location: `${origin}/contact?sent=1` } });
};
