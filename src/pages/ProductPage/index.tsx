import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import ProductCard from "@/features/product/ui/ProductCard";
import Column from "@/shared/components/atoms/Column";
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
import { LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProductPageHelmet } from "../Helmets";
import { FixedSizeList } from "react-window";
import { GridWindowLayout, ListWindowLayout } from "@/shared/components/templates/WindowLayout";
import Windowing from "@/shared/components/atoms/Windowing";
import { H2 } from "@/shared/components/atoms/Typography";

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
  const { ref: viewRef } = useInfiniteInView({ query: product, options: { threshold: 1 } });

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

  const windowingTestData = useMemo(
    () =>
      Array(1_000_0)
        .fill(0)
        .map((_, index) => <H2>{index}</H2>),
    []
  );

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

        <CardContent className="h-full">
          {/* grid style view */}
          {viewStyle === "grid" && product.data && (
            <GridWindowLayout
              query={product}
              infiniteCallback={product.fetchNextPage}
              // childrens={windowingTestData}
              childrens={product.data.pages.flatMap((page) =>
                page.data.map((product) => {
                  return (
                    <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
                      <ProductCard product={product} viewStyle={viewStyle} />
                    </Link>
                  );
                })
              )}
            />
          )}
          {/* list style view */}
          {viewStyle === "list" && product.data && (
            <ListWindowLayout
              childrens={windowingTestData}
              // childrens={product.data.pages.flatMap((page) =>
              //   page.data.map((product) => {
              //     return (
              //       <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
              //         <ProductCard product={product} viewStyle={viewStyle} />
              //       </Link>
              //     );
              //   })
              // )}
              query={product}
              infiniteCallback={() => {
                console.log("infiniteCallback");
              }}
            />
            // <Column className="gap-3">
            //   {product.data.pages.map((page) =>
            //     page.data.map((product) => {
            //       return (
            //         <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
            //           <ProductCard product={product} viewStyle={viewStyle} />
            //         </Link>
            //       );
            //     })
            //   )}
            // </Column>
          )}
          {product.data.pages[0].data.length === 0 && <p>검색된 상품이 없습니다.</p>}
        </CardContent>

        {/* <CardFooter ref={viewRef}></CardFooter> */}
      </Card>
    </MainLayout>
  );
};

export default ProductPage;
