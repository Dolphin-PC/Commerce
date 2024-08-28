import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CartProductCategory } from "../type";
import CartDeleteButton from "./CartDeleteButton";

interface Props {
  cart: CartProductCategory;
}

/**
 * @desc 장바구니 상품 카드
 */
const CartProductCard = ({ cart }: Props) => {
  const { product } = cart;

  if (product === null) return;
  return (
    <Card>
      <CartDeleteButton id={cart.id} />
      <Row className="m-4">
        <CardHeader>
          <div className="h-[120px] w-[100px]">
            <ProductImageCarousel.Container productId={product.id} height={100} />
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
    </Card>
  );
};

export default CartProductCard;
