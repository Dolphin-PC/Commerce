import { useQuery } from "@tanstack/react-query";
import { Category } from "../model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { Tables } from "@/shared/config/@db/database-generated.type";

interface Props {
  id: Tables<"category">["id"];
}

type Return = Category | null;

const getCategoryById = async ({id}:Props): Promise<Return> => {
  const res = await supabase.from("category").select("*").eq("id", id).single();

  return res.data;
};

export const useCategoryQuery = (props:Props) => {
  return useQuery({
    queryKey: ["category", {...props}],
    queryFn: () => getCategoryById(props),
    staleTime: Infinity,
    enabled: !!props.id,
  });
};
