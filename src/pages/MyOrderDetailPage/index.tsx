import MainLayout from "@/widgets/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailProductSuspenseQuery } from "../../features/order/api/get-order-detail-product";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import Column from "@/shared/components/atoms/Column";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate, parseDate } from "@/shared/lib/date";
import { T } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import { ROUTES } from "@/shared/consts/route.const";
import { Button } from "@/shared/components/ui/button";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { useRefundRequestHook } from "./hook/useRefundRequestHook";
import { toast } from "@/shared/components/ui/use-toast";
import { orderStatusObj } from "@/features/order/const/orderStatus";
import Row from "@/shared/components/atoms/Row";

/**
 * @desc 내 주문 상세 페이지
 *  - /my/orders/:id
 */
const _MyOrderDetailPage = () => {
  const { id } = useParams();
  const orderId = Number(id);

  const user = useAuthStore((state) => state.getUser());
  const { data: orderData } = useGetOrderDetailProductSuspenseQuery({ orderId, userId: user.id });

  const { requestRefund } = useRefundRequestHook();

  const handleRequestRefund = async () => {
    await requestRefund({ orderId });
    toast({ title: "환불 요청이 완료되었습니다." });
  };

  return (
    <Column className="gap-5">
      <Row className="items-center justify-between">
        <Button variant="link" asChild className="w-fit">
          <Link to={ROUTES.MY__ORDERS}>구매목록</Link>
        </Button>
        {orderData.status === "PAY_BEFORE" && (
          <Button variant="default" asChild className="w-fit">
            <Link to={ROUTES.ORDERS_ID_(String(orderId))}>결제하기</Link>
          </Button>
        )}
      </Row>
      {orderData.payHistory && (
        <Card>
          <CardHeader>
            <CardTitle>결제정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <T.Muted>{formatDate(parseDate(orderData.payHistory.createdAt))}</T.Muted>
            <BadgeRowLead badge="결제번호" lead={orderData.payHistory.paymentId} />
            <BadgeRowLead badge="결제가격" lead={`${orderData.payHistory.payAmount?.toLocaleString("ko-KR")}원`} />
          </CardContent>
          <CardFooter className="flex-col">
            {orderData.status === "PAY_COMPLETE_CONFIRM" && (
              <ConfirmDialog
                title="환불 요청"
                description="환불 요청을 하시겠습니까?"
                confirmText="요청"
                confirmAction={handleRequestRefund}
                cancelText="취소"
                cancelAction={() => {}}
                triggerComponent={
                  <Button variant="secondary" className="w-full">
                    환불요청
                  </Button>
                }
              />
            )}
            {orderData.status === "REFUND_REQUEST" && <T.Blockquote className="w-full">판매자가 환불요청을 확인하고 있어요.</T.Blockquote>}
          </CardFooter>
        </Card>
      )}

      <Card className="px-3 flex flex-col gap-3">
        <CardHeader className="flex flex-row items-center gap-3">
          <CardTitle>주문 정보</CardTitle>
          <Badge className="w-fit">{orderStatusObj[orderData.status]}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <T.H4>{orderData.orderName}</T.H4>
          {orderData.shipAddress && <BadgeRowLead badge="배송지" lead={orderData.shipAddress} />}
        </CardContent>

        <hr />

        <CardContent className="flex flex-col gap-3">
          {orderData.orderDetails.map((orderDetail) => {
            const q = orderDetail.quantity;
            const p = orderDetail.product.price;
            const total = q * p;
            return (
              <Card key={orderDetail.id} className="p-4 flex flex-col gap-3">
                <T.H4>{orderDetail.product.name}</T.H4>

                <BadgeRowLead badge="수량/단가" lead={`${q.toLocaleString("ko-KR")}개 / ${p.toLocaleString("ko-KR")}원`} />
                <BadgeRowLead badge="총 가격" lead={`${total.toLocaleString("ko-KR")}원`} />
                <BadgeRowLead badge="판매자" lead={orderDetail.product.seller.nickname ?? ""} />
              </Card>
            );
          })}
        </CardContent>
      </Card>
    </Column>
  );
};

export default function MyOrderDetailPage() {
  return (
    <MainLayout>
      <_MyOrderDetailPage />
    </MainLayout>
  );
}
