import { jsx as _jsx } from "react/jsx-runtime";
import { usePutOrderDetail } from "@/features/order_detail/api/put-order_detail";
import { orderDetailStatusObj } from "@/features/order_detail/const/orderDetailStatus";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { useState } from "react";
/**
 * @desc 주문내역 > 주문상태 변경 다이얼로그
 */
const OrderStatusDialog = ({ orderDetail }) => {
    const [selectedValue, setSelectedValue] = useState(orderDetail.status);
    const putOrderDetailMutation = usePutOrderDetail();
    // 다이얼로그가 열릴 때, 값 초기화
    const handleOpenInit = (open) => {
        if (open)
            setSelectedValue(orderDetail.status);
    };
    const handleChangeConfirm = async () => {
        if (selectedValue === orderDetail.status)
            return;
        await putOrderDetailMutation.mutateAsync({
            id: orderDetail.id,
            update: {
                status: selectedValue,
            },
        });
        toast({
            title: "주문 상태가 변경되었습니다.",
        });
    };
    return (_jsx(ConfirmDialog, { title: "\uC8FC\uBB38\uC0C1\uD0DC", description: "\uBCC0\uACBD\uD558\uC2DC\uB824\uB294 \uC8FC\uBB38\uC0C1\uD0DC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.", confirmText: "\uBCC0\uACBD", confirmAction: handleChangeConfirm, cancelText: "\uCDE8\uC18C", onOpenChange: handleOpenInit, triggerComponent: _jsx(Button, { variant: "outline", children: "\uC8FC\uBB38\uC0C1\uD0DC \uBCC0\uACBD" }), children: _jsx("select", { value: selectedValue, onChange: (e) => setSelectedValue(e.target.value), children: Object.entries(orderDetailStatusObj).map(([key, value]) => {
                if (key === "ORDER_WAIT")
                    return null;
                return (_jsx("option", { value: key, children: value }, key));
            }) }) }));
};
export default OrderStatusDialog;
