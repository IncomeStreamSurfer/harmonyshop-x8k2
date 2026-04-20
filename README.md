# Harmony Threads

Premium music graphic tees ecommerce site. Built with Astro 5, Tailwind v4, Supabase, and Stripe.

## Stack
- **Frontend**: Astro 5 + Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL + auth)
- **Payments**: Stripe Checkout
- **Email**: Resend
- **Hosting**: Vercel

## Pages
- `/` — Homepage with hero, featured products, testimonials
- `/shop` — Full product listing
- `/product/[slug]` — Product detail with variant selector
- `/collections/graphic-tees` — Collection hub
- `/about` — Brand story
- `/contact` — Contact form
- `/blog` — Blog index (ready for Harbor Writer)
- `/blog/[slug]` — Blog post
- `/order/success` — Post-checkout confirmation

## API Routes
- `POST /api/checkout` — Create Stripe Checkout Session
- `POST /api/stripe/webhook` — Handle `checkout.session.completed`
- `POST /api/contact` — Contact form handler
- `POST /api/subscribe` — Email subscription

## Environment Variables
See `.env.example` for all required variables.

## Next Steps
1. Connect custom domain in Vercel dashboard
2. Verify Resend domain for branded email (currently using onboarding@resend.dev)
3. Switch Stripe to live mode when ready to accept real payments
4. Use Harbor Writer to publish SEO articles into the `content` table
