import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { useDeleteCart } from "../api/delete-cart";
/**
 * @desc 장바구니 상품 삭제 버튼
 */
const CartDeleteButton = ({ id, isNeedConfirm }) => {
    const mtt = useDeleteCart();
    const handleDeleteCart = () => {
        mtt.mutate({ id }, {
            onSuccess: () => {
                toast({ title: "장바구니에서 삭제되었습니다." });
            },
        });
    };
    if (isNeedConfirm) {
        return (_jsx(ConfirmDialog, { title: "\uC7A5\uBC14\uAD6C\uB2C8 \uC0AD\uC81C", description: "\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", cancelText: "\uCDE8\uC18C", cancelAction: () => { }, confirmAction: handleDeleteCart, confirmText: "\uC0AD\uC81C", triggerComponent: _jsx(Button, { variant: "ghost", size: "icon", className: "w-full", children: "\uC0AD\uC81C" }) }));
    }
    return (_jsx(Button, { variant: "ghost", size: "icon", onClick: handleDeleteCart, className: "w-full", children: "\uC0AD\uC81C" }));
};
export default CartDeleteButton;
