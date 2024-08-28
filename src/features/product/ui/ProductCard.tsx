import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ProductCategory } from "../type/type";
import ProductImageCarousel from "@/features/product_image/ui/ProductImageCarousel";
import { getProductCategory } from "../api/get-product_category";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

interface Props {
  product: ProductCategory;
  showCategory?: boolean;
}

/**
 * @desc 목록에서 사용되는 상품 카드 UI
 */
const ProductCard = ({ product, showCategory = true }: Props) => {
  // const prefetching = useProductCategoryPrefetch({id: product.id});
  const qc = useQueryClient();

  const handlePrefetch = () => {
    console.log("handlePrefetch");
    qc.prefetchQuery({
      queryKey: [queryKey.product, queryKey.category, product.id],
      queryFn: () => getProductCategory({ id: product.id }),
    });
  };

  return (
    <Card onMouseEnter={handlePrefetch}>
      <CardHeader>
        <Column className="gap-2">
          {showCategory && <Badge className="w-fit">{product.category?.categoryName}</Badge>}
          <CardTitle>{product.name}</CardTitle>
        </Column>
      </CardHeader>
      <CardContent>
        <Column className="justify-between">
          <div className="h-[250px]">
            <ProductImageCarousel.Container productId={product.id} height={200} />
          </div>
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
