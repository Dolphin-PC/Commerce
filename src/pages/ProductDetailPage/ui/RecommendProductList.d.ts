import { Category } from "@/features/category/model/type";
import { Product } from "@/features/product/type/type";
interface Props {
    id: Product["id"];
    category: Category;
}
/**
 * @desc 해당 상품의 카테고리에 속하는 상품 목록
 */
declare const RecommendProductList: ({ category, id }: Props) => import("react/jsx-runtime").JSX.Element;
export default RecommendProductList;
