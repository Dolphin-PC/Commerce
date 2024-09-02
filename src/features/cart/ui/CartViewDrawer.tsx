import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { CartProductCategory } from "../type";
import CartCard from "./CartCard";

interface Props {
  data: CartProductCategory[];
}

/**
 * @desc 장바구니 Drawer (오른쪽)
 */
const CartViewDrawer = ({ data }: Props) => {
  const totalPrice = useMemo(
    () =>
      data.reduce((acc, cur) => {
        if (cur.product === null) return acc;
        return acc + cur.product.price * cur.quantity;
      }, 0),
    [data]
  );

  return (
    <Drawer direction="right" handleOnly>
      <Button asChild variant="outline">
        <DrawerTrigger>장바구니 보기</DrawerTrigger>
      </Button>
      <DrawerContent className="w-1/2" direction="right">
        <DrawerHeader>
          <DrawerTitle>내 장바구니</DrawerTitle>
          <DrawerDescription>내가 담은 상품들</DrawerDescription>
        </DrawerHeader>
        <Column className="ml-2 mr-2 gap-2 overflow-scroll scrollbar-hide">
          {data.map((cart) => (
            <CartCard key={cart.id} cart={cart}>
              <CartCard.Product />
            </CartCard>
          ))}
        </Column>
        <DrawerFooter>
          <Row className="items-center gap-3">
            <Badge>총 가격</Badge>
            <H4>{totalPrice.toLocaleString("ko-KR")} 원</H4>
          </Row>
          <Button asChild>
            <Link to={ROUTES.CART}>장바구니 보기</Link>
          </Button>
          <Button variant="outline" asChild>
            <DrawerClose>닫기</DrawerClose>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartViewDrawer;
