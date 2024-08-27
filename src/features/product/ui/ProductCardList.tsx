import Loading from "@/shared/components/molecules/Loading";
import { useProductListCategoryQuery } from "../api/get_list-product_category";
import { Category } from "@/features/category/model/type";
import ProductCard from "./ProductCard";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";

/**
 * 카테고리별 상품 리스트
 */

interface Props {
  category?: Category;
  count?: number;
}

const ProductCardList = ({ category, count }: Props) => {
  const { data, isLoading } = useProductListCategoryQuery({ categoryId: category?.id, pageSize: count });

  if (isLoading) return <Loading />;
  if (!data) return <div>상품 정보가 없어요.</div>;
  return (
    <Fragment>
      {data.data.map((product) => (
        <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
          <ProductCard key={product.id} product={product} />
        </Link>
      ))}
    </Fragment>
  );
};

export default ProductCardList;
