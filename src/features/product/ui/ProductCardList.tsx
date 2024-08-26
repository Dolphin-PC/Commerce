import Loading from "@/shared/components/molecules/Loading";
import { useProductListCategoryQuery } from "../api/get_list-product_category";
import { Category } from "@/features/category/model/type";
import ProductCard from "./ProductCard";
import { Fragment } from "react/jsx-runtime";

/**
 * 상품 리스트
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
        <ProductCard key={product.id} product={product} />
      ))}
    </Fragment>
  );
};

export default ProductCardList;
