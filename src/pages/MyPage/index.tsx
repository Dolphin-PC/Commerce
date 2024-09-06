import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartListQuery } from "@/features/cart/api/get_list-cart";
import { useGetOrderListQuery } from "@/features/order/api/get-order_list";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4, Muted } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { ROUTES, Routes } from "@/shared/consts/route.const";
import Header from "@/widgets/Header";
import MainLayout from "@/widgets/MainLayout";
import { ShoppingBag, ShoppingCart, UserRound } from "lucide-react";
import { cloneElement, ReactNode } from "react";
import { Link } from "react-router-dom";

const _MyPage = () => {
  const user = useAuthStore((state) => state.getUser());

  const { data: cartData } = useCartListQuery({ userId: user.id });
  const { data: orderData } = useGetOrderListQuery({ userId: user.id });

  return (
    <Row className="gap-5">
      <Card className="w-1/2 p-8 h-fit">
        <Row className="justify-between">
          <Row className="items-center gap-2">
            <UserRound size={52} color="white" className="bg-slate-400 rounded-full p-2" />
            <H4>{user.nickname} 님</H4>
          </Row>
          <Button variant="outline">내 정보 수정</Button>
        </Row>
      </Card>

      <Card className="w-1/2 p-8">
        <Column className="gap-5">
          {orderData && <IconWrapper icon={<ShoppingBag />} label="주문 내역" count={orderData.length} link={ROUTES.MY__ORDERS} />}
          {cartData && <IconWrapper icon={<ShoppingCart />} label="장바구니" count={cartData.length} link={ROUTES.CART} />}
        </Column>
      </Card>
    </Row>
  );
};

const IconWrapper = ({ icon, label, count, link }: { icon: ReactNode; label: string; count: number; link: Routes }) => {
  return (
    <Link to={link as string}>
      <Row className="gap-3 items-center">
        <div className="flex items-center justify-center w-16 h-16 bg-slate-200 rounded-full p-3">{cloneElement(icon as React.ReactElement, { size: 24 })}</div>
        <Column>
          <Muted>{label}</Muted>
          <H3>{count}</H3>
        </Column>
      </Row>
    </Link>
  );
};

export default function MyPage() {
  return (
    <MainLayout headerChildren={<Header />}>
      <_MyPage />
    </MainLayout>
  );
}
