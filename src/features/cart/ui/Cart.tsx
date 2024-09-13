import ProductCardImage from "@/features/product_image/ui/ProductCardImage";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { CircleEllipsis } from "lucide-react";
import { createContext, useContext } from "react";
import { useCartProductQuantity } from "../hook/useCartProductQuantity";
import { CartProductCategory } from "../type";
import CartDeleteButton from "./CartDeleteButton";
import CartUpdateButton from "./CartUpdateButton";

const CartProductCardContext = createContext<{ cart: CartProductCategory } | null>(null);

interface CartProps {
  cart: CartProductCategory;
  children?: React.ReactNode;
}

/**
 * @desc 장바구니 Compound Component
 */
const Cart = ({ cart, children }: CartProps) => {
  const { product } = cart;

  if (product === null) return;
  return <CartProductCardContext.Provider value={{ cart }}>{children}</CartProductCardContext.Provider>;
};

/**
 * 장바구니 > 상품
 */
const Product = () => {
  const context = useContext(CartProductCardContext);
  if (context === null) throw new Error("Cart.Product must be used within Cart");

  const { cart } = context;
  const { product } = cart;

  const { isLoading, enable, remainQuantity } = useCartProductQuantity({ cart, product });

  return (
    <Row className="m-4">
      <CardHeader>
        <div className="h-[120px] w-[100px]">
          <ProductCardImage productId={product.id} height={100} />
        </div>
      </CardHeader>
      <Column className="justify-between">
        <CardContent>
          <Column className="gap-3">
            <Badge size={"small"} className="w-fit">
              {product.category?.categoryName}
            </Badge>
            <CardTitle>{product.name}</CardTitle>
          </Column>
        </CardContent>
        <CardFooter>
          <Row className="gap-2">
            <Row className="gap-2 items-center">
              <Badge size="small">가격</Badge>
              <P>{product.price.toLocaleString("ko-KR")}원</P>
            </Row>
            <Row className="gap-2 items-center">
              <Badge size="small">개수</Badge>
              <P>{cart.quantity.toLocaleString("ko-KR")}개</P>
            </Row>
            {!isLoading && !enable && (
              <Row className="gap-2 items-center">
                <Badge size="small" variant="destructive">
                  재고부족(남은수량)
                </Badge>
                <P>{remainQuantity.toLocaleString("ko-KR")}개</P>
              </Row>
            )}
          </Row>
        </CardFooter>
      </Column>
    </Row>
  );
};
Product.displayName = "Cart.Product";

/**
 * 장바구니 > 옵션 드롭다운 메뉴
 */
const OptionMenu = () => {
  const context = useContext(CartProductCardContext);
  if (context === null) throw new Error("Cart.Product must be used within Cart");

  const { cart } = context;
  return (
    <div className="absolute top-0 left-0">
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
    </div>
  );
};
OptionMenu.displayName = "Cart.OptionMenu";

Cart.Product = Product;
Cart.OptionMenu = OptionMenu;
export default Cart;
