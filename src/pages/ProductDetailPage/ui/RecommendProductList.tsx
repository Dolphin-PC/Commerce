import { Category } from "@/features/category/model/type";
import { useProductListCategorySuspenseQuery } from "@/features/product/api/get-list-product-category";
import { Product } from "@/features/product/type/type";
import ProductCard from "@/features/product/ui/ProductCard";
import Column from "@/shared/components/atoms/Column";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { useSearchStore } from "@/widgets/ProductSearchDrawer/store/useSearchStore";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  id: Product["id"];
  category: Category;
}

/**
 * @desc 해당 상품의 카테고리에 속하는 상품 목록
 */
const RecommendProductList = ({ category, id }: Props) => {
  const navigate = useNavigate();
  const { data } = useProductListCategorySuspenseQuery({ categoryId: category.id, pageNumber: 0, pageSize: 9 });
  const setCategoryIds = useSearchStore((state) => state.setCategoryIds);

  const moveToListPage = () => {
    setCategoryIds([category.id]);
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <Column className="gap-3">
      <Row className="justify-between">
        <Row className="gap-3 items-center">
          <Badge variant={"outline"} size={"large"}>
            {category.categoryName}
          </Badge>
          <T.H3>추천 상품</T.H3>
        </Row>
        <Button onClick={moveToListPage} variant="outline">
          더보기
        </Button>
      </Row>

      <Grid className="grid-cols-4 gap-4">
        {data.data.map((product) => {
          if (product.id === id) return null;
          return (
            <Link key={product.id} to={ROUTES.PRODUCTS_ID_(product.id)}>
              <ProductCard key={product.id} product={product} category={product.category} />
            </Link>
          );
        })}
      </Grid>
    </Column>
  );
};

export default RecommendProductList;
