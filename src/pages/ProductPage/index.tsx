import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get-list-product-category";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { GridWindowLayout, ListWindowLayout } from "@/shared/components/templates/WindowLayout";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/MainLayout";
import { useSearchStore } from "@/widgets/ProductSearchDrawer/store/useSearchStore";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductPageHelmet } from "../Helmets";
import { useViewStore } from "./store/useViewStore";
import SearchFilter from "./ui/SearchFilter";

/**
 * @desc 상품 목록 페이지
 *  - /products
 *
 */
const _ProductPage = () => {
  const { orderColumn, setOrderColumn, viewStyle, setViewStyle } = useViewStore();

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
    <Card className="h-full">
      <CardHeader>
        <Row className="justify-between">
          <Row className="gap-3">
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
            <Tabs defaultValue={orderColumn} onValueChange={handleFilterChange}>
              <TabsList>
                <TabsTrigger value="createdAt">최신순</TabsTrigger>
                <TabsTrigger value="price">가격순</TabsTrigger>
              </TabsList>
            </Tabs>
          </Row>

          <SearchFilter />
        </Row>
      </CardHeader>

      <CardContent className="h-5/6">
        {/* grid style view */}
        {viewStyle === "grid" && product.data && (
          <GridWindowLayout
            columnCount={4}
            rowHeight={480}
            childrens={product.data.pages.flatMap((page) =>
              page.data.map((product) => {
                return (
                  <Link to={ROUTES.PRODUCTS_ID_(product.id)} key={product.id}>
                    <ProductCard product={product} category={product.category} viewStyle={viewStyle} />
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
                    <ProductCard product={product} category={product.category} viewStyle={viewStyle} />
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
  );
};

export default function ProductPage() {
  return (
    <MainLayout className="h-screen" mainClassName="h-5/6">
      <ProductPageHelmet />

      <_ProductPage />
    </MainLayout>
  );
}
