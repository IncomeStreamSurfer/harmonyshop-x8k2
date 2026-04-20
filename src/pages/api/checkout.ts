import type { APIRoute } from 'astro';
import { stripe, buildLineItem } from '../../lib/stripe';
import { supabase } from '../../lib/supabase';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  try {
    const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? 'harmonyshop-x8k2.vercel.app';
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    const origin = import.meta.env.PUBLIC_SITE_URL || `${proto}://${host}`;
    const body = await request.formData();
    const productSlug = body.get('product_slug')?.toString() || '';
    const color = body.get('color')?.toString() || '';
    const size = body.get('size')?.toString() || '';
    const { data: product, error } = await supabase.from('products').select('*').eq('slug', productSlug).single();
    if (error || !product) { return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 }); }
    const variantName = [color, size].filter(Boolean).join(' / ');
    const lineItem = buildLineItem({ ...product, name: variantName ? `${product.name} — ${variantName}` : product.name }, 1);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [lineItem],
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/product/${productSlug}?color=${color}&cancelled=1`,
      metadata: { product_slug: productSlug, color, size, product_id: product.id },
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'SE'] },
      allow_promotion_codes: true,
    });
    return new Response(null, { status: 303, headers: { Location: session.url! } });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
