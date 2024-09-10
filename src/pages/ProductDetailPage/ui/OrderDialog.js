import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import Row from "@/shared/components/atoms/Row";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { queryKey } from "@/shared/consts/react-query";
import { useNewOrderHook } from "@/widgets/hook/useNewOrderHook";
import { usePaymentHook } from "@/widgets/hook/usePaymentHook";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
/**
 * @desc 주문 결제창 Dialog
 */
const OrderDialog = ({ children, trigger, product, quantity }) => {
    const [open, setOpen] = useState(false);
    const user = useAuthStore((state) => state.getUser());
    const { handleNewOrder } = useNewOrderHook();
    const { cancelPayment, handlePayment, isConfirmOrder, setIsConfirmOrder, setShipAddress, shipAddress } = usePaymentHook();
    const qc = useQueryClient();
    const _handleOrder = async () => {
        setOpen(false);
        const totalAmount = product.price * quantity;
        try {
            // 1. 주문(주문상세) 생성 (재고 수량 테스트)
            const { order, orderDetail } = await handleNewOrder({ productId: product.id, quantity, userId: user.id });
            // 결제처리
            await handlePayment({ orderId: order.id, totalAmount, productNames: [product.name] }).catch((err) => {
                cancelPayment({ orderId: order.id, orderDetails: [orderDetail] });
                throw err;
            });
        }
        catch (err) {
            console.error(err);
            let description = "";
            if (typeof err === "string")
                description = err;
            toast({ title: "상품 결제에 실패했습니다.", description });
            qc.refetchQueries({ queryKey: [queryKey.product] });
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: (o) => setOpen(o), children: [_jsx(DialogTrigger, { asChild: true, children: trigger }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "\uC0C1\uD488 \uC8FC\uBB38" }), _jsx(DialogDescription, {})] }), children, _jsx(Input, { placeholder: "\uBC30\uC1A1\uC9C0\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", value: shipAddress, onChange: (e) => setShipAddress(e.target.value) }), _jsxs(DialogFooter, { className: "justify-between", children: [_jsxs(Row, { className: "items-center gap-3", children: [_jsx(Checkbox, { id: "confirm-order", checked: isConfirmOrder, onCheckedChange: (check) => setIsConfirmOrder(!!check) }), _jsx("label", { htmlFor: "confirm-order", children: "\uC8FC\uBB38 \uB0B4\uC6A9\uC744 \uD655\uC778\uD588\uC2B5\uB2C8\uB2E4." })] }), _jsx(Button, { disabled: !(isConfirmOrder && shipAddress), onClick: _handleOrder, children: "\uACB0\uC81C\uD558\uAE30" })] })] })] }));
};
export default OrderDialog;
