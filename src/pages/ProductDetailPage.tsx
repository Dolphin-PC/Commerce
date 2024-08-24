import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductCategoryQuery } from "@/features/product/api/get-product_category";
import { useProductImageQuery } from "@/features/product_image/api/get_list-product-image";
import { bucketBaseUrl } from "@/features/product_image/const/bucket";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { CenterError } from "@/shared/components/molecules/Error";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const productCategory = useProductCategoryQuery({
    id: productId,
    sellerId: user?.id,
  });

  const productImage = useProductImageQuery({
    productId: Number(productCategory.data?.id),
  });

  useLayoutEffect(() => {
    if (productCategory.isLoading === false && productCategory.data === null) {
      navigate(ROUTES.DASHBOARD__PRODUCTS);
    }
  }, [productCategory, navigate]);

  if (productCategory.isLoading || productImage.isLoading) return <CenterLoading />;
  if (productCategory.error || productImage.error) return <CenterError />;
  return (
    <DashBoardLayout>
      <Column className="gap-3">
        <Button asChild className="w-[100px]">
          <Link to={ROUTES.DASHBOARD__PRODUCTS}>상품 목록</Link>
        </Button>
        <Card>
          <CardHeader>
            <Row className="justify-between">
              <CardTitle>상품 정보</CardTitle>

              <Row className="gap-5">
                <Button>삭제</Button>
                <Button asChild>
                  <Link to={ROUTES.DASHBOARD__PRODUCTS__EDIT__ID(productId)}>수정</Link>
                </Button>
              </Row>
            </Row>
          </CardHeader>

          <CardContent>
            <CardContent>
              <H4>상품 카테고리</H4>
              <p>{productCategory.data?.category?.categoryName}</p>
            </CardContent>
            <CardContent>
              <H4>상품 명</H4>
              <p>{productCategory.data?.name}</p>
            </CardContent>
            <CardContent>
              <H4>상품 가격</H4>
              <p>{productCategory.data?.price.toLocaleString("ko-KR")} 원</p>
            </CardContent>
            <CardContent>
              <H4>상품 수량</H4>
              <p>{productCategory.data?.quantity.toLocaleString("ko-KR")} 개</p>
            </CardContent>
            <CardContent>
              <H4>상품 이미지</H4>
              <Row className="gap-5 flex-wrap">
                {productImage.data?.length === 0 && <p>등록된 이미지가 없습니다.</p>}
                {productImage.data?.map((image) => (
                  <ConfirmDialog
                    key={image.id}
                    title="업로드 이미지"
                    description=""
                    triggerComponent={<img key={image.id} src={bucketBaseUrl + "/" + image.imgUrl} alt={image.imgUrl} className="w-24 h-24 object-cover" />}
                  >
                    <img src={bucketBaseUrl + "/" + image.imgUrl} alt={image.imgUrl} className="w-full max-h-32 object-cover" />
                  </ConfirmDialog>
                ))}
              </Row>
            </CardContent>
          </CardContent>
        </Card>
      </Column>
    </DashBoardLayout>
  );
};

export default ProductDetailPage;
