import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ProductCategory } from "../model/type";

interface Props {
  product: ProductCategory;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
