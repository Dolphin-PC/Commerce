import { Product } from "@/features/product/type/type";
import { ReactNode } from "react";
interface OrderDialogMainProps {
    children: ReactNode;
    trigger: ReactNode;
    product: Omit<Product, "quantity">;
    quantity: Product["quantity"];
}
/**
 * @desc 주문 결제창 Dialog
 */
declare const OrderDialog: ({ children, trigger, product, quantity }: OrderDialogMainProps) => import("react/jsx-runtime").JSX.Element;
export default OrderDialog;
