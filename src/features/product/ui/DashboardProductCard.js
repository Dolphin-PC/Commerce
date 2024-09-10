import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate } from "@/shared/lib/date";
import { FilePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";
const DashboardProductCard = ({ product }) => {
    return (_jsxs(Card, { className: "", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: product.name }) }), _jsx(CardContent, { children: _jsxs(Column, { children: [_jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { children: "\uAC00\uACA9" }), _jsxs(P, { children: [product.price.toLocaleString("ko-KR"), "\uC6D0"] })] }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { children: "\uC218\uB7C9" }), _jsxs(P, { children: [product.quantity.toLocaleString("ko-KR"), "\uAC1C"] })] }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { children: "\uB4F1\uB85D\uC77C" }), _jsx(P, { children: formatDate(new Date(product.createdAt)) })] }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { children: "\uC218\uC815\uC77C" }), _jsx(P, { children: formatDate(new Date(product.updatedAt)) })] })] }) }), _jsx(CardFooter, { className: "w-full", children: _jsxs(Row, { className: "w-full justify-between", children: [_jsx(Button, { asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS_ID_(product.id), children: "\uC0C1\uC138\uBCF4\uAE30" }) }), _jsxs(Row, { className: "gap-2", children: [_jsx(Button, { children: _jsx(FilePen, {}) }), _jsx(Button, { variant: "destructive", children: _jsx(Trash2, {}) })] })] }) })] }));
};
export default DashboardProductCard;
