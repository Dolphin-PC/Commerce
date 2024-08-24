import { supabase } from "@/shared/config/@db/supabase.config";
import { Product, ProductUpdate } from "../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { K } from "@/shared/consts/queryKey";
import { Tables } from "@/shared/config/@db/database-generated.type";

/**
 * 제품 수정
 */

interface Props {
  id: Tables<"product">["id"];
  update: ProductUpdate;
}

type Return = Product;

export const putProduct = async ({ id, update }: Props): Promise<Return> => {
  if (id === undefined) throw Error("id is required");

  const { data, error } = await supabase.from("product").update(update).eq("id", id).select().single();

  if (error) throw error;
  if (!data) throw Error("등록된 데이터가 조회되지 않았어요.");
  return data;
};

export const useProductPut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: Props) => putProduct(props),
    onSuccess: (res) => queryClient.refetchQueries({ queryKey: [K.product, res.id, K.category] }),
  });
};
