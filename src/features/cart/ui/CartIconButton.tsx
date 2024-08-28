import { User } from "@/features/user/model/type";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/shadcn-util";
import { ShoppingCart } from "lucide-react";
import { useCartListQuery } from "../api/get_list-cart";
import { Fragment } from "react/jsx-runtime";
import TooltipHover from "@/shared/components/molecules/TooltipHover";

interface Props {
  userId: User["id"];
}

/**
 * @desc 장바구니 아이콘 버튼
 */
const CartIconButton = ({ userId }: Props) => {
  const { data } = useCartListQuery({ userId });

  return (
    <div className="relative">
      <TooltipHover
        tooltipContent="장바구니"
        triggerComponent={
          <Button variant="outline" size="icon">
            <ShoppingCart />
          </Button>
        }
      />

      {data && data.length > 0 && (
        <Fragment>
          <div className={cn(rightCenter, size, "bg-red-500 rounded-full")}></div>
          <span className={cn(rightCenter, size, "text-white text-center")}>{data.length}</span>
        </Fragment>
      )}
    </div>
  );
};

const rightCenter = "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2";
const size = "w-6 h-6";

export default CartIconButton;
