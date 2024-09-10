import { jsx as _jsx } from "react/jsx-runtime";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { convertStringToNumber } from "@/shared/lib/string";
import { useLayoutEffect, useState } from "react";
import { useCartQuery } from "../api/get-cart";
import { usePutCart } from "../api/put-cart";
/**
 * @desc 장바구니 상품 수정 버튼
 */
const CartUpdateButton = ({ id }) => {
    const [quantity, setQuantity] = useState(0);
    const q = useCartQuery({ id });
    const mtt = usePutCart();
    const handleChangeQuantity = (e) => {
        const { value } = e.target;
        setQuantity(convertStringToNumber(value));
    };
    const handleUpdateQuantity = () => {
        if (!q.data)
            return;
        const cart = q.data;
        mtt.mutate({ cart, newQuantity: Number(quantity) });
    };
    useLayoutEffect(() => {
        if (q.data) {
            setQuantity(q.data.quantity);
        }
    }, [q.data]);
    return (_jsx(ConfirmDialog, { title: "\uC218\uB7C9 \uBCC0\uACBD", description: "\uBCC0\uACBD\uD560 \uC218\uB7C9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", triggerComponent: _jsx(Button, { variant: "ghost", className: "w-full", children: "\uC218\uB7C9\uBCC0\uACBD" }), cancelAction: () => { }, confirmAction: handleUpdateQuantity, cancelText: "\uCDE8\uC18C", confirmText: "\uBCC0\uACBD", children: _jsx(Input, { type: "text", value: quantity.toLocaleString("ko-KR"), onChange: handleChangeQuantity }) }));
};
export default CartUpdateButton;
