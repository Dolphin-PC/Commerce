import { supabase } from "@/shared/config/@db/supabase.config";
import { Session, User } from "@supabase/supabase-js";

interface Props {
  email: string;
  password: string;
}

interface Return {
  user: User | null;
  session : Session | null;
}

export const signup = async ({
  email,
  password,
}: Props): Promise<Return> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  return data;
};
