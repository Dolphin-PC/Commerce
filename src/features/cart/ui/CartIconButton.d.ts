import { User } from "@/features/user/model/type";
interface Props {
    userId: User["id"];
}
/**
 * @desc 장바구니 아이콘 버튼
 */
declare const CartIconButton: ({ userId }: Props) => import("react/jsx-runtime").JSX.Element;
export default CartIconButton;
