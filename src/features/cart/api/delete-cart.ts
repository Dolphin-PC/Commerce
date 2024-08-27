import { Cart } from "../type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";

/**
 * @desc 장바구니 삭제
 */

interface Props {
  id: Cart["id"];
}

type Return = void;

const deleteCart = async ({ id }: Props): Promise<Return> => {
  const { error } = await supabase.from("cart").delete().eq("id", id);
  if (error) throw error;
};

export const useDeleteCart = () => {
  return useMutation({
    mutationKey: ["useDeleteCart"],
    mutationFn: deleteCart,
  });
};
