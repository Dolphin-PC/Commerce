import { H2 } from "@/shared/components/atoms/Typography";
import Row from "@/shared/components/styles/Row";

import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";

const ProductPage = () => {
  return (
    <DashBoardLayout>
      <Row gap={20}>
        <H2>내 상품</H2>
        <Button asChild>
          <Link to={ROUTES.DASHBOARD__PRODUCTS__NEW}>상품 등록</Link>
        </Button>
      </Row>
    </DashBoardLayout>
  );
};

export default ProductPage;
