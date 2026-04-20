import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const body = await request.formData();
  const email = body.get('email')?.toString() || '';
  if (!email) { return new Response(JSON.stringify({ error: 'Email required' }), { status: 400 }); }
  await supabaseAdmin.from('subscribers').upsert({ email, source: 'blog' }, { onConflict: 'email' });
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'harmonyshop-x8k2.vercel.app';
  const proto = request.headers.get('x-forwarded-proto') ?? 'https';
  const origin = import.meta.env.PUBLIC_SITE_URL || `${proto}://${host}`;
  return new Response(null, { status: 303, headers: { Location: `${origin}/blog?subscribed=1` } });
};
