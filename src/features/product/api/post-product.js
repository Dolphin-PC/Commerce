import { supabase } from "@/shared/config/@db/supabase.config";
export const addProduct = async (insert) => {
    const { data, error } = await supabase.from("product").insert([insert]).select().single();
    if (error)
        throw error;
    if (!data)
        throw Error("등록된 데이터가 조회되지 않았어요.");
    return data;
};
