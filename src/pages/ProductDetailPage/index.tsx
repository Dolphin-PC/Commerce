import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import CartAddButton from "@/features/cart/ui/CartAddButton";
import CartViewDrawer from "@/features/cart/ui/CartViewDrawer";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategorySuspenseQuery } from "@/features/product/api/get-product_category";
import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H2, H3, H4, Large } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { useScrollTop } from "@/shared/hooks/useScrollTop";
import { convertStringToNumber } from "@/shared/lib/string";
import MainLayout from "@/widgets/MainLayout";
import { Minus, Plus } from "lucide-react";
import { useLayoutEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import RecommendProductList from "./ui/RecommendProductList";
import { ProductDetailPageHelmet } from "../Helmets";

/**
 * @desc 상품 상세 페이지
 *  - /products/:id
 *
 * * params
 *  - id: productId
 */
const ProductDetailPage = () => {
  useScrollTop();
  const { id } = useParams();
  const productId = Number(id);

  const [productCount, setProductCount] = useState(0);
  const user = useAuthStore((state) => state.getUser());

  const { data: product } = useProductCategorySuspenseQuery({ id: productId });
  const { data: cartProductList } = useCartProductCategoryQuery({ userId: user?.id });
  const { data: quantity } = useProductQuantity({ id: productId });

  const isProductInCart = useMemo(() => cartProductList?.some((cart) => cart.product?.id === productId), [cartProductList, productId]);

  const onChangeProductCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProductCount(convertStringToNumber(value));
  };

  const handleLike = () => {};

  // 추천 상품에 의해 페이지 이동시 제품 수량 초기화
  useLayoutEffect(() => {
    setProductCount(0);
  }, [productId]);

  return (
    <MainLayout>
      <ProductDetailPageHelmet />
      <Column className="gap-20">
        <Column className="gap-2">
          <Row className="gap-3 h-[500px] items-start">
            {/* 제품 이미지 */}
            <Card className="w-1/2 h-full">
              <ProductImageCarousel.Container productId={productId} height={500} isButton />
            </Card>

            {/* 제품 설명 */}
            <Card className="w-1/2 min-h-full flex flex-col justify-start">
              <CardHeader>
                <H3>{product.name}</H3>
                <H2>{product.price.toLocaleString("ko-KR")} 원</H2>
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
                  <Row>
                    <Button size="icon" onClick={() => setProductCount((p) => (p === 0 ? p : p - 1))} disabled={productCount === 0}>
                      <Minus />
                    </Button>
                    <Input type="text" className="w-24" value={productCount.toLocaleString()} onChange={onChangeProductCount} />
                    <Button size="icon" onClick={() => setProductCount((p) => p + 1)}>
                      <Plus />
                    </Button>
                  </Row>
                  <Column className="w-full gap-2">
                    <Row className="m-2 justify-between">
                      <Large>총 금액</Large>
                      <H4>{(product.price * productCount).toLocaleString("ko-KR")} 원</H4>
                    </Row>

                    {!isProductInCart && <CartAddButton product={product} productCount={productCount} />}
                    {isProductInCart && cartProductList && <CartViewDrawer data={cartProductList} />}
                    <Button variant="outline" onClick={handleLike}>
                      찜하기
                    </Button>
                  </Column>
                </Column>
              </CardFooter>
            </Card>
          </Row>
        </Column>
        {/* 추천 상품 */}
        {product.category && <RecommendProductList id={productId} category={product.category} />}
      </Column>
    </MainLayout>
  );
};

export default ProductDetailPage;
