import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { Product } from "@/features/product/type/type";
interface Return {
    handlePayment: (props: handlePaymentProps) => Promise<void>;
    cancelPayment: (props: cancelPaymentProps) => Promise<void>;
    shipAddress: string;
    setShipAddress: React.Dispatch<React.SetStateAction<string>>;
    isConfirmOrder: boolean;
    setIsConfirmOrder: React.Dispatch<React.SetStateAction<boolean>>;
}
interface handlePaymentProps {
    orderId: Order["id"];
    productNames: Product["name"][];
    totalAmount: number;
}
interface cancelPaymentProps {
    orderId: Order["id"];
    orderDetails: OrderDetail[];
}
/**
 * @desc 결제 Hook
 */
export declare const usePaymentHook: () => Return;
export {};
