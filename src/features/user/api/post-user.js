import { supabase } from "@/shared/config/@db/supabase.config";
export const addNewUser = async ({ email, id, isseller, nickname }) => {
    const { data, error } = await supabase
        .from("user")
        .insert([
        {
            id,
            email,
            nickname,
            isseller,
        },
    ])
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
