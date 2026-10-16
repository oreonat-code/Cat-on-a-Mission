import { createClient } from '@supabase/supabase-js';

// Service-role key: server-side only, never expose to the client.
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
