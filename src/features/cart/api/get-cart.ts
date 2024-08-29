import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
import { Cart } from "../type";

/**
 * @desc 장바구니 단건 조회
 */

interface Props {
  id: Cart["id"];
}

type Return = Cart;

const getCart = async ({ id }: Props): Promise<Return> => {
  const { data, error } = await supabase.from("cart").select().eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("getCart:: data is not exist");

  return data;
};

export const useCartQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.cart, props.id],
    queryFn: () => getCart(props),
    staleTime: staleTime.cart,
  });
};
