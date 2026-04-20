import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRole = import.meta.env.SUPABASE_SERVICE_ROLE || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole || supabaseAnonKey);

export type Product = {
  id: string;
  slug: string;
  name: string;
  short_title: string | null;
  vendor: string | null;
  description: string | null;
  price_pence: number;
  compare_at_pence: number | null;
  currency: string;
  image_url: string | null;
  tags: string[];
  badge: string | null;
  featured: boolean;
};
