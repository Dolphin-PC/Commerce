import { supabase } from "@/shared/config/@db/supabase.config";
import { User, UserInsert } from "../model/type";

type Props = UserInsert;

type Return = User | null;

export const addNewUser = async ({email,id,isseller,nickname}: Props): Promise<Return> => {
  const {data,error} = await supabase
  .from("user")
  .insert([
    {
      id,
      email,
      nickname,
      isseller,
    },
  ]).select().single();

  if(error) throw error;

  return data;
};
