/// <reference types="vite/client" />

// svg
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_SECRET_KEY: string;
  readonly VITE_BUCKET_BASE_URL: string;
  readonly VITE_OAUTH_REDIRECT_URI: string;
  readonly VITE_STORE_ID: string;
  readonly VITE_CHANNEL_KEY_TOSS: string;
  readonly VITE_PORTONE_SECRET_KEY: string;
  readonly VITE_USER_SELLER_ID: string;
  readonly VITE_USER_SELLER_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
