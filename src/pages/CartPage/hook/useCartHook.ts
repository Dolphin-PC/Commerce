import { useDeleteCartList } from "@/features/cart/api/delete-cart_list";
import { CartProductCategory } from "@/features/cart/type";
import { useNewOrder } from "@/features/order/hooks/useNewOrder";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Return {
  checkedCartList: CartProductCategory[];
  checkedAll: boolean;

  handleCheckedChange: (cart: CartProductCategory) => (checked: CheckedState) => void;
  handleCheckedAll: (cartList: CartProductCategory[]) => (checked: CheckedState) => void;
  handleDeleteCartList: () => void;
  handleOrder: () => void;
}

export const useCartHook = (): Return => {
  const navigate = useNavigate();
  const [checkedCartList, setCheckedCartList] = useState<CartProductCategory[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

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
  const handleCheckedAll = (cartList: CartProductCategory[]) => (checked: CheckedState) => {
    setCheckedAll(!!checked);
    setCheckedCartList(() => {
      if (checked) return cartList || [];
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

    await deleteCartOnNewOrder(checkedCartList);

    navigate(ROUTES.ORDERS_ID_(String(newOrder.id)));
  };

  const deleteCartOnNewOrder = async (cartList: CartProductCategory[]) => {
    if (cartList.length === 0) return;
    if (!confirm("구매하신 상품을 장바구니에서 삭제하시겠습니까?")) return;

    await deleteMutation.mutateAsync({ ids: cartList.map((e) => e.id) });
  };

  return {
    checkedCartList,
    checkedAll,
    handleCheckedChange,
    handleCheckedAll,
    handleDeleteCartList,
    handleOrder,
  };
};
