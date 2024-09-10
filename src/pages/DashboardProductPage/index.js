import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import DashboardProductCard from "@/features/product/ui/DashboardProductCard";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
/**
 * 판매자 대시보드 > 상품 페이지
 *  - /dashboard/products
 */
const _DashboardProductPage = () => {
    const user = useAuthStore((state) => state.user);
    const q = useProductListCategoryInfiniteQuery({ sellerId: user?.id });
    const { ref: viewRef, inView } = useInView({ threshold: 0 });
    useEffect(() => {
        if (inView && q.hasNextPage) {
            q.fetchNextPage();
        }
    }, [q, inView]);
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "justify-between", children: [_jsx(CardTitle, { children: "\uB0B4 \uC0C1\uD488" }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS__NEW, children: "\uC0C1\uD488 \uB4F1\uB85D" }) })] }) }), _jsx(CardContent, { children: q.data ? (_jsx(Grid, { className: "grid-cols-3 gap-3", children: q.data.pages.map((page) => page.data.map((product) => {
                        return _jsx(DashboardProductCard, { product: product }, product.id);
                    })) })) : (_jsx("p", { children: "\uB370\uC774\uD130\uAC00 \uC5C6\uC5B4\uC694." })) }), _jsx(CardFooter, { ref: viewRef })] }));
};
export default function DashboardProductPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_DashboardProductPage, {}) }));
}
