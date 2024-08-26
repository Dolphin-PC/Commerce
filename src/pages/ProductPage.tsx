import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductListCategoryInfiniteQuery } from "@/features/product/api/get_list-product_category";
import DashboardProductCard from "@/features/product/ui/DashboardProductCard";
import Grid from "@/shared/components/atoms/Grid";
import Row from "@/shared/components/atoms/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const user = useAuthStore((state) => state.user);
  const q = useProductListCategoryInfiniteQuery({ sellerId: user?.id });

  const { ref: viewRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && q.hasNextPage) {
      q.fetchNextPage();
    }
  }, [q, inView]);

  return (
    <DashBoardLayout>
      <Card>
        <CardHeader>
          <Row className="justify-between">
            <CardTitle>내 상품</CardTitle>
            <Button asChild>
              <Link to={ROUTES.DASHBOARD__PRODUCTS__NEW}>상품 등록</Link>
            </Button>
          </Row>
        </CardHeader>

        <CardContent>
          {q.data ? (
            <Grid className="grid-cols-3 gap-3">
              {q.data.pages.map((page) =>
                page.data.map((product) => {
                  return <DashboardProductCard key={product.id} product={product} />;
                })
              )}
            </Grid>
          ) : (
            <p>데이터가 없어요.</p>
          )}
        </CardContent>

        <CardFooter ref={viewRef}></CardFooter>
      </Card>
    </DashBoardLayout>
  );
};

export default ProductPage;
