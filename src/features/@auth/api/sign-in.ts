import { supabase } from "@/shared/config/@db/supabase.config";
import { AuthError, User } from "@supabase/supabase-js";


/**
 * 사용자 로그인
 */



interface Props {
  email: string;
  password: string;
}

type Return = User

export const signInWithPassword = async ({
  email,
  password,
}: Props): Promise<Return> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user.email) throw new AuthError("로그인에 실패했습니다.");

    return data.user;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.message;
    }
    throw "알수 없는 오류가 발생했습니다.";
  }
};
