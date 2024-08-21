import { supabase } from "../@db/supabase.config";
import { User } from "./type";

export const getUserInfo = async (email: string): Promise<User> => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw error;
  if (!data) throw new Error("사용자를 찾을 수 없습니다.");

  return data;
};
