import CategoryComboBox from "@/features/category/ui/CategoryComboBox";
import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import useInfiniteInView from "@/shared/hooks/useInfiniteInView";
import MainLayout from "@/widgets/layout/MainLayout";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

/**
 * @desc 상품 목록 페이지
 *  - /products
 *
 * searchParams:
 *   - categoryId: 카테고리 아이디
 */
const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = Number(searchParams.get("categoryId"));

  const [filter, setFilter] = useState<"createdAt" | "price">("createdAt");

  const product = useProductListCategoryInfiniteQuery({
    categoryId: categoryId,
    order: {
      column: filter,
      ascending: false,
    },
  });
  const { ref: viewRef } = useInfiniteInView({ query: product, options: { threshold: 1 } });

  // 카테고리 콤보박스 선택시
  const handleCategorySelect = (categoryId: number) => {
    setSearchParams((prev) => {
      const searchParams = new URLSearchParams(prev);
      searchParams.set("categoryId", String(categoryId));
      return searchParams.toString();
    });
  };

  // [최신순/가격순] 정렬 기준 변경시
  const handleFilterChange = (value: string) => {
    if (!(value === "createdAt" || value === "price")) return;

    setFilter(value);
  };

  useEffect(() => {
    product.refetch();
  }, [filter, product]);

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <Row className="justify-between">
            <CategoryComboBox onSelect={handleCategorySelect} defaultCategoryId={categoryId} />
            <Tabs defaultValue={filter} onValueChange={handleFilterChange}>
              <TabsList>
                <TabsTrigger value="createdAt">최신순</TabsTrigger>
                <TabsTrigger value="price">가격순</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>
        </CardHeader>

        <CardContent>
          {product.data ? (
            <Grid className="grid-cols-4 gap-3">
              {product.data.pages.map((page) =>
                page.data.map((product) => {
                  return (
                    <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
                      <ProductCard product={product} />
                    </Link>
                  );
                })
              )}
            </Grid>
          ) : (
            <p>데이터가 없어요.</p>
          )}
        </CardContent>

        <CardFooter ref={viewRef}></CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ProductPage;
