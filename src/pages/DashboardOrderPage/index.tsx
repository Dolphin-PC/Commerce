import { useAuthStore } from "@/features/@auth/store/auth.store";
import { orderStatusObj } from "@/features/order/const/orderStatus";
import { OrderStatus } from "@/features/order/type";
import { orderDetailStatusObj } from "@/features/order_detail/const/orderDetailStatus";
import { OrderDetailStatus } from "@/features/order_detail/type";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { formatDate, parseDate } from "@/shared/lib/date";
import { ObjectEntries } from "@/shared/lib/object";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetListSellerOrderDetailQuery } from "../../features/order_detail/api/get-list-seller-order_detail";
import OrderStatusDialog from "./ui/OrderStatusDialog";

/**
 * @desc 판매자 주문(상세) 페이지
 *  - /dashboard/orders
 */
const _DashboardOrderPage = () => {
  const user = useAuthStore((state) => state.getUser());

  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [orderDetailStatus, setOrderDetailStatus] = useState<OrderDetailStatus | null>(null);

  const { data: orderDetails } = useGetListSellerOrderDetailQuery({ sellerId: user.id, orderStatus, orderDetailStatus });

  return (
    <Fragment>
      <CardHeader>
        <CardTitle>주문 내역</CardTitle>

        <Card className="p-4">
          <T.Large>결제상태</T.Large>
          <Row className="gap-3 flex-wrap">
            <Button variant={orderStatus === null ? "default" : "outline"} onClick={() => setOrderStatus(null)}>
              전체
            </Button>
            {(Object.entries(orderStatusObj) as ObjectEntries<Record<OrderStatus, string>>).map(([key, value]) => {
              if (value === "") return null;
              return (
                <Button key={`btn-${key}`} variant={orderStatus === key ? "default" : "outline"} onClick={() => setOrderStatus(key)}>
                  {value}
                </Button>
              );
            })}
          </Row>
        </Card>
        <Card className="p-4">
          <T.Large>주문상태</T.Large>
          <Row className="gap-3 flex-wrap">
            <Button variant={orderDetailStatus === null ? "default" : "outline"} onClick={() => setOrderDetailStatus(null)}>
              전체
            </Button>
            {(Object.entries(orderDetailStatusObj) as ObjectEntries<Record<OrderDetailStatus, string>>).map(([key, value]) => {
              return (
                <Button key={`btn-${key}`} variant={orderDetailStatus === key ? "default" : "outline"} onClick={() => setOrderDetailStatus(key)}>
                  {value}
                </Button>
              );
            })}
          </Row>
        </Card>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {orderDetails &&
          orderDetails.map((orderDetail) => {
            return (
              <Card key={orderDetail.id}>
                <CardHeader>
                  <Row className="items-start justify-between px-2">
                    <Column className="gap-3">
                      <BadgeRowLead badge="구매자 | 결제상태" lead={orderStatusObj[orderDetail.order.status]} />
                      <BadgeRowLead badge="판매자 | 주문상태" lead={orderDetailStatusObj[orderDetail.status]} />
                    </Column>
                    <OrderStatusDialog key={orderDetail.id} orderDetail={orderDetail} />
                  </Row>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <BadgeRowLead badge="주문번호" lead={String(orderDetail.orderId)} />
                  <Row className="gap-3">
                    <BadgeRowLead badge="상품명" lead={orderDetail.product.name} />
                    <Link to={ROUTES.DASHBOARD__PRODUCTS_ID_(orderDetail.productId)}>
                      <T.Small>상품 보기</T.Small>
                    </Link>
                  </Row>
                  <BadgeRowLead badge="주문수량" lead={`${orderDetail.quantity.toLocaleString("ko-KR")}개`} />
                  <BadgeRowLead badge="주문일시" lead={`${formatDate(parseDate(orderDetail.order.createdAt))}`} />
                  {orderDetail.order.payHistory && <BadgeRowLead badge="결제일시" lead={`${formatDate(parseDate(orderDetail.order.payHistory.createdAt))}`} />}
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
