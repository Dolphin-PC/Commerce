import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import ProductCardImage from "@/features/product_image/ui/ProductCardImage";
import { createContext, useContext } from "react";
const CartProductCardContext = createContext(null);
/**
 * @desc 장바구니 Compound Component
 */
const Cart = ({ cart, children }) => {
    const { product } = cart;
    if (product === null)
        return;
    return _jsx(CartProductCardContext.Provider, { value: { cart }, children: children });
};
// 장바구니 > 상품
const Product = () => {
    const context = useContext(CartProductCardContext);
    if (context === null)
        throw new Error("Cart.Product must be used within Cart");
    const { cart } = context;
    const { product } = cart;
    if (product === null)
        return;
    return (_jsxs(Row, { className: "m-4", children: [_jsx(CardHeader, { children: _jsx("div", { className: "h-[120px] w-[100px]", children: _jsx(ProductCardImage, { productId: product.id, height: 100 }) }) }), _jsxs(Column, { className: "justify-between", children: [_jsx(CardContent, { children: _jsxs(Column, { className: "gap-3", children: [_jsx(Badge, { size: "small", className: "w-fit", children: product.category?.categoryName }), _jsx(CardTitle, { children: product.name })] }) }), _jsx(CardFooter, { children: _jsxs(Row, { className: "gap-2", children: [_jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { size: "small", children: "\uAC00\uACA9" }), _jsxs(P, { children: [product.price.toLocaleString("ko-KR"), "\uC6D0"] })] }), _jsxs(Row, { className: "gap-2 items-center", children: [_jsx(Badge, { size: "small", children: "\uAC1C\uC218" }), _jsxs(P, { children: [cart.quantity.toLocaleString("ko-KR"), "\uAC1C"] })] })] }) })] })] }));
};
Product.displayName = "Cart.Product";
Cart.Product = Product;
export default Cart;
