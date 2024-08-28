import { supabase } from "@/shared/config/@db/supabase.config";
import { Product } from "../type/type";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";

/**
 * 상품 수량 조회 API
 */

interface Props {
  id: Product["id"];
  sellerId?: Product["sellerId"];
}

interface Return {
  quantity: Product["quantity"];
}

const getProductQuantity = async ({ id, sellerId }: Props): Promise<Return> => {
  let q = supabase.from("product").select(`quantity`);

  q = q.eq("id", id);
  if (sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("상품이 존재하지 않습니다.");

  return data;
};

export const useProductQuantity = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.product, queryKey.quantity, props.id],
    queryFn: () => getProductQuantity(props),
  });
};
