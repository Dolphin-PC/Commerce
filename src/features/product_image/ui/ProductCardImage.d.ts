import { ProductImage } from "../type/type";
interface Props {
    productId: ProductImage["productId"];
    height: number;
}
/**
 * @desc 상품 이미지
 */
declare const ProductCardImage: ({ height, productId }: Props) => import("react/jsx-runtime").JSX.Element | null;
export default ProductCardImage;
