import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useDeleteProduct } from "@/features/product/api/delete-product";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategoryQuery } from "@/features/product/api/get-product_category";
import { useProductImageQuery } from "@/features/product_image/api/get_list-product-image";
import { bucketBaseUrl } from "@/features/product_image/const/bucket";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
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
const _DashboardProductDetailPage = () => {
    const { id } = useParams();
    const productId = Number(id);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const productCategory = useProductCategoryQuery({ id: productId, sellerId: user?.id });
    const quantity = useProductQuantity({ id: productId, sellerId: user?.id });
    const productImage = useProductImageQuery({ productId });
    const deleteMutation = useDeleteProduct();
    const handleDelete = () => {
        deleteMutation.mutate({ productId }, {
            onSuccess: () => {
                toast({ title: "상품이 삭제되었습니다." });
                navigate(ROUTES.DASHBOARD__PRODUCTS);
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
    if (productCategory.error || productImage.error)
        return _jsx(CenterError, {});
    return (_jsxs(Column, { className: "gap-3", children: [_jsx(Button, { asChild: true, className: "w-[100px]", children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS, children: "\uC0C1\uD488 \uBAA9\uB85D" }) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "justify-between", children: [_jsx(CardTitle, { children: "\uC0C1\uD488 \uC815\uBCF4" }), _jsxs(Row, { className: "gap-5", children: [_jsx(ConfirmDialog, { title: "\uC0C1\uD488 \uC0AD\uC81C", description: "\uC0C1\uD488\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", cancelText: "\uCDE8\uC18C", confirmText: "\uC0AD\uC81C", confirmAction: handleDelete, triggerComponent: _jsx(Button, { children: "\uC0AD\uC81C" }) }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS__EDIT__ID(productId), children: "\uC218\uC815" }) })] })] }) }), _jsxs(CardContent, { children: [_jsxs(CardContent, { children: [_jsx(H4, { children: "\uC0C1\uD488 \uCE74\uD14C\uACE0\uB9AC" }), _jsx("p", { children: productCategory.data?.category?.categoryName })] }), _jsxs(CardContent, { children: [_jsx(H4, { children: "\uC0C1\uD488 \uBA85" }), _jsx("p", { children: productCategory.data?.name })] }), _jsxs(CardContent, { children: [_jsx(H4, { children: "\uC0C1\uD488 \uAC00\uACA9" }), _jsxs("p", { children: [productCategory.data?.price.toLocaleString("ko-KR"), " \uC6D0"] })] }), _jsxs(CardContent, { children: [_jsx(H4, { children: "\uC0C1\uD488 \uC218\uB7C9" }), _jsxs("p", { children: [quantity.data?.quantity.toLocaleString("ko-KR"), " \uAC1C"] })] }), _jsxs(CardContent, { children: [_jsx(H4, { children: "\uC0C1\uD488 \uC774\uBBF8\uC9C0" }), _jsxs(Row, { className: "gap-5 flex-wrap", children: [productImage.data?.length === 0 && _jsx("p", { children: "\uB4F1\uB85D\uB41C \uC774\uBBF8\uC9C0\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }), productImage.data?.map((image) => (_jsx(ConfirmDialog, { title: "\uC5C5\uB85C\uB4DC \uC774\uBBF8\uC9C0", description: "", triggerComponent: _jsx("img", { src: bucketBaseUrl + "/" + image.thumnailUrl, alt: image.thumnailUrl, className: "w-24 h-24 object-cover" }, image.id), children: _jsx("img", { src: bucketBaseUrl + "/" + image.imgUrl, alt: image.imgUrl, className: "w-full h-full object-cover" }) }, image.id)))] })] })] })] })] }));
};
export default function DashboardProductDetailPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_DashboardProductDetailPage, {}) }));
}
