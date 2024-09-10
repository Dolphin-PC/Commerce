import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import CartAddButton from "@/features/cart/ui/CartAddButton";
import CartViewDrawer from "@/features/cart/ui/CartViewDrawer";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategorySuspenseQuery } from "@/features/product/api/get-product_category";
import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H2, H3, H4, Large, T } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { convertStringToNumber } from "@/shared/lib/string";
import MainLayout from "@/widgets/MainLayout";
import { HeartIcon, Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { Fragment, useLayoutEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailPageHelmet } from "../Helmets";
import OrderDialog from "./ui/OrderDialog";
import RecommendProductList from "./ui/RecommendProductList";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
/**
 * @desc 상품 상세 페이지
 *  - /products/:id
 *
 * * params
 *  - id: productId
 */
const _ProductDetailPage = () => {
    useScrollTop();
    const { id } = useParams();
    const productId = Number(id);
    const [productCount, setProductCount] = useState(0);
    const user = useAuthStore((state) => state.user);
    const { data: product } = useProductCategorySuspenseQuery({ id: productId });
    const { data: cartProductList } = useCartProductCategoryQuery({ userId: user?.id });
    const { data: quantity } = useProductQuantity({ id: productId });
    const isProductInCart = useMemo(() => cartProductList?.some((cart) => cart.product?.id === productId), [cartProductList, productId]);
    const handleChangeProductCount = (newCount) => {
        if (!quantity)
            return;
        if (quantity.quantity < newCount)
            newCount = quantity.quantity;
        setProductCount(newCount);
    };
    const handleLike = () => { };
    // 추천 상품에 의해 페이지 이동시 제품 수량 초기화
    useLayoutEffect(() => {
        setProductCount(0);
    }, [productId]);
    return (_jsxs(Column, { className: "gap-20", children: [_jsx(Column, { className: "gap-2", children: _jsxs(Row, { className: "gap-3 h-[500px] items-start", children: [_jsx(Card, { className: "w-1/2 h-full", children: _jsx(ProductImageCarousel.Container, { productId: productId, height: 500, isButton: true }) }), _jsxs(Card, { className: "relative w-1/2 min-h-full flex flex-col justify-start", children: [_jsxs(CardHeader, { children: [_jsx(H3, { children: product.name }), _jsxs(H2, { children: [product.price.toLocaleString("ko-KR"), " \uC6D0"] }), _jsxs(Column, { className: "absolute top-0 right-3", children: [isProductInCart && cartProductList && (_jsx(CartViewDrawer, { data: cartProductList, trigger: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(ShoppingCartIcon, {}) }) })), _jsx(Button, { variant: "ghost", size: "icon", onClick: handleLike, children: _jsx(HeartIcon, {}) })] })] }), _jsxs(CardContent, { children: [_jsx(Badge, { children: "\uC0C1\uD488\uC124\uBA85" }), _jsx("p", { children: product.desc }), _jsx(Badge, { children: "\uB0A8\uC740\uC218\uB7C9" }), quantity && _jsxs("p", { children: [quantity.quantity.toLocaleString("ko-KR"), " \uAC1C"] })] }), _jsx(CardFooter, { children: _jsxs(Column, { className: "w-full gap-3", children: [_jsx("hr", {}), quantity && quantity.quantity > 0 ? (_jsxs(Fragment, { children: [_jsxs(Row, { children: [_jsx(Button, { size: "icon", onClick: () => handleChangeProductCount(productCount - 1), disabled: productCount === 0, children: _jsx(Minus, {}) }), _jsx(Input, { type: "text", className: "w-24", value: productCount.toLocaleString(), onChange: (e) => handleChangeProductCount(convertStringToNumber(e.target.value)) }), _jsx(Button, { size: "icon", onClick: () => handleChangeProductCount(productCount + 1), disabled: !quantity || quantity.quantity <= productCount, children: _jsx(Plus, {}) })] }), _jsxs(Column, { className: "w-full gap-2", children: [_jsxs(Row, { className: "m-2 justify-between", children: [_jsx(Large, { children: "\uCD1D \uAE08\uC561" }), _jsxs(H4, { children: [(product.price * productCount).toLocaleString("ko-KR"), " \uC6D0"] })] }), user && product && quantity && (_jsxs(OrderDialog, { trigger: _jsx(Button, { disabled: productCount == 0, children: "\uAD6C\uB9E4" }), product: product, quantity: productCount, children: [_jsx(BadgeRowLead, { badge: "\uAD6C\uB9E4\uC218\uB7C9", lead: `${productCount}개` }), _jsx(BadgeRowLead, { badge: "\uACB0\uC81C\uAE08\uC561", lead: `${(product.price * productCount).toLocaleString("ko-KR")}원` })] })), !isProductInCart && _jsx(CartAddButton, { product: product, productCount: productCount })] })] })) : (_jsx(T.Blockquote, { children: "\uC0C1\uD488\uC774 \uD488\uC808\uB418\uC5C8\uC5B4\uC694." }))] }) })] })] }) }), product.category && _jsx(RecommendProductList, { id: productId, category: product.category })] }));
};
export default function ProductDetailPage() {
    return (_jsxs(MainLayout, { children: [_jsx(ProductDetailPageHelmet, {}), _jsx(_ProductDetailPage, {})] }));
}
