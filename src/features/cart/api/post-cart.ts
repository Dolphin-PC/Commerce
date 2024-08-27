import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { Cart } from "../type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { K } from "@/shared/consts/queryKey";

/**
 * @desc 장바구니 추가
 */

interface Props {
  productId: Product["id"];
  userId: User["id"];
  quantity: Product["quantity"];
}

type Return = Cart;

const postCart = async ({ productId, userId, quantity }: Props): Promise<Return> => {
  const { data, error } = await supabase
    .from("cart")
    .insert([
      {
        productId,
        userId,
        quantity,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const useCartPost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["useCartPost"],
    mutationFn: postCart,
    onSuccess: (res: Cart) => {
      qc.refetchQueries({ queryKey: [K.cart, res.userId] });
    },
  });
};
