import { useQuery } from "@tanstack/react-query";
import { supabase } from "../@db/supabase.config";
import { Product } from "./type";

const getProductDetail = async (
  id: string,
  sellerId: string
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .eq("sellerId", sellerId)
    .maybeSingle();

  if (error) throw error;

  return data;
};

export const useProductQuery = (id: string, sellerId: string) => {
  return useQuery({
    queryKey: ["product", id, sellerId],
    queryFn: () => getProductDetail(id, sellerId),
    staleTime: Infinity,
  });
};
