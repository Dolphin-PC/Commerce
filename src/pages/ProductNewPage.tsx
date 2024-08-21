import CategoryComboBox from "@/entities/category/CategoryComboBox.ui";
import Row from "@/shared/components/styles/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { SquareChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProductNewPage = () => {
  return (
    <DashBoardLayout>
      <Card>
        <CardHeader>
          <Row gap={20}>
            <Link to={ROUTES.PRODUCTS}>
              <SquareChevronLeft size={40} />
            </Link>
            <CardTitle>상품 등록</CardTitle>
          </Row>
        </CardHeader>

        <CardContent>
          <CategoryComboBox />
        </CardContent>
      </Card>
    </DashBoardLayout>
  );
};

export default ProductNewPage;
