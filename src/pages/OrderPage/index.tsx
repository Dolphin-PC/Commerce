import { useAuthStore } from "@/features/@auth/store/auth.store";
import ProductCard from "@/features/product/ui/ProductCard";
import Row from "@/shared/components/atoms/Row";
import { Large, Small } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/widgets/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderDetailProductSuspenseQuery } from "./api/get-order-product";
import { usePaymentHook } from "./hook/usePaymentHook";
import { ROUTES } from "@/shared/consts/route.const";

/**
 * @desc 주문 화면
 *  - /orders/:id
 */
const _OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = Number(id);
  const { id: userId } = useAuthStore((state) => state.getUser());

  const {
    data: { data: order },
  } = useGetOrderDetailProductSuspenseQuery({ orderId, userId, status: "PAY_BEFORE" });

  const { handlePayment, cancelPayment, isConfirmOrder, setIsConfirmOrder, setShipAddress, shipAddress, totalPrice } = usePaymentHook({
    orderId: order.id,
    orderDetails: order.order_details,
  });

  const handleCancelPayment = async () => {
    if (window.confirm("결제를 취소하시겠습니까?")) {
      await cancelPayment();
      navigate(ROUTES.CART);
    }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <Row className="items-center justify-between">
          <CardTitle>주문/결제</CardTitle>
          <Button variant="outline" onClick={handleCancelPayment}>
            결제취소
          </Button>
        </Row>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3 overflow-auto scrollbar-hide">
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
          <CardContent>
            {order.order_details.map((orderDetail) => (
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
          <CardFooter>
            <Row className="w-full justify-end">
              <Large>총 주문 금액: {totalPrice.toLocaleString("ko-KR")}원</Large>
            </Row>
          </CardFooter>
        </Card>

        {/* 결제정보 */}
        <Card>
          <CardHeader>
            <CardTitle>결제 정보</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </CardContent>

      <CardFooter>
        <Row className="w-full justify-between">
          <Row className="items-center gap-3">
            <Checkbox id="confirm-order" className="w-8 h-8" checked={isConfirmOrder} onCheckedChange={(check) => setIsConfirmOrder(!!check)} />
            <label htmlFor="confirm-order">주문 내용을 확인했습니다.</label>
          </Row>
          <Button onClick={handlePayment}>결제하기</Button>
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
