import { supabase } from "@/shared/config/@db/supabase.config";
import { Cart } from "../type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { isEnableCartQuantity } from "./is-enable-cart-quantity";
import { toast } from "@/shared/components/ui/use-toast";

/**
 * @desc 장바구니 상품 수량 업데이트
 */

interface Props {
  cart: Cart;
  newQuantity: number;
}

type Return = Cart;

const putCart = async ({ cart, newQuantity }: Props): Promise<Return> => {
  const flag = await isEnableCartQuantity({ productId: cart.productId, newQuantity });
  if (!flag) throw new Error("요청하신 수량이 재고보다 많습니다.");

  const { data, error } = await supabase
    .from("cart")
    .update({
      quantity: newQuantity,
    })
    .eq("id", cart.id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const usePutCart = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["usePutCart"],
    mutationFn: putCart,
    onSuccess: () => {
      qc.refetchQueries({ queryKey: [queryKey.cart] });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "장바구니 변경 실패",
        description: error.message,
      });
    },
  });
};
