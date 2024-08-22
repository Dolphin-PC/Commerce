import { supabase } from "@/entities/@db/supabase.config";
import { AuthError } from "@supabase/supabase-js";

interface Props {
  email: string;
  password: string;
  nickname: string;
  isseller: boolean;
}

export const signup = async ({
  email,
  password,
  nickname,
  isseller,
}: Props): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (data.user?.email) {
      const { email } = data.user;

      await supabase.from("user").insert([
        {
          email,
          nickname,
          isseller,
        },
      ]);
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.message;
    }
    throw "알수 없는 오류가 발생했습니다.";
  }
};
