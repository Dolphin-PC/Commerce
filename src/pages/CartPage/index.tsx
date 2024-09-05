import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useDeleteCartList } from "@/features/cart/api/delete-cart_list";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import { CartProductCategory } from "@/features/cart/type";
import Cart from "@/features/cart/ui/Cart";
import { useNewOrder } from "@/features/order/hooks/useNewOrder";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4 } from "@/shared/components/atoms/Typography";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/layout/MainLayout";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * @desc 장바구니 화면
 */
const CartPage = () => {
  const navigate = useNavigate();
  const [checkedCartList, setCheckedCartList] = useState<CartProductCategory[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const user = useAuthStore((state) => state.getUser());
  const cart = useCartProductCategoryQuery({ userId: user.id });

  const deleteMutation = useDeleteCartList();

  const { handleNewOrder } = useNewOrder();

  // 장바구니 개별선택
  const handleCheckedChange = (cart: CartProductCategory) => (checked: CheckedState) => {
    setCheckedCartList((prev) => {
      if (!!checked) return [...prev, cart];
      return prev.filter((e) => e !== cart);
    });
  };

  // 장바구니 전체선택
  const handleCheckedAll = (checked: CheckedState) => {
    setCheckedAll(!!checked);
    setCheckedCartList(() => {
      if (checked) return cart.data || [];
      return [];
    });
  };

  // 장바구니 선택삭제
  const handleDeleteCartList = () => {
    if (checkedCartList.length === 0) return;
    deleteMutation.mutate(
      { ids: checkedCartList.map((e) => e.id) },
      {
        onSuccess: () => {
          setCheckedCartList([]);
          setCheckedAll(false);
          toast({ title: "장바구니 삭제", description: "선택된 상품을 장바구니에서 삭제했습니다." });
        },
      }
    );
  };

  const handleOrder = async () => {
    if (checkedCartList.length === 0) {
      toast({ title: "주문 실패", description: "주문할 상품을 선택해주세요." });
      return;
    }

    // 주문::생성
    const newOrder = await handleNewOrder(checkedCartList);

    // 주문상세::생성
    navigate(ROUTES.ORDERS_ID_(String(newOrder.id)));
  };

  return (
    <Fragment>
      <Column className="gap-2 mb-20">
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
                    <Link to={ROUTES.PRODUCTS_ID_(cart.productId)}>
                      <Cart.Product />
                    </Link>
                    <Checkbox id="all-carts" className="h-6 w-6" onCheckedChange={handleCheckedChange(cart)} checked={!!checkedCartList.find((e) => e.id === cart.id)} />
                  </Row>
                </Card>
              </Cart>
            ))}
          </Column>
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
