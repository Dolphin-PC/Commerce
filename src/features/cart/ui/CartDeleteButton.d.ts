import { Cart } from "../type";
interface Props {
    id: Cart["id"];
    isNeedConfirm?: boolean;
}
/**
 * @desc 장바구니 상품 삭제 버튼
 */
declare const CartDeleteButton: ({ id, isNeedConfirm }: Props) => import("react/jsx-runtime").JSX.Element;
export default CartDeleteButton;
