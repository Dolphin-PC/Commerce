import { useAuthStore } from "@/features/@auth/store/auth.store";
import { addProduct } from "@/features/product/api/post-product";
import { ProductFormDataType } from "@/features/product/model/product.zod";
import ProductForm from "@/features/product/ui/ProductForm";
import { useAddProductImage } from "@/features/product_image/api/post-product-image";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { Link, useNavigate } from "react-router-dom";

const _ProductNewPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const postImageMutation = useAddProductImage();

  const handleAddProduct = async (formData: ProductFormDataType, images: File[]) => {
    if (user === null) throw Error("로그인이 필요합니다.");

    try {
      const uploadImages = images.filter((e) => e !== null) as File[];

      if (uploadImages.length == 0) return alert("하나 이상의 이미지를 업로드해주세요.");

      const newProduct = await addProduct({
        categoryId: formData.categoryId,
        name: formData.name,
        desc: formData.desc,
        price: formData.price,
        quantity: formData.quantity,
        sellerId: user.id,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
      });

      Promise.all(uploadImages.map((image) => postImageMutation.mutate({ productId: newProduct.id, file: image }))).then(() => {
        toast({ title: "상품 등록이 완료되었습니다.", description: "상품 페이지로 이동합니다." });
        navigate(ROUTES.DASHBOARD__PRODUCTS__ID(newProduct.id));
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Column className="gap-3">
      <Button asChild className="w-[100px]">
        <Link to={ROUTES.DASHBOARD__PRODUCTS}>상품 목록</Link>
      </Button>
      <Card>
        <CardHeader>
          <Row className="gap-[20px]">
            <CardTitle>상품 등록</CardTitle>
          </Row>
        </CardHeader>

        <CardContent>
          <ProductForm onSave={handleAddProduct} />
        </CardContent>
      </Card>
    </Column>
  );
};

export default function ProductNewPage() {
  return (
    <DashBoardLayout>
      <_ProductNewPage />
    </DashBoardLayout>
  );
}
