import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { CircleEllipsis } from "lucide-react";
import { Cart } from "../type";
import CartDeleteButton from "./CartDeleteButton";
import CartUpdateButton from "./CartUpdateButton";

interface Props {
  cart: Cart;
}

/**
 * 장바구니 옵션 드롭다운 메뉴
 */
const CartOptionMenu = ({ cart }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <CircleEllipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>장바구니</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* 장바구니 삭제 */}
        <CartDeleteButton id={cart.id} isNeedConfirm />

        {/* 장바구니 수량 변경 */}
        <CartUpdateButton id={cart.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartOptionMenu;
