import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
import { CartProductCategory } from "../type";

/**
 * @desc 장바구니 상품(카테고리) 목록조회
 */

interface Props {
  userId: User["id"];
}

type Return = CartProductCategory[];

export const getCartProductCategory = async ({ userId }: Props): Promise<Return> => {
  const q = supabase.from("cart").select("*, product(*, category(*))").eq("userId", userId);

  const { data, error } = await q;

  if (error) throw error;
  return data;
};

interface QueryProps {
  userId?: User["id"];
}

export const useCartProductCategoryQuery = (props: QueryProps) => {
  return useQuery({
    queryKey: [queryKey.cart, queryKey.product, props.userId],
    queryFn: () => {
      if (props.userId) {
        return getCartProductCategory({ userId: props.userId });
      }
    },
    staleTime: staleTime.cart,
    enabled: !!props.userId,
  });
};
