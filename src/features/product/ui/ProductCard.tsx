import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ProductCategory } from "../type/type";

interface Props {
  product: ProductCategory;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.category?.categoryName}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
