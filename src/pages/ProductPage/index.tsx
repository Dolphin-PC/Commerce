import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import useInfiniteInView from "@/shared/hooks/useInfiniteInView";
import MainLayout from "@/widgets/layout/MainLayout";
import { useSearchDrawerStore } from "@/widgets/product-search-drawer/store/useSearchDrawerStore";
import { useSearchStore } from "@/widgets/product-search-drawer/store/useSearchStore";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * @desc 상품 목록 페이지
 *  - /products
 *
 */
const ProductPage = () => {
  const [orderColumn, setOrderColumn] = useState<"createdAt" | "price">("createdAt");

  const drawerStore = useSearchDrawerStore((state) => ({
    setIsOpen: state.setIsOpen,
  }));
  const searchStore = useSearchStore((state) => ({
    searchFilter: state.getSearch(),
  }));

  const product = useProductListCategoryInfiniteQuery({
    order: {
      column: orderColumn,
      ascending: false,
    },
    filter: searchStore.searchFilter,
  });
  const { ref: viewRef } = useInfiniteInView({ query: product, options: { threshold: 1 } });

  // [최신순/가격순] 정렬 기준 변경시
  const handleFilterChange = (value: string) => {
    if (!(value === "createdAt" || value === "price")) return;

    setOrderColumn(value);
  };

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <Row className="justify-between">
            <Tabs defaultValue={orderColumn} onValueChange={handleFilterChange}>
              <TabsList>
                <TabsTrigger value="createdAt">최신순</TabsTrigger>
                <TabsTrigger value="price">가격순</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button size={"icon"} onClick={() => drawerStore.setIsOpen(true)}>
              <SlidersHorizontal size={20} />
            </Button>
          </Row>
        </CardHeader>

        <CardContent>
          {product.data && (
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
          )}
          {product.data.pages[0].data.length === 0 && <p>검색된 상품이 없습니다.</p>}
        </CardContent>

        <CardFooter ref={viewRef}></CardFooter>
      </Card>
    </MainLayout>
  );
};

export default ProductPage;
