import { supabase } from "../@db/supabase.config";
import { User } from "./type";

export const getUserInfo = async (email: string): Promise<User | null> => {
  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();
  return data;
};
