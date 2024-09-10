import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/shared/lib/shadcn-util";
import { bucketBaseUrl } from "../const/bucket";
import { useProductImageQuery } from "../api/get_list-product-image";
/**
 * @desc 상품 이미지
 */
const ProductCardImage = ({ height, productId }) => {
    const { data: image } = useProductImageQuery({ productId, limit: 1 });
    if (!image)
        return null;
    return _jsx("img", { loading: "lazy", src: bucketBaseUrl + "/" + image[0].thumnailUrl, alt: String(image[0].productId), className: cn("p-1 object-cover w-full"), style: { height: `${height}px` } });
};
export default ProductCardImage;
