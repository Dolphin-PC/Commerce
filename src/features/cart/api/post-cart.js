import { toast } from "@/shared/components/ui/use-toast";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isEnableCartQuantity } from "./is-enable-cart-quantity";
const postCart = async (insert) => {
    if (await isExistsCart(insert))
        throw new Error("이미 장바구니에 담긴 상품입니다.");
    if (!(await isEnableCartQuantity({ productId: insert.productId, newQuantity: insert.quantity })))
        throw new Error("요청하신 수량이 재고보다 많습니다.");
    const { data, error } = await supabase.from("cart").insert([insert]).select().single();
    if (error)
        throw error;
    return data;
};
const isExistsCart = async ({ productId, userId }) => {
    const { data, error } = await supabase.from("cart").select().eq("productId", productId).eq("userId", userId);
    if (error)
        throw error;
    return data.length > 0;
};
export const useCartPost = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationKey: ["useCartPost"],
        mutationFn: postCart,
        onSuccess: () => {
            qc.refetchQueries({ queryKey: [queryKey.cart] });
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "장바구니 담기 실패",
                description: error.message,
            });
        },
    });
};
