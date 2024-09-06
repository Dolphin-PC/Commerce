import Column from "@/shared/components/atoms/Column";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Header from "@/widgets/Header";
import MainLayout from "@/widgets/MainLayout";
import { useGetUserOrderProductQuery } from "./api/get-user-order-product";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { H4, Muted } from "@/shared/components/atoms/Typography";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import { translateOrderStatus } from "@/features/order/util/translate-order-status";
import { Fragment } from "react/jsx-runtime";
import { formatDate, parseDate } from "@/shared/lib/date";
import { Badge } from "@/shared/components/ui/badge";
import Row from "@/shared/components/atoms/Row";
import { genOrderName } from "@/features/@portOne/gen-order-name";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";

/**
 * @desc 내 주문내역
 *  - /my/orders
 */
const MyOrderPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const { data: orderData, isLoading } = useGetUserOrderProductQuery({ userId: user.id });

  if (isLoading) return <CenterLoading />;
  if (!orderData) return <Muted>주문 내역이 없어요.</Muted>;
  return (
    <Column className="gap-3">
      {orderData.map((order) => {
        const productNames = order.orderDetail.map((detail) => detail.product!.name);
        const productName = genOrderName({ productNames });
        return (
          <Card key={order.id}>
            <CardHeader>
              <Row className="items-center justify-between">
                <Badge variant="outline" className="w-fit h-fit">
                  {translateOrderStatus(order.status)}
                </Badge>
                <Button variant="link" asChild className="w-fit">
                  <Link to="">결제상세</Link>
                </Button>
              </Row>
            </CardHeader>
            <CardContent>
              <Column className="gap-2">
                <H4>{productName}</H4>
                <Row className="items-center gap-2">
                  <Badge>주문번호</Badge>
                  <Muted>{order.id}</Muted>
                </Row>
                {order.pay_history && (
                  <Fragment>
                    <Row className="items-center gap-2">
                      <Badge>결제금액</Badge>
                      <Muted>{order.pay_history.payAmount?.toLocaleString("ko-KR")} 원</Muted>
                    </Row>
                    <Row className="items-center gap-2">
                      <Badge>결제일시</Badge>
                      <Muted>{formatDate(parseDate(order.pay_history.createdAt))}</Muted>
                    </Row>
                  </Fragment>
                )}
              </Column>
            </CardContent>
          </Card>
        );
      })}
    </Column>
  );
};

export default function () {
  return (
    <MainLayout
      headerChildren={<Header />}
      subHeaderChildren={
        <div className="w-full bg-slate-100 text-center p-2">
          <Muted>주문 내역 조회</Muted>
        </div>
      }
    >
      <MyOrderPage />
    </MainLayout>
  );
}
