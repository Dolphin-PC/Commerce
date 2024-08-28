import { User } from "@/features/user/model/type";
import { Cart } from "../type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { staleTime } from "@/shared/consts/staleTime";

/**
 * @desc 장바구니 목록 조회
 */

interface Props {
  userId: User["id"];
}

type Return = Cart[];

const getCartList = async ({ userId }: Props): Promise<Return> => {
  const { data, error } = await supabase.from("cart").select().eq("userId", userId);
  if (error) throw error;

  return data;
};

export const useCartListQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.cart, queryKey.list, props.userId],
    queryFn: () => getCartList(props),
    staleTime: staleTime.cart,
  });
};
