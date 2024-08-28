import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { convertStringToNumber } from "@/shared/lib/string";
import { useLayoutEffect, useState } from "react";
import { useCartQuery } from "../api/get-cart";
import { usePutCart } from "../api/put-cart";
import { Cart } from "../type";

interface Props {
  id: Cart["id"];
}

/**
 * @desc 장바구니 상품 수정 버튼
 */
const CartUpdateButton = ({ id }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const q = useCartQuery({ id });
  const mtt = usePutCart();

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantity(convertStringToNumber(value));
  };

  const handleUpdateQuantity = () => {
    if (!q.data) return;
    const cart = q.data;
    mtt.mutate({ cart, newQuantity: Number(quantity) });
  };

  useLayoutEffect(() => {
    if (q.data) {
      setQuantity(q.data.quantity);
    }
  }, [q.data]);

  return (
    <ConfirmDialog
      title="수량 변경"
      description="변경할 수량을 입력해주세요."
      triggerComponent={
        <Button variant={"ghost"} className="w-full">
          수량변경
        </Button>
      }
      cancelAction={() => {}}
      confirmAction={handleUpdateQuantity}
      cancelText="취소"
      confirmText="변경"
    >
      <Input type="text" value={quantity.toLocaleString("ko-KR")} onChange={handleChangeQuantity} />
    </ConfirmDialog>
  );
};

export default CartUpdateButton;
