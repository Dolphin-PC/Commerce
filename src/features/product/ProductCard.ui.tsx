import { ProductCategory } from "@/entities/product/product_category-get.api";
import { Card, CardHeader, CardTitle } from "@/shared/components/ui/card";

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
