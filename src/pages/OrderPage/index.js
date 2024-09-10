import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { Large, Small, T } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/widgets/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetailProductSuspenseQuery } from "../../features/order/api/get-order-detail-product";
import { usePaymentHook } from "../../widgets/hook/usePaymentHook";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo } from "react";
/**
 * @desc 주문 화면
 *  - /orders/:id
 */
const _OrderPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const orderId = Number(id);
    const { id: userId } = useAuthStore((state) => state.getUser());
    const { data: order } = useGetOrderDetailProductSuspenseQuery({ orderId, userId, status: "PAY_BEFORE" });
    const { handlePayment, cancelPayment, isConfirmOrder, setIsConfirmOrder, setShipAddress, shipAddress } = usePaymentHook();
    const totalAmount = useMemo(() => {
        return order.orderDetails.reduce((acc, cur) => {
            if (cur.product === null)
                return acc;
            return acc + cur.quantity * cur.product.price;
        }, 0);
    }, [order.orderDetails]);
    const _handlePayment = async () => {
        const productNames = order.orderDetails.map((o) => o.product.name);
        await handlePayment({ orderId: order.id, totalAmount, productNames });
    };
    const _handleCancelPayment = async () => {
        if (window.confirm("결제를 취소하시겠습니까?")) {
            await cancelPayment({ orderId: order.id, orderDetails: order.orderDetails });
            navigate(ROUTES.CART);
        }
    };
    return (_jsxs(Card, { className: "flex flex-col justify-between", children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "items-center justify-between", children: [_jsx(CardTitle, { children: "\uC8FC\uBB38/\uACB0\uC81C" }), _jsx(Button, { variant: "outline", onClick: _handleCancelPayment, children: "\uACB0\uC81C\uCDE8\uC18C" })] }) }), _jsxs(CardContent, { className: "flex flex-col gap-5", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uBC30\uC1A1\uC9C0 \uC815\uBCF4" }) }), _jsx(CardContent, { children: _jsx(Input, { placeholder: "\uBC30\uC1A1\uC9C0\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", value: shipAddress, onChange: (e) => setShipAddress(e.target.value) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uC8FC\uBB38 \uC815\uBCF4" }) }), _jsx(CardContent, { className: "flex flex-col gap-3", children: order.orderDetails.map((orderDetail) => (_jsx("div", { children: orderDetail.product && (_jsx(ProductCard, { viewStyle: "list", product: orderDetail.product, footerContent: _jsxs(Row, { className: "gap-2 bg-slate-100 p-3 rounded-md", children: [_jsxs(Small, { children: [orderDetail.quantity, "\uAC1C"] }), _jsx(Small, { children: "*" }), _jsxs(Small, { children: [orderDetail.product.price.toLocaleString("ko-KR"), "\uC6D0"] }), _jsx(Small, { children: "=" }), _jsxs(Large, { children: [(orderDetail.quantity * orderDetail.product.price).toLocaleString("ko-KR"), "\uC6D0"] })] }) })) }, orderDetail.id))) })] })] }), _jsx(CardFooter, { className: "sticky bottom-0 bg-white p-3", style: { boxShadow: "0px 0px 2px 0px" }, children: _jsxs(Row, { className: "w-full justify-between", children: [_jsxs(Row, { className: "items-center gap-3", children: [_jsx(Checkbox, { id: "confirm-order", className: "w-8 h-8", checked: isConfirmOrder, onCheckedChange: (check) => setIsConfirmOrder(!!check) }), _jsx("label", { htmlFor: "confirm-order", children: "\uC8FC\uBB38 \uB0B4\uC6A9\uC744 \uD655\uC778\uD588\uC2B5\uB2C8\uB2E4." })] }), _jsxs(Row, { className: "items-center gap-5", children: [_jsxs(T.H4, { children: ["\uCD1D \uC8FC\uBB38 \uAE08\uC561: ", totalAmount.toLocaleString("ko-KR"), "\uC6D0"] }), _jsx(Button, { onClick: _handlePayment, children: "\uACB0\uC81C\uD558\uAE30" })] })] }) })] }));
};
export default function OrderPage() {
    return (_jsx(MainLayout, { className: "h-screen", mainClassName: "h-5/6", children: _jsx(_OrderPage, {}) }));
}
