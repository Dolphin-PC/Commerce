import { supabase } from "@/shared/config/@db/supabase.config";
import { upload } from "../../@storage/storage.api";
import { ProductImage } from "../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

/**
 * 제품이미지 등록
 */

interface Props {
  productId: number;
  file: File;
}

type Return = ProductImage;

export const addProductImage = async ({ file, productId }: Props): Promise<Return> => {
  const fullPath = await upload(file, productId);

  const { data, error } = await supabase.from("product_image").insert({ productId, imgUrl: fullPath }).select().single();

  if (error) throw error;
  return data;
};

export const useAddProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props: Props) => addProductImage(props),
    onSuccess: (res) => {
      queryClient.refetchQueries({ queryKey: [queryKey.product, queryKey.image, res.productId] });
    },
  });
};
