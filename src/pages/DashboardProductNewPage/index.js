import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { addProduct } from "@/features/product/api/post-product";
import ProductForm from "@/features/product/ui/ProductForm";
import { useAddProductImage } from "@/features/product_image/api/post-product-image";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { Link, useNavigate } from "react-router-dom";
const _ProductNewPage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const postImageMutation = useAddProductImage();
    const handleAddProduct = async (formData, images) => {
        if (user === null)
            throw Error("로그인이 필요합니다.");
        try {
            const uploadImages = images.filter((e) => e !== null);
            if (uploadImages.length == 0)
                return alert("하나 이상의 이미지를 업로드해주세요.");
            const newProduct = await addProduct({
                categoryId: formData.categoryId,
                name: formData.name,
                desc: formData.desc,
                price: formData.price,
                quantity: formData.quantity,
                sellerId: user.id,
                discountType: formData.discountType,
                discountValue: formData.discountValue,
            });
            Promise.all(uploadImages.map((image) => postImageMutation.mutate({ productId: newProduct.id, file: image }))).then(() => {
                toast({ title: "상품 등록이 완료되었습니다.", description: "상품 페이지로 이동합니다." });
                navigate(ROUTES.DASHBOARD__PRODUCTS_ID_(newProduct.id));
            });
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs(Column, { className: "gap-3", children: [_jsx(Button, { asChild: true, className: "w-[100px]", children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS, children: "\uC0C1\uD488 \uBAA9\uB85D" }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Row, { className: "gap-[20px]", children: _jsx(CardTitle, { children: "\uC0C1\uD488 \uB4F1\uB85D" }) }) }), _jsx(CardContent, { children: _jsx(ProductForm, { onSave: handleAddProduct }) })] })] }));
};
export default function ProductNewPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_ProductNewPage, {}) }));
}
