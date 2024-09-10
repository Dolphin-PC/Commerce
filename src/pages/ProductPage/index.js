import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { GridWindowLayout, ListWindowLayout } from "@/shared/components/templates/WindowLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/MainLayout";
import { useSearchDrawerStore } from "@/widgets/ProductSearchDrawer/store/useSearchDrawerStore";
import { useSearchStore } from "@/widgets/ProductSearchDrawer/store/useSearchStore";
import { LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductPageHelmet } from "../Helmets";
/**
 * @desc 상품 목록 페이지
 *  - /products
 *
 */
const _ProductPage = () => {
    const [orderColumn, setOrderColumn] = useState("createdAt");
    const [viewStyle, setViewStyle] = useState("grid");
    const drawerStore = useSearchDrawerStore((state) => ({ setIsOpen: state.setIsOpen }));
    const searchStore = useSearchStore((state) => ({ searchFilter: state.getSearch() }));
    const product = useProductListCategoryInfiniteQuery({
        order: {
            column: orderColumn,
            ascending: false,
        },
        filter: searchStore.searchFilter,
    });
    // [최신순/가격순] 정렬 기준 변경시
    const handleFilterChange = (value) => {
        if (value === "createdAt" || value === "price") {
            setOrderColumn(value);
        }
    };
    const handleViewStyleChange = (value) => {
        if (value === "grid" || value === "list") {
            setViewStyle(value);
        }
    };
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "justify-between", children: [_jsx(Tabs, { defaultValue: viewStyle, onValueChange: handleViewStyleChange, children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "grid", children: _jsx(LayoutGrid, {}) }), _jsx(TabsTrigger, { value: "list", children: _jsx(LayoutList, {}) })] }) }), _jsxs(Row, { className: "gap-3", children: [_jsx(Tabs, { defaultValue: orderColumn, onValueChange: handleFilterChange, children: _jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "createdAt", children: "\uCD5C\uC2E0\uC21C" }), _jsx(TabsTrigger, { value: "price", children: "\uAC00\uACA9\uC21C" })] }) }), _jsx(Button, { size: "icon", onClick: () => drawerStore.setIsOpen(true), children: _jsx(SlidersHorizontal, { size: 20 }) })] })] }) }), _jsxs(CardContent, { className: "h-5/6", children: [viewStyle === "grid" && product.data && (_jsx(GridWindowLayout, { columnCount: 3, rowHeight: 480, childrens: product.data.pages.flatMap((page) => page.data.map((product) => {
                            return (_jsx(Link, { to: ROUTES.PRODUCTS_ID_(product.id), children: _jsx(ProductCard, { product: product, category: product.category, viewStyle: viewStyle }) }, product.id));
                        })), fetchNextPage: product.fetchNextPage, hasNextPage: product.hasNextPage, isNextPageLoading: product.isFetchingNextPage })), viewStyle === "list" && product.data && (_jsx(ListWindowLayout, { itemHeight: 280, childrens: product.data.pages.flatMap((page) => page.data.map((product) => {
                            return (_jsx(Link, { to: ROUTES.PRODUCTS_ID_(product.id), children: _jsx(ProductCard, { product: product, category: product.category, viewStyle: viewStyle }) }, product.id));
                        })), hasNextPage: product.hasNextPage, isNextPageLoading: product.isFetchingNextPage, fetchNextPage: product.fetchNextPage })), product.data.pages[0].data.length === 0 && _jsx("p", { children: "\uAC80\uC0C9\uB41C \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })] })] }));
};
export default function ProductPage() {
    return (_jsxs(MainLayout, { className: "h-screen", mainClassName: "h-5/6", children: [_jsx(ProductPageHelmet, {}), _jsx(_ProductPage, {})] }));
}
