import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";
import { CartProductCategory } from "../type";
import Cart from "./Cart";
import { Card } from "@/shared/components/ui/card";
import CartOptionMenu from "./CartOptionMenu";

interface Props {
  data: CartProductCategory[];
  trigger: ReactNode;
}

/**
 * @desc 장바구니 Drawer (오른쪽)
 */
const CartViewDrawer = ({ data, trigger }: Props) => {
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
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="w-1/2" direction="right">
        <DrawerHeader>
          <DrawerTitle>내 장바구니</DrawerTitle>
          <DrawerDescription>내가 담은 상품들</DrawerDescription>
        </DrawerHeader>
        <Column className="ml-2 mr-2 gap-2 overflow-scroll scrollbar-hide">
          {data.map((cart) => (
            <Cart key={cart.id} cart={cart}>
              <Card>
                <CartOptionMenu cart={cart} />
                <Cart.Product />
              </Card>
            </Cart>
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
