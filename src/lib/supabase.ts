import { ImportMetaEnv } from '../vite-env.ts';
import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'implicit',
      storage: window.localStorage
    }
  }
);

// Handle auth redirect
if (window.location.hash && window.location.hash.includes('access_token')) {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (!error && session) {
    window.location.replace(window.location.origin + window.location.pathname);
  }
}