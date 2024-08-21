import { supabase } from "@/entities/@db/supabase.config";
import { AuthError } from "@supabase/supabase-js";

interface Props {
  email: string;
  password: string;
}

export const signInWithPassword = async ({ email, password }: Props) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.message;
    }
    throw "알수 없는 오류가 발생했습니다.";
  }
};
