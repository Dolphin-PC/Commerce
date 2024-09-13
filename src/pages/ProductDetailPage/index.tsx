import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import CartAddButton from "@/features/cart/ui/CartAddButton";
import CartViewDrawer from "@/features/cart/ui/CartViewDrawer";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategorySuspenseQuery } from "@/features/product/api/get-product_category";
import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H2, H3, H4, Large, T } from "@/shared/components/atoms/Typography";
import Loading from "@/shared/components/molecules/Loading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { convertStringToNumber } from "@/shared/lib/string";
import MainLayout from "@/widgets/MainLayout";
import { Minus, Plus, ShoppingCartIcon } from "lucide-react";
import { Fragment, Suspense, useLayoutEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailPageHelmet } from "../Helmets";
import OrderDialog from "./ui/OrderDialog";
import RecommendProductList from "./ui/RecommendProductList";

/**
 * @desc 상품 상세 페이지
 *  - /products/:id
 *
 * * params
 *  - id: productId
 */
const _ProductDetailPage = () => {
  useScrollTop();
  const { id } = useParams();
  const productId = Number(id);

  const [productCount, setProductCount] = useState(0);
  const user = useAuthStore((state) => state.user);

  const { data: product } = useProductCategorySuspenseQuery({ id: productId });
  const { data: cartProductList } = useCartProductCategoryQuery({ userId: user?.id });
  const { data: quantity } = useProductQuantity({ id: productId });

  const isProductInCart = useMemo(() => cartProductList?.some((cart) => cart.product?.id === productId), [cartProductList, productId]);

  const handleChangeProductCount = (newCount: number) => {
    if (!quantity) return;
    if (quantity.quantity < newCount) newCount = quantity.quantity;
    setProductCount(newCount);
  };

  // 추천 상품에 의해 페이지 이동시 제품 수량 초기화
  useLayoutEffect(() => {
    setProductCount(0);
  }, [productId]);

  return (
    <Column className="gap-20">
      <Column className="gap-2">
        <Row className="gap-3 h-[500px] items-start">
          {/* 제품 이미지 */}
          <Card className="w-1/2 h-full">
            <ProductImageCarousel.Container productId={productId} height={500} isButton />
          </Card>

          {/* 제품 설명 */}
          <Card className="relative w-1/2 min-h-full flex flex-col justify-start">
            <CardHeader>
              <H3>{product.name}</H3>
              <H2>{product.price.toLocaleString("ko-KR")} 원</H2>

              <Column className="absolute top-0 right-3">
                {isProductInCart && cartProductList && (
                  <CartViewDrawer
                    data={cartProductList}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <ShoppingCartIcon />
                      </Button>
                    }
                  />
                )}
              </Column>
            </CardHeader>

            <CardContent>
              <Badge>상품설명</Badge>
              <p>{product.desc}</p>

              <Badge>남은수량</Badge>
              {quantity && <p>{quantity.quantity.toLocaleString("ko-KR")} 개</p>}
            </CardContent>

            <CardFooter>
              <Column className="w-full gap-3">
                <hr />

                {quantity && quantity.quantity > 0 && (
                  <Fragment>
                    <Row>
                      <Button size="icon" onClick={() => handleChangeProductCount(productCount - 1)} disabled={productCount === 0}>
                        <Minus />
                      </Button>
                      <Input type="text" className="w-24" value={productCount.toLocaleString()} onChange={(e) => handleChangeProductCount(convertStringToNumber(e.target.value))} />
                      <Button size="icon" onClick={() => handleChangeProductCount(productCount + 1)} disabled={!quantity || quantity.quantity <= productCount}>
                        <Plus />
                      </Button>
                    </Row>
                    <Column className="w-full gap-2">
                      <Row className="m-2 justify-between">
                        <Large>총 금액</Large>
                        <H4>{(product.price * productCount).toLocaleString("ko-KR")} 원</H4>
                      </Row>
                      {/* 구매 모달 창 */}
                      {user && product && quantity && (
                        <OrderDialog trigger={<Button disabled={productCount == 0}>구매</Button>} product={product} quantity={productCount}>
                          <BadgeRowLead badge="구매수량" lead={`${productCount}개`} />
                          <BadgeRowLead badge="결제금액" lead={`${(product.price * productCount).toLocaleString("ko-KR")}원`} />
                        </OrderDialog>
                      )}
                      {/* 장바구니 */}
                      {!isProductInCart && <CartAddButton product={product} productCount={productCount} />}
                    </Column>
                  </Fragment>
                )}

                {quantity && quantity.quantity == 0 && <T.Blockquote>상품이 품절되었어요.</T.Blockquote>}
              </Column>
            </CardFooter>
          </Card>
        </Row>
      </Column>
      {/* 추천 상품 */}
      {product.category && (
        <Suspense fallback={<Loading />}>
          <RecommendProductList id={productId} category={product.category} />
        </Suspense>
      )}
    </Column>
  );
};

export default function ProductDetailPage() {
  return (
    <MainLayout>
      <ProductDetailPageHelmet />

      <_ProductDetailPage />
    </MainLayout>
  );
}
