import type { APIRoute } from 'astro';
export const prerender = true;
const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://harmonyshop-x8k2.vercel.app';
export const GET: APIRoute = () => {
  const body = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap-index.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
