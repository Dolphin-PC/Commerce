import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useGetListSellerOrderDetailQuery } from "@/features/order_detail/api/get-list-seller-order_detail";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DashBoardPageHelmet } from "../Helmets";
import { useOrderDetailSummaryQuery } from "./api/get-order_detail-summary";
import OrderDetailTable from "./ui/OrderDetailTable";

const _DashBoardPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const { data: waitOrderDetails } = useGetListSellerOrderDetailQuery({ sellerId: user.id, orderStatus: "PAY_COMPLETE_CONFIRM", orderDetailStatus: "ORDER_COMPLETE" });
  const { data: recentOrderDetails } = useGetListSellerOrderDetailQuery({ sellerId: user.id, orderStatus: null, orderDetailStatus: null });

  const { data: summary } = useOrderDetailSummaryQuery({ sellerId: user.id });
  const totalAmount = useMemo(() => {
    if (!summary) return 0;
    return summary.data.reduce((acc, val) => {
      if (val.order.pay_history.payAmount) return acc + val.order.pay_history.payAmount;
      return acc;
    }, 0);
  }, [summary]);

  return (
    <Column className="gap-3">
      <T.H3>대시보드</T.H3>

      <Row className="gap-3">
        <Card className="p-5">
          <T.Muted>주문 건수</T.Muted>
          <T.H3>{summary?.count.toLocaleString("ko-KR")}건</T.H3>
        </Card>

        <Card className="p-5">
          <T.Muted>주문 금액</T.Muted>
          <T.H3>{totalAmount.toLocaleString("ko-KR")}원</T.H3>
        </Card>
      </Row>

      <Row className="gap-3 flex-wrap">
        {/* 최근 주문 내역, 테이블 */}
        <Card className="flex-1 min-w-[800px]">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>최근 주문 내역</CardTitle>
            <Button variant="outline" asChild>
              <Link to={ROUTES.DASHBOARD__ORDERS}>전체 주문내역</Link>
            </Button>
          </CardHeader>
          <CardContent>{recentOrderDetails && <OrderDetailTable orderDetails={recentOrderDetails} />}</CardContent>
        </Card>

        {/* 대기주문 내역, 테이블 */}
        <Card className="flex-1 min-w-[800px]">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>대기중인 주문 내역</CardTitle>
            <Button variant="outline" asChild>
              <Link to={ROUTES.DASHBOARD__ORDERS}>전체 주문내역</Link>
            </Button>
          </CardHeader>
          <CardContent>{waitOrderDetails && <OrderDetailTable orderDetails={waitOrderDetails} />}</CardContent>
        </Card>
      </Row>
    </Column>
  );
};

export default function DashBoardPage() {
  return (
    <DashBoardLayout>
      <DashBoardPageHelmet />
      <_DashBoardPage />
    </DashBoardLayout>
  );
}
