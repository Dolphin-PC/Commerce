import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useGetOrderSuspenseQuery } from "@/features/order/api/get-order";
import { useGetOrderDetailsSuspenseQuery } from "@/features/order_detail/api/get-order_details";
import Row from "@/shared/components/atoms/Row";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/widgets/layout/MainLayout";
import { useParams } from "react-router-dom";

/**
 * @desc 주문 화면
 *  - /orders/:id
 */
const OrderPage = () => {
  const { id } = useParams();
  const orderId = Number(id);
  const { id: userId } = useAuthStore((state) => state.getUser());

  const { data } = useGetOrderSuspenseQuery({ orderId, userId });
  const {
    data: { data: orderDetails },
  } = useGetOrderDetailsSuspenseQuery({ orderId: data.id });

  console.log({ data });

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle>주문/결제</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3 overflow-auto scrollbar-hide">
        {/* 배송지 */}
        <Card>
          <CardHeader>
            <CardTitle>배송지 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="배송지를 입력해주세요." />
          </CardContent>
        </Card>

        {/* 주문정보 */}
        <Card>
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="배송지를 입력해주세요." />
          </CardContent>
        </Card>

        {/* 결제정보 */}
        <Card>
          <CardHeader>
            <CardTitle>배송지 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="배송지를 입력해주세요." />
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter>
        <Row className="w-full justify-between">
          <Row className="items-center gap-3">
            <Checkbox className="w-8 h-8" />
            <label>주문 내용을 확인했습니다.</label>
          </Row>
          <Button>결제하기</Button>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default function () {
  return (
    <MainLayout className="h-screen" mainClassName="h-5/6">
      <OrderPage />
    </MainLayout>
  );
}
