import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategoryQuery } from "@/features/product/api/get-product_category";
import { useProductPut } from "@/features/product/api/put-product";
import ProductForm from "@/features/product/ui/ProductForm";
import { useProductImageQuery } from "@/features/product_image/api/get_list-product-image";
import { useAddProductImage } from "@/features/product_image/api/post-product-image";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { CenterError } from "@/shared/components/molecules/Error";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const _DashboardProductEditPage = () => {
    const { id } = useParams();
    const productId = Number(id);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const productCategory = useProductCategoryQuery({ id: productId, sellerId: user?.id });
    const quantity = useProductQuantity({ id: productId, sellerId: user?.id });
    const productImage = useProductImageQuery({ productId: Number(productCategory.data?.id) });
    const putProductMutation = useProductPut();
    const postImageMutation = useAddProductImage();
    /** 상품 수정 */
    const handlePutProduct = async (formData, images) => {
        if (user === null)
            throw Error("로그인이 필요합니다.");
        if (!productImage.data)
            throw Error("저장된 상품이미지를 불러오는데 실패했습니다.");
        const uploadImages = images.filter((e) => e !== null);
        if (uploadImages.length + productImage.data.length === 0)
            return alert("하나 이상의 이미지를 업로드해주세요.");
        putProductMutation.mutate({
            id: productId,
            update: {
                categoryId: formData.categoryId,
                name: formData.name,
                desc: formData.desc,
                price: formData.price,
                quantity: formData.quantity,
            },
        }, {
            onSuccess: (res) => {
                Promise.all(uploadImages.map((image) => postImageMutation.mutate({ productId: res.id, file: image }))).then(() => {
                    toast({ title: "상품 수정이 완료되었습니다.", description: "상품 페이지로 이동합니다." });
                    navigate(ROUTES.DASHBOARD__PRODUCTS_ID_(res.id));
                });
            },
            onError: (err) => {
                console.error(err);
                toast({ title: "상품 수정에 실패했습니다.", description: "다시 시도해주세요." });
            },
        });
    };
    useLayoutEffect(() => {
        if (productCategory.isLoading === false && productCategory.data === null) {
            navigate(ROUTES.DASHBOARD__PRODUCTS);
        }
    }, [productCategory, navigate]);
    if (productCategory.isLoading || productImage.isLoading)
        return _jsx(CenterLoading, {});
    if (!productCategory.data || !productImage.data || !quantity.data)
        return _jsx(CenterError, {});
    return (_jsxs(Column, { className: "gap-3", children: [_jsx(Button, { asChild: true, className: "w-[100px]", children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS, children: "\uC0C1\uD488 \uBAA9\uB85D" }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "justify-between", children: [_jsx(CardTitle, { children: "\uC0C1\uD488 \uC815\uBCF4" }), _jsx(ConfirmDialog, { title: "\uC0C1\uC138\uBCF4\uAE30\uB85C \uB3CC\uC544\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", description: "\uC218\uC815\uD558\uC2E0 \uB0B4\uC6A9\uC740 \uC800\uC7A5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.", confirmText: "\uB3CC\uC544\uAC00\uAE30", confirmAction: () => navigate(ROUTES.DASHBOARD__PRODUCTS_ID_(productId)), cancelText: "\uCDE8\uC18C", cancelAction: () => { }, triggerComponent: _jsx(Button, { children: "\uB3CC\uC544\uAC00\uAE30" }) })] }) }), _jsx(CardContent, { children: _jsx(ProductForm, { productCategory: { ...productCategory.data, ...quantity.data }, productImages: productImage.data, onSave: handlePutProduct }) })] })] }));
};
export default function DashboardProductEditPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_DashboardProductEditPage, {}) }));
}
