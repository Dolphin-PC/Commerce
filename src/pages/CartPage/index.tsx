import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import Cart from "@/features/cart/ui/Cart";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4 } from "@/shared/components/atoms/Typography";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/MainLayout";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useCartHook } from "./hook/useCartHook";

/**
 * @desc 장바구니 화면
 */
const CartPage = () => {
  const user = useAuthStore((state) => state.getUser());
  const { data: cartList } = useCartProductCategoryQuery({ userId: user.id });

  const { checkedAll, checkedCartList, handleCheckedAll, handleCheckedChange, handleDeleteCartList, handleOrder } = useCartHook();

  return (
    <Fragment>
      <Column className="gap-2 mb-20">
        <H3>장바구니</H3>
        {cartList && cartList.length > 0 && (
          <Fragment>
            <Row className="items-center gap-2 justify-end">
              <label htmlFor="all-carts">
                <H4>전체 선택</H4>
              </label>
              <Checkbox id="all-carts" className="h-6 w-6" checked={checkedAll} onCheckedChange={handleCheckedAll(cartList)} />
            </Row>
            <Column className="gap-3">
              {cartList.map((cart) => (
                <Cart key={cart.id} cart={cart}>
                  <Card>
                    <Row className="items-center justify-between mr-4">
                      <Link to={ROUTES.PRODUCTS_ID_(cart.productId)}>
                        <Cart.Product />
                      </Link>
                      <Checkbox id="all-carts" className="h-6 w-6" onCheckedChange={handleCheckedChange(cart)} checked={!!checkedCartList.find((e) => e.id === cart.id)} />
                    </Row>
                  </Card>
                </Cart>
              ))}
            </Column>
          </Fragment>
        )}
      </Column>
      <div className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full bg-white container p-4" style={{ boxShadow: "0px -1px 0px 0px gray" }}>
        <Row className="justify-between ">
          <ConfirmDialog
            title="장바구니 삭제"
            description="정말 삭제하시겠습니까?"
            cancelText="취소"
            cancelAction={() => {}}
            confirmAction={handleDeleteCartList}
            confirmText="삭제"
            triggerComponent={
              <Button variant={"outline"} disabled={!checkedCartList.length}>
                선택삭제
              </Button>
            }
          />
          <Row className="items-center gap-3">
            <Row className="gap-1">
              <H4 className="font-thin">총</H4>
              <H4>{checkedCartList.length}</H4>
              <H4 className="font-thin">건</H4>
            </Row>
            <H4 className="font-thin">주문금액</H4>
            <H4>
              {checkedCartList
                .reduce((acc, cart) => {
                  if (cart === null || cart.product === null) return acc;
                  return acc + cart.product.price * cart.quantity;
                }, 0)
                .toLocaleString("ko-KR")}
              원
            </H4>
            <Button disabled={!checkedCartList.length} className="w-40" onClick={handleOrder}>
              구매하기
            </Button>
          </Row>
        </Row>
      </div>
    </Fragment>
  );
};

export default function () {
  return (
    <MainLayout>
      <CartPage />
    </MainLayout>
  );
}
