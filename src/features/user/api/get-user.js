import { supabase } from "@/shared/config/@db/supabase.config";
//* 구현
export const getUserInfo = async ({ id }) => {
    const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", id)
        .maybeSingle();
    if (error)
        throw error;
    return data;
};
