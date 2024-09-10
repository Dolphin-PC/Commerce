import { supabase } from "@/shared/config/@db/supabase.config";
const redirectTo = import.meta.env.VITE_OAUTH_REDIRECT_URI;
export const signInOAuth = ({ provider }) => {
    supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo,
        },
    });
};
