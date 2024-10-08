import { supabase } from "@/shared/config/@db/supabase.config";
import { ProductImage } from "../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { deleteUpload } from "@/features/@storage/storage.api";

/**
 * 제품이미지 삭제
 */

type Props = ProductImage;

export const deleteProductImage = async (props: Props): Promise<number> => {
  await deleteUpload([props.imgUrl]);
  await deleteUpload([props.thumnailUrl]);

  const { error } = await supabase.from("product_image").delete().eq("id", props.id);

  if (error) throw error;

  return props.productId;
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProductImage"],
    mutationFn: deleteProductImage,
    onSuccess: (productId) => {
      queryClient.refetchQueries({ queryKey: [queryKey.product, queryKey.image, productId] });
    },
  });
};
