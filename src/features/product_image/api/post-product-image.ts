import { supabase } from "@/shared/config/@db/supabase.config";
import { upload } from "../../@storage/storage.api";
import { ProductImage } from "../type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { resizeImageFile } from "@/shared/lib/image";

/**
 * @desc 제품이미지 등록
 *  - 500*500 사이즈 (imgUrl)
 *  - 200*200 사이즈 (thumbnailUrl)
 */

interface Props {
  productId: number;
  file: File;
}

type Return = ProductImage;

export const addProductImage = async ({ file, productId }: Props): Promise<Return> => {
  const resizeImage = await resizeImageFile({ file: file, width: 500, height: 500 });
  const resizeThumnail = await resizeImageFile({ file: file, width: 300, height: 300 });

  const imgUrl = await upload(resizeImage, productId);
  const thumnailUrl = await upload(resizeThumnail, productId);

  const { data, error } = await supabase.from("product_image").insert({ productId, imgUrl, thumnailUrl }).select().single();

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
