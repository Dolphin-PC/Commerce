import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CenterError } from "@/shared/components/molecules/Error";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmOrder } from "./hook/useConfirmOrder";
import Row from "@/shared/components/atoms/Row";
/**
 * @desc 결제 완료시, Redirect
 *  - queryParam
 *   - paymentId: 결제 ID
 *   - code: 결제 상태 코드
 *   - message: 결제 상태 메시지
 * @see https://developers.portone.io/opi/ko/integration/start/v2/checkout?v=v2#3-%EA%B2%B0%EC%A0%9C-%EC%99%84%EB%A3%8C-%EC%B2%98%EB%A6%AC-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80
 */
const OrderRediretPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const code = searchParams.get("code");
    const message = searchParams.get("message");
    const [isConfirmLoading, setIsConfirmLoading] = useState(true);
    const [order, setOrder] = useState(null);
    const { getOrder, handleConfirmOrder } = useConfirmOrder();
    useEffect(() => {
        if (!paymentId) {
            navigate(ROUTES.HOME);
            return;
        }
        getOrder(paymentId).then((order) => {
            if (order.status !== "PAY_COMPLETE") {
                navigate(ROUTES.HOME);
                return;
            }
            handleConfirmOrder(paymentId).then(() => {
                setIsConfirmLoading(false);
            });
            setOrder(order);
        });
    }, []);
    if (isConfirmLoading) {
        return _jsx(CenterLoading, {});
    }
    if (code && message) {
        return (_jsx(CenterLayout, { children: _jsx(CenterError, { children: _jsx("div", { className: "w-1/2 p-4 m-2 bg-slate-100 rounded-md", children: message }) }) }));
    }
    return (_jsxs(CenterLayout, { children: [_jsx(CheckCircle, { size: 100, className: "text-green-600" }), _jsx("div", { className: "w-1/2 p-4 m-2 bg-slate-100 rounded-md text-center", children: "\uACB0\uC81C\uAC00 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4." }), _jsxs(Row, { className: "items-center gap-3", children: [_jsx(Button, { variant: "outline", asChild: true, children: _jsx(Link, { to: ROUTES.HOME, children: "\uC0C1\uD488 \uB458\uB7EC\uBCF4\uAE30" }) }), order && (_jsx(Button, { asChild: true, children: _jsx(Link, { to: ROUTES.MY__ORDERS_ID_(String(order.id)), children: "\uAD6C\uB9E4\uB0B4\uC5ED \uBCF4\uAE30" }) }))] })] }));
};
export default OrderRediretPage;
