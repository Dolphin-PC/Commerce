import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import Column from "@/shared/components/atoms/Column";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { formatDate } from "@/shared/lib/date";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { productCategoryPrefetchOptions } from "../api/get-product-category";
import { ProductCategory } from "../type/type";

interface Props {
  product: ProductCategory;
}

const DashboardProductCard = ({ product }: Props) => {
  const qc = useQueryClient();

  const handlePrefetch = () => {
    qc.prefetchQuery(productCategoryPrefetchOptions({ id: product.id }));
  };
  return (
    <Link to={ROUTES.DASHBOARD__PRODUCTS_ID_(product.id)}>
      <Card onMouseEnter={handlePrefetch} className="hover:-translate-y-3 transition-transform duration-300">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Column className="gap-2">
            <BadgeRowLead badge="가격" lead={`${product.price.toLocaleString("ko-KR")}원`} />
            <BadgeRowLead badge="수량" lead={`${product.quantity.toLocaleString("ko-KR")}개`} />
            <BadgeRowLead badge="등록일" lead={`${formatDate(new Date(product.createdAt))}`} />
            <BadgeRowLead badge="수정일" lead={`${formatDate(new Date(product.updatedAt))}`} />
          </Column>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardProductCard;
