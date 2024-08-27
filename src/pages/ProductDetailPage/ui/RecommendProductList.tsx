import { Category } from "@/features/category/model/type";
import { useProductListCategoryQuery } from "@/features/product/api/get_list-product_category";
import { Product } from "@/features/product/type/type";
import ProductCard from "@/features/product/ui/ProductCard";
import Column from "@/shared/components/atoms/Column";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { H3 } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";

interface Props {
  id: Product["id"];
  category: Category;
}

/**
 * @desc 해당 상품의 카테고리에 속하는 상품 목록
 */
const RecommendProductList = ({ category, id }: Props) => {
  const { data } = useProductListCategoryQuery({ categoryId: category.id, pageNumber: 0, pageSize: 9 });
  return (
    <Column className="gap-3">
      <Row className="gap-3 items-center">
        <Badge variant={"outline"} size={"large"}>
          {category.categoryName}
        </Badge>
        <H3>다른 상품</H3>
      </Row>

      <Grid className="grid-cols-4 gap-4">
        {data?.data.map((product) => {
          if (product.id === id) return null;
          return (
            <Link key={product.id} to={ROUTES.PRODUCTS_ID_(product.id)}>
              <ProductCard key={product.id} product={product} showCategory={false} />
            </Link>
          );
        })}
      </Grid>
    </Column>
  );
};

export default RecommendProductList;
