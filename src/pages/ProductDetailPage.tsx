import { useProductImageQuery } from "@/features/product_image/product-image-get.api";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useProductCategoryQuery } from "@/features/product/api/get-product_category";
import { H2, H4 } from "@/shared/components/atoms/Typography";
import Error from "@/shared/components/molecules/Error";
import Loading from "@/shared/components/molecules/Loading";
import Column from "@/shared/components/styles/Column";
import Row from "@/shared/components/styles/Row";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useLayoutEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const productCategory = useProductCategoryQuery({
    id: Number(id),
    sellerId: user?.id,
  });
  const productImage = useProductImageQuery(productCategory.data?.data?.id);

  useLayoutEffect(() => {
    if (productCategory.isLoading === false && !productCategory.data) {
      navigate(ROUTES.DASHBOARD__PRODUCTS);
    }
  }, [productCategory, navigate]);

  if (productCategory.isLoading || productImage.isLoading)
    return (
      <CenterLayout>
        <Loading />
      </CenterLayout>
    );
  if (productCategory.error || productImage.error) {
    return (
      <CenterLayout>
        <Error />
      </CenterLayout>
    );
  }

  return (
    <DashBoardLayout>
      <Column className="gap-3">
        <Button asChild className="w-[100px]">
          <Link to={ROUTES.DASHBOARD__PRODUCTS}>상품 목록</Link>
        </Button>
        <Card>
          <CardHeader>
            <Row className="justify-between">
              <H2>상품 정보</H2>

              <Row className="gap-5">
                <Button>삭제</Button>
                <Button>수정</Button>
              </Row>
            </Row>
          </CardHeader>

          <CardContent>
            <CardContent>
              <H4>상품 카테고리</H4>
              <p>{productCategory.data?.data?.category?.categoryName}</p>
            </CardContent>
            <CardContent>
              <H4>상품 명</H4>
              <p>{productCategory.data?.data?.name}</p>
            </CardContent>
            <CardContent>
              <H4>상품 가격</H4>
              <p>
                {productCategory.data?.data?.price.toLocaleString("ko-KR")} 원
              </p>
            </CardContent>
            <CardContent>
              <H4>상품 수량</H4>
              <p>
                {productCategory.data?.data?.quantity.toLocaleString("ko-KR")}{" "}
                개
              </p>
            </CardContent>
            <CardContent>
              <H4>상품 이미지</H4>
              <Row className="gap-5 flex-wrap">
                {productImage.data?.length === 0 && (
                  <p>등록된 이미지가 없습니다.</p>
                )}
                {productImage.data?.map((image) => (
                  <img
                    key={image.id}
                    src={image.imgUrl}
                    alt={productCategory.data?.data?.name}
                    style={{ width: "100px" }}
                  />
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
