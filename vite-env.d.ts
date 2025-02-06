/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_DISCORD_CLIENT_ID: string
  readonly VITE_DISCORD_REDIRECT_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}