import { ReactNode } from "react";
import { CartProductCategory } from "../type";
interface Props {
    data: CartProductCategory[];
    trigger: ReactNode;
}
/**
 * @desc 장바구니 Drawer (오른쪽)
 */
declare const CartViewDrawer: ({ data, trigger }: Props) => import("react/jsx-runtime").JSX.Element;
export default CartViewDrawer;
