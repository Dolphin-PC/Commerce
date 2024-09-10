import { CartProductCategory } from "../type";
interface CartProps {
    cart: CartProductCategory;
    children?: React.ReactNode;
}
/**
 * @desc 장바구니 Compound Component
 */
declare const Cart: {
    ({ cart, children }: CartProps): import("react/jsx-runtime").JSX.Element | undefined;
    Product: {
        (): import("react/jsx-runtime").JSX.Element | undefined;
        displayName: string;
    };
};
export default Cart;
