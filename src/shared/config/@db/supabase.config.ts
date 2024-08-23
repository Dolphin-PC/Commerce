import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database-generated.type";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseSecretKey = import.meta.env.VITE_SUPABASE_SECRET_KEY;

export const supabase:SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseSecretKey);
