import Stripe from 'stripe';
export const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });
export function buildLineItem(product: { name: string; description?: string | null; image_url?: string | null; price_pence: number; currency: string; }, quantity = 1): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    quantity,
    price_data: {
      currency: product.currency.toLowerCase(),
      unit_amount: product.price_pence,
      product_data: {
        name: product.name,
        description: product.description ?? undefined,
        images: product.image_url ? [product.image_url] : [],
      },
    },
  };
}
