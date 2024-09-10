import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ProductCardImage from "@/features/product_image/ui/ProductCardImage";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { productCategoryPrefetchOptions } from "../api/get-product_category";
/**
 * @desc 목록에서 사용되는 상품 카드 UI
 */
const ProductCard = ({ product, category, viewStyle = "grid", footerContent }) => {
    const qc = useQueryClient();
    const handlePrefetch = () => {
        qc.prefetchQuery(productCategoryPrefetchOptions({ id: product.id }));
    };
    if (viewStyle === "list") {
        return (_jsx(Card, { onMouseEnter: handlePrefetch, className: "hover:translate-x-3 transition-transform duration-300", children: _jsxs(Row, { className: "h-[250px]", children: [_jsx(CardHeader, { className: "w-[250px]", children: _jsx(ProductCardImage, { productId: product.id, height: 200 }) }), _jsxs(Column, { children: [_jsxs(CardContent, { className: "flex flex-col h-full justify-between p-5", children: [_jsxs(Column, { className: "gap-2", children: [category && _jsx(Badge, { className: "w-fit", children: category.categoryName }), _jsx(CardTitle, { children: product.name })] }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { size: "small", children: "\uAC00\uACA9" }), _jsxs(P, { children: [product.price.toLocaleString("ko-KR"), "\uC6D0"] })] })] }), footerContent && _jsx(CardFooter, { children: footerContent })] })] }) }));
    }
    // grid style
    return (_jsxs(Card, { onMouseEnter: handlePrefetch, className: "hover:-translate-y-3 transition-transform duration-300", children: [_jsx(CardHeader, { children: _jsxs(Column, { className: "gap-2", children: [category && _jsx(Badge, { className: "w-fit", children: category.categoryName }), _jsx(CardTitle, { children: product.name })] }) }), _jsx(CardContent, { children: _jsxs(Column, { className: "justify-between", children: [_jsx(ProductCardImage, { productId: product.id, height: 300 }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { size: "small", children: "\uAC00\uACA9" }), _jsxs(P, { children: [product.price.toLocaleString("ko-KR"), "\uC6D0"] })] })] }) })] }));
};
export default ProductCard;
