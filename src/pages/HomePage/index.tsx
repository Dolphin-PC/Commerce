import MainLayout from "@/widgets/MainLayout";
import CategoryProductList from "./ui/CategoryProductList";
import { HomePageHelmet } from "../Helmets";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Column from "@/shared/components/atoms/Column";
import { useProductListCategoryQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";
import { Button } from "@/shared/components/ui/button";
import Grid from "@/shared/components/atoms/Grid";

const _HomePage = () => {
  const { data: newProducts } = useProductListCategoryQuery({ order: { column: "createdAt", ascending: false }, pageSize: 4 });
  return (
    <Column className="gap-10">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>최신 상품</CardTitle>
          <Button variant="link" asChild>
            <Link to={ROUTES.PRODUCTS}>더보기</Link>
          </Button>
        </CardHeader>

        <CardContent>
          <Grid className="grid-cols-4 gap-3">
            {newProducts?.data.map((product) => {
              return (
                <Link key={product.id} to={ROUTES.PRODUCTS_ID_(product.id)}>
                  <ProductCard product={product} category={product.category} />
                </Link>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
      <CategoryProductList />
    </Column>
  );
};

export default function HomePage() {
  return (
    <MainLayout>
      <HomePageHelmet />
      <_HomePage />
    </MainLayout>
  );
}
