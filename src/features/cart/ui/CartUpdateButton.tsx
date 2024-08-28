import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Cart } from "../type";
import { Input } from "@/shared/components/ui/input";
import { useCartQuery } from "../api/get-cart";
import { useLayoutEffect, useState } from "react";
import { convertStringToNumber, toCommaString } from "@/shared/lib/string";
import { usePutCart } from "../api/put-cart";

interface Props {
  id: Cart["id"];
}

/**
 * @desc 장바구니 상품 수정 버튼
 */
const CartUpdateButton = ({ id }: Props) => {
  const [quantity, setQuantity] = useState("");

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
      setQuantity(String(q.data.quantity));
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
      <Input type="text" value={toCommaString(quantity)} onChange={handleChangeQuantity} />
    </ConfirmDialog>
  );
};

export default CartUpdateButton;
