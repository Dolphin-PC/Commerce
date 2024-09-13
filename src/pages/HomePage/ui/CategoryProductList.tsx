import { Category } from "@/features/category/model/type";
import { useProductListCategoryQuery } from "@/features/product/api/get-list-product-category";
import ProductCard from "@/features/product/ui/ProductCard";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { TabsContent } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import { useSearchStore } from "@/widgets/ProductSearchDrawer/store/useSearchStore";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  category: Category;
}

const CategoryProductList = ({ category }: Props) => {
  const navigate = useNavigate();
  const { data: categoryProducts } = useProductListCategoryQuery({ categoryId: category.id, pageSize: 4 });

  const setCategoryIds = useSearchStore((state) => state.setCategoryIds);

  /** 상품 목록 페이지 이동 */
  const moveToProductPage = () => {
    setCategoryIds([category.id]);

    navigate(ROUTES.PRODUCTS);
  };

  return (
    <TabsContent key={category.id} value={String(category.id)} className="sticky left-0">
      <Row className="justify-between">
        <Button variant="link" onClick={moveToProductPage}>
          <T.Lead>{category.categoryName}</T.Lead>
        </Button>
        <Button variant="link" onClick={moveToProductPage}>
          더보기
        </Button>
      </Row>
      <Grid className="grid-cols-4 gap-3">
        {categoryProducts?.data.map((product) => {
          return (
            <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
              <ProductCard key={product.id} product={product} category={product.category} />
            </Link>
          );
        })}
      </Grid>
    </TabsContent>
  );
};

export default CategoryProductList;
