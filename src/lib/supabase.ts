import { createClient } from '@supabase/supabase-js';

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Create a custom storage implementation that uses memory instead of localStorage
const memoryStorage = {
  storage: new Map<string, string>(),
  getItem: (key: string) => memoryStorage.storage.get(key) || null,
  setItem: (key: string, value: string) => memoryStorage.storage.set(key, value),
  removeItem: (key: string) => memoryStorage.storage.delete(key),
  clear: () => memoryStorage.storage.clear(),
  length: 0,
  key: () => null,
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: memoryStorage
    }
  }
);

// Handle auth redirect
export const handleAuthRedirect = async () => {
  try {
    if (window.location.hash && window.location.hash.includes('access_token')) {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!error && session) {
        const baseUrl = import.meta.env.BASE_URL || '/';
        window.location.replace(window.location.origin + baseUrl);
      }
    }
  } catch (error) {
    console.error('Auth redirect error:', error);
  }
};