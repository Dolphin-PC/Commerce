import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import ProductCardList from "@/features/product/ui/ProductCardList";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import { useNavigate } from "react-router-dom";
/**
 * @desc 홈 > 카테고리별 상품 섹션
 *  - /
 */
const CategoryProductList = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useCategoryListQuery({});
    /** 상품 목록 페이지 이동 */
    const moveToProductPage = (categoryId) => {
        const query = new URLSearchParams();
        query.set("categoryId", String(categoryId));
        navigate(`${ROUTES.PRODUCTS}?${query.toString()}`);
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uCE74\uD14C\uACE0\uB9AC\uBCC4 \uC0C1\uD488" }) }), _jsxs(CardContent, { children: [!isLoading && !data && _jsx("div", { children: "\uCE74\uD14C\uACE0\uB9AC \uC815\uBCF4\uAC00 \uC5C6\uC5B4\uC694." }), data && (_jsxs(Tabs, { defaultValue: String(data[0].id), className: "w-full h-full overflow-scroll scrollbar-hide", children: [_jsx(TabsList, { children: data.map((category) => (_jsx(TabsTrigger, { value: String(category.id), children: category.categoryName }, category.id))) }), data.map((category) => {
                                return (_jsxs(TabsContent, { value: String(category.id), className: "sticky left-0", children: [_jsxs(Row, { className: "justify-between", children: [_jsx(Button, { variant: "link", onClick: () => moveToProductPage(category.id), children: _jsx(Lead, { children: category.categoryName }) }), _jsx(Button, { variant: "link", onClick: () => moveToProductPage(category.id), children: "\uB354\uBCF4\uAE30" })] }), _jsx(Grid, { className: "grid-cols-4 gap-3", children: _jsx(ProductCardList, { category: category }) })] }, category.id));
                            })] }))] })] }));
};
export default CategoryProductList;
