import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CartProductCategory } from "../type";
import CartOptionMenu from "./CartOptionMenu";
import ProductCardImage from "@/features/product_image/ui/ProductCardImage";
import { createContext, useContext } from "react";

const CartProductCardContext = createContext<{ cart: CartProductCategory } | null>(null);

interface Props {
  cart: CartProductCategory;
  isOptionMenu?: boolean;
  children?: React.ReactNode;
}

/**
 * @desc 장바구니 상품 카드
 */
const CartCard = ({ cart, isOptionMenu, children }: Props) => {
  const { product } = cart;

  if (product === null) return;
  return (
    <CartProductCardContext.Provider value={{ cart }}>
      <Card className="relative">
        {isOptionMenu && (
          <Column className="absolute top-0 left-0">
            <CartOptionMenu cart={cart} />
          </Column>
        )}
        {children}
      </Card>
    </CartProductCardContext.Provider>
  );
};

// 장바구니 > 상품
const Product = () => {
  const context = useContext(CartProductCardContext);
  if (context === null) throw new Error("CartCard.Product must be used within CartCard");

  const { cart } = context;
  const { product } = cart;

  if (product === null) return;
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
          </Row>
        </CardFooter>
      </Column>
    </Row>
  );
};

CartCard.Product = Product;
export default CartCard;
