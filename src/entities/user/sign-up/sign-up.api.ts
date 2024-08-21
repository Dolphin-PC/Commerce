import { supabase } from "@/entities/@db/supabase.config";

interface Props {
  email: string;
  password: string;
  nickname: string;
}

export const signup = async ({ email, password, nickname }: Props) => {
  await supabase.auth.signUp({
    email,
    password,
  });

  await supabase.from("user").insert([
    {
      email,
      nickname,
    },
  ]);
};
