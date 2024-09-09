import { useAuthStore } from "@/features/@auth/store/auth.store";
import { orderDetailStatus } from "@/features/order_detail/const/orderDetailStatus";
import { OrderDetailStatus } from "@/features/order_detail/type";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { ObjectEntries } from "@/shared/lib/object";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetSellerOrderDetailQuery } from "./api/get-seller-order_detail";
import OrderStatusDialog from "./ui/OrderStatusDialog";

/**
 * @desc 판매자 주문(상세) 페이지
 *  - /dashboard/orders
 */
const _DashboardOrderPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const [filterStatus, setFilterStatus] = useState<OrderDetailStatus | null>(null);
  const { data: orderDetails } = useGetSellerOrderDetailQuery({ sellerId: user.id, status: filterStatus });

  return (
    <Fragment>
      <CardHeader>
        <CardTitle>주문 내역</CardTitle>

        <Row className="gap-3 flex-wrap">
          <Button variant={filterStatus === null ? "default" : "outline"} onClick={() => setFilterStatus(null)}>
            전체
          </Button>
          {(Object.entries(orderDetailStatus) as ObjectEntries<Record<OrderDetailStatus, string>>).map(([key, value]) => {
            return (
              <Button key={`btn-${key}`} variant={filterStatus === key ? "default" : "outline"} onClick={() => setFilterStatus(key)}>
                {value}
              </Button>
            );
          })}
        </Row>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {orderDetails &&
          orderDetails.map((orderDetail) => {
            return (
              <Card key={orderDetail.id}>
                <CardTitle>
                  <Row className="items-center justify-between px-2">
                    <CardHeader>{orderDetailStatus[orderDetail.status]}</CardHeader>
                    <OrderStatusDialog key={orderDetail.id} orderDetail={orderDetail} />
                  </Row>
                </CardTitle>
                <CardContent className="flex flex-col gap-3">
                  <BadgeRowLead badge="주문번호" lead={String(orderDetail.orderId)} />
                  <Row className="items-center gap-3">
                    <BadgeRowLead badge="상품명" lead={orderDetail.product.name} />
                    <Link to={ROUTES.DASHBOARD__PRODUCTS_ID_(orderDetail.productId)}>
                      <T.Small>상품 보기</T.Small>
                    </Link>
                  </Row>
                </CardContent>
              </Card>
            );
          })}
      </CardContent>
    </Fragment>
  );
};

export default function DashboardOrderPage() {
  return (
    <DashBoardLayout>
      <_DashboardOrderPage />
    </DashBoardLayout>
  );
}
