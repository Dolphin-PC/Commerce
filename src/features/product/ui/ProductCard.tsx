import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { P } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate } from "@/shared/lib/date";
import { FilePen, Trash2 } from "lucide-react";
import { ProductCategory } from "../type/type";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";

interface Props {
  product: ProductCategory;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
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
          <Row className="gap-2 items-center">
            <Badge>등록일</Badge>
            <P>{formatDate(new Date(product.createdAt))}</P>
          </Row>
          <Row className="gap-2 items-center">
            <Badge>수정일</Badge>
            <P>{formatDate(new Date(product.updatedAt))}</P>
          </Row>
        </Column>
      </CardContent>

      <CardFooter className="w-full">
        <Row className="w-full justify-between">
          <Button asChild>
            <Link to={ROUTES.DASHBOARD__PRODUCTS__ID(product.id)}>상세보기</Link>
          </Button>
          <Row className="gap-2">
            <Button>
              <FilePen />
            </Button>
            <Button variant={"destructive"}>
              <Trash2 />
            </Button>
          </Row>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
