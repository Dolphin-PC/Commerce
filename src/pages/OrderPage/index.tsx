import { useAuthStore } from "@/features/@auth/store/auth.store";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { Large, Small, T } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/widgets/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetailProductSuspenseQuery } from "../../features/order/api/get-order-detail-product";
import { usePaymentHook } from "../../widgets/hook/usePaymentHook";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo } from "react";

/**
 * @desc 주문 화면
 *  - /orders/:id
 */
const _OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = Number(id);
  const { id: userId } = useAuthStore((state) => state.getUser());

  const { data: order } = useGetOrderDetailProductSuspenseQuery({ orderId, userId, status: "PAY_BEFORE" });

  const { handlePayment, cancelPayment, isConfirmOrder, setIsConfirmOrder, setShipAddress, shipAddress } = usePaymentHook();

  const totalAmount = useMemo(() => {
    return order.orderDetails.reduce((acc, cur) => {
      if (cur.product === null) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);
  }, [order.orderDetails]);

  const _handlePayment = async () => {
    const productNames = order.orderDetails.map((o) => o.product.name);
    await handlePayment({ orderId: order.id, totalAmount, productNames });
  };

  const _handleCancelPayment = async () => {
    if (window.confirm("결제를 취소하시겠습니까?")) {
      await cancelPayment({ orderId: order.id, orderDetails: order.orderDetails });
      navigate(ROUTES.CART);
    }
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Row className="items-center justify-between">
          <CardTitle>주문/결제</CardTitle>
          <Button variant="outline" onClick={_handleCancelPayment}>
            결제취소
          </Button>
        </Row>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* 배송지 */}
        <Card>
          <CardHeader>
            <CardTitle>배송지 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="배송지를 입력해주세요." value={shipAddress} onChange={(e) => setShipAddress(e.target.value)} />
          </CardContent>
        </Card>

        {/* 주문정보 */}
        <Card>
          <CardHeader>
            <CardTitle>주문 정보</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {order.orderDetails.map((orderDetail) => (
              <div key={orderDetail.id}>
                {orderDetail.product && (
                  <ProductCard
                    viewStyle="list"
                    product={orderDetail.product}
                    footerContent={
                      <Row className="gap-2 bg-slate-100 p-3 rounded-md">
                        <Small>{orderDetail.quantity}개</Small>
                        <Small>*</Small>
                        <Small>{orderDetail.product.price.toLocaleString("ko-KR")}원</Small>
                        <Small>=</Small>
                        <Large>{(orderDetail.quantity * orderDetail.product.price).toLocaleString("ko-KR")}원</Large>
                      </Row>
                    }
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </CardContent>

      <CardFooter className="sticky bottom-0 bg-white p-3" style={{ boxShadow: "0px 0px 2px 0px" }}>
        <Row className="w-full justify-between">
          <Row className="items-center gap-3">
            <Checkbox id="confirm-order" className="w-8 h-8" checked={isConfirmOrder} onCheckedChange={(check) => setIsConfirmOrder(!!check)} />
            <label htmlFor="confirm-order">주문 내용을 확인했습니다.</label>
          </Row>

          <Row className="items-center gap-5">
            <T.H4>총 주문 금액: {totalAmount.toLocaleString("ko-KR")}원</T.H4>

            <Button onClick={_handlePayment}>결제하기</Button>
          </Row>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default function OrderPage() {
  return (
    <MainLayout className="h-screen" mainClassName="h-5/6">
      <_OrderPage />
    </MainLayout>
  );
}
