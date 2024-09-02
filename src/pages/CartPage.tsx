import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import { CartProductCategory } from "@/features/cart/type";
import Cart from "@/features/cart/ui/Cart";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4 } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import MainLayout from "@/widgets/layout/MainLayout";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

/**
 * @desc 장바구니 화면
 */
const CartPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const cart = useCartProductCategoryQuery({ userId: user.id });

  const [checkedCartList, setCheckedCartList] = useState<CartProductCategory[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const handleCheckedChange = (cart: CartProductCategory) => (checked: CheckedState) => {
    setCheckedCartList((prev) => {
      if (!!checked) return [...prev, cart];
      return prev.filter((e) => e !== cart);
    });
  };

  const handleCheckedAll = (checked: CheckedState) => {
    setCheckedAll(!!checked);
    setCheckedCartList(() => {
      if (checked) return cart.data || [];
      return [];
    });
  };

  return (
    <Column className="gap-2">
      <H3>장바구니</H3>
      <Row className="items-center gap-2 justify-end">
        <label htmlFor="all-carts">
          <H4>전체 선택</H4>
        </label>
        <Checkbox id="all-carts" className="h-6 w-6" checked={checkedAll} onCheckedChange={handleCheckedAll} />
      </Row>
      {cart.data && (
        <Column className="gap-3">
          {cart.data.map((cart) => (
            <Cart key={cart.id} cart={cart}>
              <Card>
                <Row className="items-center justify-between mr-4">
                  <Cart.Product />
                  <Checkbox id="all-carts" className="h-6 w-6" onCheckedChange={handleCheckedChange(cart)} checked={!!checkedCartList.find((e) => e.id === cart.id)} />
                </Row>
              </Card>
            </Cart>
          ))}
        </Column>
      )}
      <H4>총 상품 수: {cart.data?.length}</H4>
      <H4>선택된 상품 수: {checkedCartList.filter((cart) => cart !== null).length}</H4>
      <H4>
        선택된 상품 가격:
        {checkedCartList
          .reduce((acc, cart) => {
            if (cart === null || cart.product === null) return acc;
            return acc + cart.product.price * cart.quantity;
          }, 0)
          .toLocaleString("ko-KR")}
      </H4>
      <Button disabled={!checkedCartList.length}>구매하기</Button>
    </Column>
  );
};

export default function () {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}
