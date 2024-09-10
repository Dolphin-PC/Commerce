import { CartProductCategory } from "@/features/cart/type";
import { CheckedState } from "@radix-ui/react-checkbox";
interface Return {
    checkedCartList: CartProductCategory[];
    checkedAll: boolean;
    handleCheckedChange: (cart: CartProductCategory) => (checked: CheckedState) => void;
    handleCheckedAll: (cartList: CartProductCategory[]) => (checked: CheckedState) => void;
    handleDeleteCartList: () => void;
    handleOrder: () => void;
}
export declare const useCartHook: () => Return;
export {};
