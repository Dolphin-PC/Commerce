import { useProductListCategoryQuery } from "@/features/product/api/get-list-product_category";
import { useAuthStore } from "@/features/auth/auth.store";
import Row from "@/shared/components/styles/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const user = useAuthStore((state) => state.user);
  const q = useProductListCategoryQuery({ sellerId: user?.id });

  console.log(q.data);

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

        <CardContent></CardContent>
      </Card>
    </DashBoardLayout>
  );
};

export default ProductPage;
