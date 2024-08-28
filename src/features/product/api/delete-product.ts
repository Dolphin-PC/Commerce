/**
 * 제품 삭제
 */

import { supabase } from "@/shared/config/@db/supabase.config";
import { Product } from "../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

interface Props {
  productId: Product["id"];
}

type Return = Product["id"];

const deleteProduct = async ({ productId }: Props): Promise<Return> => {
  await supabase.from("product").update({ isDelete: true }).eq("id", productId);

  return productId;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: (productId) => queryClient.removeQueries({ queryKey: [queryKey.product, productId] }),
  });
};
