import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProductListCategoryQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Column from "@/shared/components/atoms/Column";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { H3 } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
/**
 * @desc 해당 상품의 카테고리에 속하는 상품 목록
 */
const RecommendProductList = ({ category, id }) => {
    const { data } = useProductListCategoryQuery({ categoryId: category.id, pageNumber: 0, pageSize: 9 });
    return (_jsxs(Column, { className: "gap-3", children: [_jsxs(Row, { className: "gap-3 items-center", children: [_jsx(Badge, { variant: "outline", size: "large", children: category.categoryName }), _jsx(H3, { children: "\uB2E4\uB978 \uC0C1\uD488" })] }), _jsx(Grid, { className: "grid-cols-4 gap-4", children: data?.data.map((product) => {
                    if (product.id === id)
                        return null;
                    return (_jsx(Link, { to: ROUTES.PRODUCTS_ID_(product.id), children: _jsx(ProductCard, { product: product, category: product.category }, product.id) }, product.id));
                }) })] }));
};
export default RecommendProductList;
