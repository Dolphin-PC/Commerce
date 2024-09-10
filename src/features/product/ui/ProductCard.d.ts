import { Product } from "../type/type";
import { Category } from "@/features/category/model/type";
interface Props {
    product: Product;
    category?: Category | null;
    viewStyle?: "grid" | "list";
    footerContent?: React.ReactNode;
}
/**
 * @desc 목록에서 사용되는 상품 카드 UI
 */
declare const ProductCard: ({ product, category, viewStyle, footerContent }: Props) => import("react/jsx-runtime").JSX.Element;
export default ProductCard;
