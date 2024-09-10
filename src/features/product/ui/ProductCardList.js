import { jsx as _jsx } from "react/jsx-runtime";
import Loading from "@/shared/components/molecules/Loading";
import { useProductListCategoryQuery } from "../api/get_list-product_category";
import ProductCard from "./ProductCard";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";
const ProductCardList = ({ category, count }) => {
    const { data, isLoading } = useProductListCategoryQuery({ categoryId: category?.id, pageSize: count });
    if (isLoading)
        return _jsx(Loading, {});
    if (!data)
        return _jsx("div", { children: "\uC0C1\uD488 \uC815\uBCF4\uAC00 \uC5C6\uC5B4\uC694." });
    return (_jsx(Fragment, { children: data.data.map((product) => (_jsx(Link, { to: ROUTES.PRODUCTS_ID_(product.id), children: _jsx(ProductCard, { product: product, category: product.category }, product.id) }, product.id))) }));
};
export default ProductCardList;
