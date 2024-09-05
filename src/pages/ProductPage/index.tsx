import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { GridWindowLayout, ListWindowLayout } from "@/shared/components/templates/WindowLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/layout/MainLayout";
import { useSearchDrawerStore } from "@/widgets/product-search-drawer/store/useSearchDrawerStore";
import { useSearchStore } from "@/widgets/product-search-drawer/store/useSearchStore";
import { LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductPageHelmet } from "../Helmets";

/**
 * @desc 상품 목록 페이지
 *  - /products
 *
 */
const ProductPage = () => {
  const [orderColumn, setOrderColumn] = useState<"createdAt" | "price">("createdAt");
  const [viewStyle, setViewStyle] = useState<"grid" | "list">("grid");

  const drawerStore = useSearchDrawerStore((state) => ({ setIsOpen: state.setIsOpen }));
  const searchStore = useSearchStore((state) => ({ searchFilter: state.getSearch() }));

  const product = useProductListCategoryInfiniteQuery({
    order: {
      column: orderColumn,
      ascending: false,
    },
    filter: searchStore.searchFilter,
  });

  // [최신순/가격순] 정렬 기준 변경시
  const handleFilterChange = (value: string) => {
    if (value === "createdAt" || value === "price") {
      setOrderColumn(value);
    }
  };
  const handleViewStyleChange = (value: string) => {
    if (value === "grid" || value === "list") {
      setViewStyle(value);
    }
  };

  return (
    <MainLayout>
      <ProductPageHelmet />
      <Card className="h-full">
        <CardHeader>
          <Row className="justify-between">
            <Tabs defaultValue={viewStyle} onValueChange={handleViewStyleChange}>
              <TabsList>
                <TabsTrigger value="grid">
                  <LayoutGrid />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <LayoutList />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Row className="gap-3">
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
          </Row>
        </CardHeader>

        <CardContent className="h-5/6">
          {/* grid style view */}
          {viewStyle === "grid" && product.data && (
            <GridWindowLayout
              columnCount={3}
              rowHeight={480}
              childrens={product.data.pages.flatMap((page) =>
                page.data.map((product) => {
                  return (
                    <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
                      <ProductCard product={product} viewStyle={viewStyle} />
                    </Link>
                  );
                })
              )}
              fetchNextPage={product.fetchNextPage}
              hasNextPage={product.hasNextPage}
              isNextPageLoading={product.isFetchingNextPage}
            />
          )}
          {/* list style view */}
          {viewStyle === "list" && product.data && (
            <ListWindowLayout
              itemHeight={280}
              childrens={product.data.pages.flatMap((page) =>
                page.data.map((product) => {
                  return (
                    <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
                      <ProductCard product={product} viewStyle={viewStyle} />
                    </Link>
                  );
                })
              )}
              hasNextPage={product.hasNextPage}
              isNextPageLoading={product.isFetchingNextPage}
              fetchNextPage={product.fetchNextPage}
            />
          )}

          {product.data.pages[0].data.length === 0 && <p>검색된 상품이 없습니다.</p>}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default ProductPage;
