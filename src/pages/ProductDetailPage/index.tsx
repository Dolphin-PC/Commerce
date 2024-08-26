import { useProductCategorySuspenseQuery } from "@/features/product/api/get-product_category";
import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H2, H3, H4, Large } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import MainLayout from "@/widgets/layout/MainLayout";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RecommendProductList from "./ui/RecommendProductList";

/**
 * @desc 상품 상세 페이지
 *  - /products/:id
 *
 * * params
 *  - id: productId
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const [count, setCount] = useState(0);
  const { data: product } = useProductCategorySuspenseQuery({ id: productId });

  const onChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
  };

  return (
    <MainLayout>
      <Column className="gap-20">
        <Row className="gap-3 h-[500px]">
          <Card className="w-1/2 h-full">
            <ProductImageCarousel productId={productId} height={500} isButton />
          </Card>
          <Card className="w-1/2 min-h-full flex flex-col justify-between">
            <div>
              <CardHeader>
                <H3>{product.name}</H3>
                <H2>{product.price.toLocaleString("ko-KR")} 원</H2>
              </CardHeader>
              <CardContent>
                <Badge>상품설명</Badge>
                <p>{product.desc}</p>

                <Badge>남은수량</Badge>
                <p>{product.quantity.toLocaleString("ko-KR")} 개</p>
              </CardContent>
            </div>

            <CardFooter>
              <Column className="w-full gap-3">
                <Row>
                  <Button size="icon" onClick={() => setCount((p) => p - 1)}>
                    <Minus />
                  </Button>
                  <Input type="number" className="w-24" value={count} onChange={onChangeCount} />
                  <Button size="icon" onClick={() => setCount((p) => p + 1)}>
                    <Plus />
                  </Button>
                </Row>
                <hr />
                <Column className="w-full gap-2">
                  <Row className="m-2 justify-between">
                    <Large>총 금액</Large>
                    <H4>{(product.price * count).toLocaleString("ko-KR")} 원</H4>
                  </Row>
                  <Button>장바구니 담기</Button>
                  <Button variant="outline">찜하기</Button>
                </Column>
              </Column>
            </CardFooter>
          </Card>
        </Row>

        {product.category && <RecommendProductList id={productId} category={product.category} />}
      </Column>
    </MainLayout>
  );
};

export default ProductDetailPage;
