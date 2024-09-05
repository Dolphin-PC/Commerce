import ProductCardImage from "@/features/product_image/ui/ProductCardImage";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { productCategoryPrefetchOptions } from "../api/get-product_category";
import { Product } from "../type/type";
import { Category } from "@/features/category/model/type";

interface Props {
  product: Product;
  category?: Category | null;
  viewStyle?: "grid" | "list";
}

/**
 * @desc 목록에서 사용되는 상품 카드 UI
 */
const ProductCard = ({ product, category, viewStyle = "grid" }: Props) => {
  const qc = useQueryClient();

  const handlePrefetch = () => {
    qc.prefetchQuery(productCategoryPrefetchOptions({ id: product.id }));
  };

  if (viewStyle === "list") {
    return (
      <Card onMouseEnter={handlePrefetch} className="hover:translate-x-3 transition-transform duration-300">
        <Row className="h-[250px]">
          <CardHeader className="w-[250px]">
            <ProductCardImage productId={product.id} height={200} />
          </CardHeader>
          <CardContent className="flex flex-col h-full justify-between p-5">
            <Column className="gap-2">
              {category && <Badge className="w-fit">{category.categoryName}</Badge>}
              <CardTitle>{product.name}</CardTitle>
            </Column>
            <Row className="gap-2 items-center">
              <Badge size="small">가격</Badge>
              <P>{product.price.toLocaleString("ko-KR")}원</P>
            </Row>
          </CardContent>
        </Row>
      </Card>
    );
  }

  // grid style
  return (
    <Card onMouseEnter={handlePrefetch} className="hover:-translate-y-3 transition-transform duration-300">
      <CardHeader>
        <Column className="gap-2">
          {category && <Badge className="w-fit">{category.categoryName}</Badge>}
          <CardTitle>{product.name}</CardTitle>
        </Column>
      </CardHeader>
      <CardContent>
        <Column className="justify-between">
          <ProductCardImage productId={product.id} height={300} />
          <Row className="gap-2 items-center">
            <Badge size="small">가격</Badge>
            <P>{product.price.toLocaleString("ko-KR")}원</P>
          </Row>
        </Column>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
