import { Product_Quantity } from "@/features/product/type/type";
interface Props {
    productCount: number;
    product: Product_Quantity;
}
/**
 * @desc 장바구니담기 버튼
 */
declare const CartAddButton: ({ product, productCount }: Props) => import("react/jsx-runtime").JSX.Element;
export default CartAddButton;
