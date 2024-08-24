import { supabase } from "@/shared/config/@db/supabase.config";

interface Props {
  provider: "google";
}

const redirectTo = import.meta.env.VITE_OAUTH_REDIRECT_URI as string;

export const signInOAuth = ({ provider }: Props): void => {
  supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
    },
  });
};
