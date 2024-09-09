import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductQuantity } from "@/features/product/api/get-product-quantity";
import { useProductCategoryQuery } from "@/features/product/api/get-product_category";
import { useProductPut } from "@/features/product/api/put-product";
import { ProductFormDataType } from "@/features/product/model/product.zod";
import ProductForm from "@/features/product/ui/ProductForm";
import { useProductImageQuery } from "@/features/product_image/api/get_list-product-image";
import { useAddProductImage } from "@/features/product_image/api/post-product-image";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { CenterError } from "@/shared/components/molecules/Error";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const _DashboardProductEditPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const productCategory = useProductCategoryQuery({ id: productId, sellerId: user?.id });
  const quantity = useProductQuantity({ id: productId, sellerId: user?.id });
  const productImage = useProductImageQuery({ productId: Number(productCategory.data?.id) });
  const putProductMutation = useProductPut();
  const postImageMutation = useAddProductImage();

  /** 상품 수정 */
  const handlePutProduct = async (formData: ProductFormDataType, images: File[]) => {
    if (user === null) throw Error("로그인이 필요합니다.");
    if (!productImage.data) throw Error("저장된 상품이미지를 불러오는데 실패했습니다.");

    const uploadImages = images.filter((e) => e !== null) as File[];

    if (uploadImages.length + productImage.data.length === 0) return alert("하나 이상의 이미지를 업로드해주세요.");

    putProductMutation.mutate(
      {
        id: productId,
        update: {
          categoryId: formData.categoryId,
          name: formData.name,
          desc: formData.desc,
          price: formData.price,
          quantity: formData.quantity,
        },
      },
      {
        onSuccess: (res) => {
          Promise.all(uploadImages.map((image) => postImageMutation.mutate({ productId: res.id, file: image }))).then(() => {
            toast({ title: "상품 수정이 완료되었습니다.", description: "상품 페이지로 이동합니다." });
            navigate(ROUTES.DASHBOARD__PRODUCTS__ID(res.id));
          });
        },
        onError: (err) => {
          console.error(err);
          toast({ title: "상품 수정에 실패했습니다.", description: "다시 시도해주세요." });
        },
      }
    );
  };

  useLayoutEffect(() => {
    if (productCategory.isLoading === false && productCategory.data === null) {
      navigate(ROUTES.DASHBOARD__PRODUCTS);
    }
  }, [productCategory, navigate]);

  if (productCategory.isLoading || productImage.isLoading) return <CenterLoading />;
  if (!productCategory.data || !productImage.data || !quantity.data) return <CenterError />;
  return (
    <Column className="gap-3">
      <Button asChild className="w-[100px]">
        <Link to={ROUTES.DASHBOARD__PRODUCTS}>상품 목록</Link>
      </Button>
      <Card>
        <CardHeader>
          <Row className="justify-between">
            <CardTitle>상품 정보</CardTitle>

            <ConfirmDialog
              title="상세보기로 돌아가시겠습니까?"
              description="수정하신 내용은 저장되지 않습니다."
              confirmText="돌아가기"
              confirmAction={() => navigate(ROUTES.DASHBOARD__PRODUCTS__ID(productId))}
              cancelText="취소"
              cancelAction={() => {}}
              triggerComponent={<Button>돌아가기</Button>}
            />
          </Row>
        </CardHeader>

        <CardContent>
          <ProductForm productCategory={{ ...productCategory.data, ...quantity.data }} productImages={productImage.data} onSave={handlePutProduct} />
        </CardContent>
      </Card>
    </Column>
  );
};

export default function DashboardProductEditPage() {
  return (
    <DashBoardLayout>
      <_DashboardProductEditPage />
    </DashBoardLayout>
  );
}
