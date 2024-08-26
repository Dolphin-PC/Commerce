import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ProductCategory } from "../type/type";

interface Props {
  product: ProductCategory;
}

const ProductCard = ({ product }: Props) => {
  console.log({ product });
  return (
    <Card>
      <CardHeader>
        <Column className="gap-2">
          <Badge className="w-fit">{product.category.categoryName}</Badge>
          <CardTitle>{product.name}</CardTitle>
        </Column>
      </CardHeader>
      <CardContent>
        <Column>
          <Row className="gap-2 items-center">
            <Badge>가격</Badge>
            <P>{product.price.toLocaleString("ko-KR")}원</P>
          </Row>
          <Row className="gap-2 items-center">
            <Badge>수량</Badge>
            <P>{product.quantity.toLocaleString("ko-KR")}개</P>
          </Row>
        </Column>
      </CardContent>

      <CardFooter className="w-full"></CardFooter>
    </Card>
  );
};

export default ProductCard;
