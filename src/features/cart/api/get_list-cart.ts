import { User } from "@/features/user/model/type";
import { Cart } from "../type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { K } from "@/shared/consts/queryKey";
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

export const useCartList = (props: Props) => {
  return useQuery({
    queryKey: [K.cart, props.userId],
    queryFn: () => getCartList(props),
    staleTime: staleTime.cart,
  });
};
