import { useGetCategoryListOnExistsProduct } from "@/features/category/api/get_list-category-exists-product";
import { useProductListCategoryQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Column from "@/shared/components/atoms/Column";
import Grid from "@/shared/components/atoms/Grid";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/MainLayout";
import { Link } from "react-router-dom";
import { HomePageHelmet } from "../Helmets";
import CategoryProductList from "./ui/CategoryProductList";

const _HomePage = () => {
  const { data: newProducts } = useProductListCategoryQuery({ order: { column: "createdAt", ascending: false }, pageSize: 4 });

  const { data: categorys } = useGetCategoryListOnExistsProduct();
  console.log({ categorys });

  return (
    <Column className="gap-10">
      {/* 최산 상품 Card */}
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

      {/* 카테고리별 상품 Card */}
      <Card>
        <CardHeader>
          <CardTitle>카테고리별 상품</CardTitle>
        </CardHeader>

        <CardContent>
          {categorys && (
            <Tabs defaultValue={String(categorys[0].id)} className="w-full h-full overflow-scroll scrollbar-hide">
              <TabsList>
                {categorys.map((category) => (
                  <TabsTrigger key={category.id} value={String(category.id)}>
                    {category.categoryName}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categorys.map((category) => (
                <CategoryProductList key={category.id} category={category} />
              ))}
            </Tabs>
          )}
        </CardContent>
      </Card>
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
