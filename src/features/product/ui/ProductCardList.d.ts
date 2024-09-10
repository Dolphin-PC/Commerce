import { Category } from "@/features/category/model/type";
/**
 * @desc 카테고리별 상품 리스트
 */
interface Props {
    category?: Category;
    count?: number;
}
declare const ProductCardList: ({ category, count }: Props) => import("react/jsx-runtime").JSX.Element;
export default ProductCardList;
