import { cn } from "@/shared/lib/shadcn-util";
import { bucketBaseUrl } from "../const/bucket";
import { ProductImage } from "../type/type";
import { useProductImageQuery } from "../api/get_list-product-image";

interface Props {
  productId: ProductImage["productId"];
  height: number;
}

/**
 * @desc 상품 이미지
 */
const ProductCardImage = ({ height, productId }: Props) => {
  const { data: image } = useProductImageQuery({ productId, limit: 1 });

  if (!image) return null;
  return <img loading="lazy" src={bucketBaseUrl + "/" + image[0].thumnailUrl} alt={String(image[0].productId)} className={cn("p-1 object-cover w-full")} style={{ height: `${height}px` }} />;
};

export default ProductCardImage;
