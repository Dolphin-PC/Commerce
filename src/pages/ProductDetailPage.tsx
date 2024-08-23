import { useCategoryQuery } from "@/entities/category/category-get.api";
import { useProductQuery } from "@/entities/product/product-get.api";
import { useProductImageQuery } from "@/entities/product_image/product-image-get.api";
import { useAuthStore } from "@/features/auth/auth.store";
import { H2, H4 } from "@/shared/components/atoms/Typography";
import Error from "@/shared/components/molecules/Error";
import Loading from "@/shared/components/molecules/Loading";
import Row from "@/shared/components/styles/Row";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const product = useProductQuery(id!, String(user!.id));
  const category = useCategoryQuery(product.data?.categoryId);
  const productImage = useProductImageQuery(product.data?.id);

  useLayoutEffect(() => {
    if (product.isLoading === false && !product.data) {
      navigate(ROUTES.DASHBOARD__PRODUCTS);
    }
  }, [product, navigate]);

  if (product.isLoading || category.isLoading || productImage.isLoading)
    return (
      <CenterLayout>
        <Loading />
      </CenterLayout>
    );
  if (product.error || category.error || productImage.error) {
    return (
      <CenterLayout>
        <Error />
      </CenterLayout>
    );
  }

  return (
    <DashBoardLayout>
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
            <p>{category.data?.categoryName}</p>
          </CardContent>
          <CardContent>
            <H4>상품 명</H4>
            <p>{product.data?.name}</p>
          </CardContent>
          <CardContent>
            <H4>상품 가격</H4>
            <p>{product.data?.price.toLocaleString("ko-KR")} 원</p>
          </CardContent>
          <CardContent>
            <H4>상품 수량</H4>
            <p>{product.data?.quantity.toLocaleString("ko-KR")} 개</p>
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
                  alt={product.data?.name}
                  style={{ width: "100px" }}
                />
              ))}
            </Row>
          </CardContent>
        </CardContent>
      </Card>
    </DashBoardLayout>
  );
};

export default ProductDetailPage;
